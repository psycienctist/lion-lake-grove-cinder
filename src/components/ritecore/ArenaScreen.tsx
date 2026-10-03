import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { sfx, unlockAudio } from "@/lib/ritecore/audio";
import {
  callBrace,
  callOverclock,
  callSignature,
  createWorld,
  stepWorld,
  snapshotInjuries,
  tagIn,
  type CombatWorld,
} from "@/lib/ritecore/combat";
import { RITES } from "@/lib/ritecore/catalog";
import { drawWorld } from "@/lib/ritecore/draw";
import { useGame } from "@/lib/ritecore/store";
import type { FightResult } from "@/lib/ritecore/types";
import { cn } from "@/lib/utils";

export function ArenaScreen() {
  const match = useGame((s) => s.match);
  const save = useGame((s) => s.save);
  const finishFight = useGame((s) => s.finishFight);
  const setScreen = useGame((s) => s.setScreen);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<CombatWorld | null>(null);
  const [hud, setHud] = useState(0);

  useEffect(() => {
    if (!match) return;
    unlockAudio();
    worldRef.current = createWorld(match.player, match.enemy, match.format);
  }, [match]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !match) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let acc = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const raw = Math.min(0.1, (now - last) / 1000);
      last = now;
      acc += raw;
      const w = worldRef.current;
      if (w) {
        while (acc >= 1 / 60) {
          const before = w.events.length;
          stepWorld(w, 1 / 60);
          if (w.events.length > before) {
            const ev = w.events[w.events.length - 1];
            if (ev.kind === "hit" || ev.kind === "crit") sfx.hit();
            if (ev.kind === "special") sfx.special();
            if (ev.kind === "ko") sfx.ko();
            if (ev.kind === "tag") sfx.tag();
            if (ev.kind === "limb") sfx.heavy();
          }
          acc -= 1 / 60;
        }
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        if (canvas.width !== Math.floor(cw * dpr) || canvas.height !== Math.floor(ch * dpr)) {
          canvas.width = Math.floor(cw * dpr);
          canvas.height = Math.floor(ch * dpr);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawWorld(ctx, w, cw, ch, save.settings.shake);
      }
      setHud((n) => n + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [match, save.settings.shake]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const w = worldRef.current;
      if (!w) return;
      if (e.key === "1") tagIn(w, 0, 0);
      if (e.key === "2") tagIn(w, 0, 1);
      if (e.key === " " || e.key === "q" || e.key === "Q") {
        e.preventDefault();
        callSignature(w, 0);
        sfx.special();
      }
      if (e.key === "e" || e.key === "E") callOverclock(w, 0);
      if (e.key === "r" || e.key === "R") callBrace(w, 0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!match) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Button onClick={() => setScreen("circuit")}>Back to circuit</Button>
      </div>
    );
  }

  const w = worldRef.current;
  const rite = match.riteId ? RITES.find((r) => r.id === match.riteId) : null;
  const mine = w?.bots.filter((b) => b.team === 0) ?? [];
  const theirs = w?.bots.filter((b) => b.team === 1) ?? [];

  const resolve = () => {
    const world = worldRef.current;
    if (!world || world.phase !== "over") return;
    const won = world.winner === 0;
    const result: FightResult = {
      won,
      riteId: match.riteId,
      skirmish: match.skirmish,
      salvage: rite?.salvage ?? 35,
      xp: rite?.xp ?? 50,
      loot: won && rite && rite.unlocks[0] ? rite.unlocks[0] : null,
      injuries: snapshotInjuries(world),
      events: world.events.slice(-12),
      duration: world.t,
    };
    if (won) sfx.win();
    finishFight(result);
  };

  return (
    <div className="relative flex h-dvh flex-col bg-bg">
      <canvas ref={canvasRef} className="h-full w-full touch-none" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between gap-3 p-3 sm:p-4">
        <TeamCard side="A" bots={mine} />
        <div className="rounded-md border border-border bg-surface/90 px-3 py-2 text-center">
          <div className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            {rite?.name ?? "Skirmish"}
          </div>
          <div className="font-display text-lg font-semibold">
            {w?.phase === "intro" ? "READ" : w?.phase === "over" ? (w.winner === 0 ? "RITE TAKEN" : "RITE LOST") : w?.callSign || "FIGHT"}
          </div>
        </div>
        <TeamCard side="B" bots={theirs} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 sm:p-4">
        <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
          {mine.map((b) => (
            <button
              key={b.id}
              type="button"
              disabled={b.eliminated}
              onClick={() => tagIn(w!, 0, b.slot)}
              className={cn(
                "min-w-20 rounded-md border px-3 py-2 text-left text-xs",
                b.active ? "border-accent bg-raised" : "border-border bg-surface",
                b.eliminated && "opacity-30",
              )}
            >
              <div className="font-medium">{b.slot + 1} {b.name}</div>
              <div className="text-muted">{b.eliminated ? "KO" : b.active ? "IN" : "BENCH"}</div>
            </button>
          ))}
          <Button size="sm" onClick={() => { callSignature(w!, 0); sfx.special(); }}>
            Signature
          </Button>
          <Button size="sm" variant="secondary" onClick={() => callOverclock(w!, 0)}>
            Overclock
          </Button>
          <Button size="sm" variant="secondary" onClick={() => callBrace(w!, 0)}>
            Brace
          </Button>
        </div>
        <p className="text-center font-mono text-[10px] text-faint">
          1/2 tag · Space signature · E overclock · R brace
        </p>
      </div>

      {w?.phase === "over" && (
        <div className="absolute inset-0 grid place-items-center bg-bg/55 p-6">
          <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center shadow-[var(--shadow-panel)]">
            <h2 className="font-display text-3xl font-semibold">
              {w.winner === 0 ? "You take the pit" : "The house keeps it"}
            </h2>
            <p className="mt-2 text-sm text-muted">{Math.round(w.t)}s · {w.events.length} logged exchanges</p>
            <Button className="mt-5 w-full" onClick={resolve}>
              Aftermath
            </Button>
          </div>
        </div>
      )}
      <span className="sr-only">{hud}</span>
    </div>
  );
}

function TeamCard({
  side,
  bots,
}: {
  side: string;
  bots: NonNullable<CombatWorld["bots"]>;
}) {
  const live = bots.filter((b) => b.active)[0] ?? bots[0];
  if (!live) return null;
  return (
    <div className="min-w-36 rounded-md border border-border bg-surface/90 p-2 sm:min-w-48">
      <div className="flex justify-between text-[10px] tracking-wide text-muted uppercase">
        <span>Team {side}</span>
        <span className="font-mono">{live.build.style}</span>
      </div>
      <div className="font-display text-sm font-semibold">{live.name}</div>
      <Meter value={live.hp / live.stats.maxHp} color="bg-hp" />
      <Meter value={live.stamina / 100} color="bg-stamina" />
      <Meter value={live.battery / 100} color="bg-battery" />
    </div>
  );
}

function Meter({ value, color }: { value: number; color: string }) {
  return (
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-bg">
      <div className={cn("h-full", color)} style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}
