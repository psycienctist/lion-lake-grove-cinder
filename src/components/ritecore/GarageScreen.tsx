import type { ReactNode } from "react";
import { Copy, Plus, Trash2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Portrait } from "@/components/ritecore/Portrait";
import {
  BODIES,
  LEGS,
  SCALES,
  SIGNATURES,
  STYLES,
  TRAITS,
  WEAPONS,
  repairCost,
} from "@/lib/ritecore/catalog";
import { deriveStats } from "@/lib/ritecore/stats";
import { isUnlocked, STYLE_LIST, useGame } from "@/lib/ritecore/store";
import type { TraitId } from "@/lib/ritecore/types";
import { cn } from "@/lib/utils";

export function GarageScreen() {
  const save = useGame((s) => s.save);
  const selectedId = useGame((s) => s.selectedId);
  const bot = save.bots.find((b) => b.id === selectedId) ?? save.bots[0];
  const stats = deriveStats(bot);
  const setScreen = useGame((s) => s.setScreen);
  const updateBot = useGame((s) => s.updateBot);
  const selectBot = useGame((s) => s.selectBot);
  const toggleSquad = useGame((s) => s.toggleSquad);
  const newBot = useGame((s) => s.newBot);
  const deleteBot = useGame((s) => s.deleteBot);
  const duplicateBot = useGame((s) => s.duplicateBot);
  const repairBot = useGame((s) => s.repairBot);
  const inSquad = save.squad.includes(bot.id);
  const repair = repairCost(bot.injuries.length);

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Garage</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Forge the machine</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setScreen("title")}>
            Title
          </Button>
          <Button onClick={() => setScreen("circuit")}>Circuit</Button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {save.bots.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => selectBot(b.id)}
            className={cn(
              "min-w-28 rounded-md border px-3 py-2 text-left",
              b.id === bot.id ? "border-accent bg-raised" : "border-border bg-surface",
            )}
          >
            <div className="text-sm font-medium">{b.name}</div>
            <div className="font-mono text-[10px] text-muted">
              Lv {b.level}
              {save.squad.includes(b.id) ? " · SQUAD" : ""}
            </div>
          </button>
        ))}
        <button
          type="button"
          onClick={newBot}
          className="inline-flex min-w-24 items-center justify-center gap-1 rounded-md border border-dashed border-border text-sm text-muted"
        >
          <Plus className="size-3.5" /> New
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[220px_1fr_220px]">
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <Portrait
            name={bot.name}
            style={bot.style}
            body={bot.body}
            legs={bot.legs}
            weapon={bot.weapon}
            accent={bot.accent}
            className="h-64 w-full"
          />
          <div className="space-y-2 p-4">
            <label className="block text-xs text-muted">
              Callsign
              <input
                value={bot.name}
                maxLength={12}
                onChange={(e) => updateBot(bot.id, { name: e.target.value.toUpperCase() })}
                className="mt-1 h-10 w-full rounded-sm border border-border bg-bg px-3 font-mono text-sm text-fg"
              />
            </label>
            <Button
              variant={inSquad ? "default" : "secondary"}
              className="w-full"
              onClick={() => toggleSquad(bot.id)}
            >
              {inSquad ? "On squad" : "Add to squad"}
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => duplicateBot(bot.id)}>
                <Copy className="size-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteBot(bot.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Style">
              <Select
                value={bot.style}
                onChange={(v) => updateBot(bot.id, { style: v as Bot["style"] })}
                options={STYLE_LIST.map((s) => ({
                  value: s,
                  locked: !isUnlocked(save, `style:${s}`),
                }))}
              />
            </Field>
            <Field label="Body">
              <Select
                value={bot.body}
                onChange={(v) => updateBot(bot.id, { body: v as Bot["body"] })}
                options={Object.keys(BODIES).map((s) => ({
                  value: s,
                  locked: !isUnlocked(save, `body:${s}`),
                }))}
              />
            </Field>
            <Field label="Locomotion">
              <Select
                value={bot.legs}
                onChange={(v) => updateBot(bot.id, { legs: v as Bot["legs"] })}
                options={Object.keys(LEGS).map((s) => ({
                  value: s,
                  locked: !isUnlocked(save, `legs:${s}`),
                }))}
              />
            </Field>
            <Field label="Weapon">
              <Select
                value={bot.weapon}
                onChange={(v) => updateBot(bot.id, { weapon: v as Bot["weapon"] })}
                options={Object.keys(WEAPONS).map((s) => ({
                  value: s,
                  locked: !isUnlocked(save, `weapon:${s}`),
                }))}
              />
            </Field>
            <Field label="Signature">
              <Select
                value={bot.signature}
                onChange={(v) => updateBot(bot.id, { signature: v as Bot["signature"] })}
                options={Object.keys(SIGNATURES).map((s) => ({
                  value: s,
                  locked: !isUnlocked(save, `signature:${s}`),
                }))}
              />
            </Field>
            <Field label="Scale">
              <Select
                value={bot.scale}
                onChange={(v) => updateBot(bot.id, { scale: v as Bot["scale"] })}
                options={Object.keys(SCALES).map((s) => ({
                  value: s,
                  locked: !isUnlocked(save, `scale:${s}`),
                }))}
              />
            </Field>
          </div>
          <p className="mt-4 text-sm text-muted">{STYLES[bot.style].kit}</p>
          <div className="mt-4">
            <p className="mb-2 text-xs tracking-wide text-muted uppercase">Traits (max 2)</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TRAITS) as TraitId[]).map((t) => {
                const on = bot.traits.includes(t);
                const locked = !isUnlocked(save, `trait:${t}`);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={locked}
                    onClick={() => {
                      let traits = on ? bot.traits.filter((x) => x !== t) : [...bot.traits, t];
                      if (traits.length > 2) traits = traits.slice(-2);
                      updateBot(bot.id, { traits });
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      on ? "border-accent bg-raised text-fg" : "border-border text-muted",
                      locked && "opacity-30",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          {bot.injuries.length > 0 && (
            <div className="mt-4 flex items-center justify-between rounded-md border border-border bg-bg px-3 py-2">
              <p className="text-sm text-hp">
                Injuries: {bot.injuries.join(", ")} · {repair} salvage
              </p>
              <Button
                size="sm"
                variant="secondary"
                disabled={save.salvage < repair}
                onClick={() => repairBot(bot.id)}
              >
                <Wrench className="size-3.5" /> Repair
              </Button>
            </div>
          )}
        </div>

        <aside className="rounded-lg border border-border bg-raised p-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">System profile</p>
          <dl className="mt-3 space-y-2 font-mono text-xs">
            <Row k="HP" v={String(stats.maxHp)} />
            <Row k="Speed" v={stats.speed.toFixed(0)} />
            <Row k="Damage" v={stats.damage.toFixed(1)} />
            <Row k="Heavy" v={stats.heavy.toFixed(1)} />
            <Row k="Range" v={stats.range.toFixed(0)} />
            <Row k="Armor" v={`${Math.round(stats.armor * 100)}%`} />
            <Row k="Crit" v={`${Math.round(stats.crit * 100)}%`} />
            <Row k="Dodge" v={`${Math.round(stats.dodge * 100)}%`} />
            <Row k="Special" v={stats.specialPower.toFixed(2)} />
            <Row k="Kind" v={stats.isRanged ? "Ranged" : "Melee"} />
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            {BODIES[bot.body].note}. {LEGS[bot.legs].note}. {WEAPONS[bot.weapon].note}.{" "}
            {SIGNATURES[bot.signature].note}.
          </p>
        </aside>
      </div>
    </div>
  );
}

type Bot = ReturnType<typeof useGame.getState>["save"]["bots"][number];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs text-muted">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; locked?: boolean }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-sm border border-border bg-bg px-2 text-sm text-fg"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} disabled={o.locked}>
          {o.value}
          {o.locked ? " (locked)" : ""}
        </option>
      ))}
    </select>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 text-muted">
      <dt>{k}</dt>
      <dd className="text-fg tabular-nums">{v}</dd>
    </div>
  );
}
