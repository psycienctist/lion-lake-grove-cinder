import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RITES } from "@/lib/ritecore/catalog";
import { riteLocked, useGame } from "@/lib/ritecore/store";
import { cn } from "@/lib/utils";

export function CircuitScreen() {
  const save = useGame((s) => s.save);
  const setScreen = useGame((s) => s.setScreen);
  const startRite = useGame((s) => s.startRite);
  const startSkirmish = useGame((s) => s.startSkirmish);
  const squad = save.squad
    .map((id) => save.bots.find((b) => b.id === id))
    .filter(Boolean);

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-6 px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Circuit</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Eight rites</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Squad {squad.map((b) => b?.name).join(" · ") || "empty"} · {save.salvage} salvage
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setScreen("garage")}>
            Garage
          </Button>
          <Button variant="secondary" onClick={startSkirmish} disabled={!squad.length}>
            Skirmish
          </Button>
        </div>
      </header>

      <ol className="grid gap-3">
        {RITES.map((rite) => {
          const locked = riteLocked(save, rite.index);
          const cleared = save.cleared.includes(rite.id);
          const ready = squad.length >= rite.format && !locked;
          return (
            <li
              key={rite.id}
              className={cn(
                "grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center",
                locked && "opacity-55",
              )}
            >
              <div className="font-mono text-xs text-faint tabular-nums">0{rite.index + 1}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-semibold">{rite.name}</h2>
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                    {rite.format}v{rite.format}
                  </span>
                  {cleared && (
                    <span className="font-mono text-[10px] tracking-wide text-stamina uppercase">
                      Sealed
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{rite.blurb}</p>
                <p className="mt-1 font-mono text-[11px] text-faint">
                  {rite.salvage} salvage · {rite.xp} XP
                  {rite.unlocks.length ? ` · unlocks ${rite.unlocks.length} parts` : ""}
                </p>
              </div>
              <Button
                disabled={!ready}
                variant={cleared ? "secondary" : "default"}
                onClick={() => startRite(rite.id)}
              >
                {locked ? <Lock className="size-3.5" /> : null}
                {locked ? "Locked" : squad.length < rite.format ? `Need ${rite.format}` : "Call rite"}
              </Button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
