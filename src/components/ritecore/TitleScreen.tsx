import { Hammer, Map, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { unlockAudio } from "@/lib/ritecore/audio";
import { useGame } from "@/lib/ritecore/store";

export function TitleScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const save = useGame((s) => s.save);
  const resetSave = useGame((s) => s.resetSave);
  const toggleSetting = useGame((s) => s.toggleSetting);
  const enter = (screen: "garage" | "circuit") => {
    unlockAudio();
    setScreen(screen);
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8">
      <header className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">Pit protocol 03</p>
        <p className="font-mono text-xs text-faint tabular-nums">{save.salvage} salvage</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="mb-3 text-sm tracking-[0.18em] text-muted uppercase">Underground foundry · tag arena</p>
          <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-fg sm:text-7xl">
            RITECORE
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Forge a machine whose parts actually change the fight. Call tags, signatures, and
            overclocks while the pit AI brawls in real time. Injuries persist. Salvage pays the
            repair bill.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => enter("circuit")}>
              <Map className="size-4" />
              Open the circuit
            </Button>
            <Button size="lg" variant="secondary" onClick={() => enter("garage")}>
              <Hammer className="size-4" />
              Garage
            </Button>
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-panel)]">
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Caller verbs</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <span className="font-medium text-fg">Tag</span> — swap the active frame. Bench
              regenerates stamina and battery.
            </li>
            <li>
              <span className="font-medium text-fg">Signature</span> — spend battery on the mounted
              rite (beam, freeze, quake).
            </li>
            <li>
              <span className="font-medium text-fg">Overclock</span> — short damage and speed spike.
            </li>
            <li>
              <span className="font-medium text-fg">Brace</span> — eat the next exchange at a
              discount.
            </li>
          </ul>
        </aside>
      </div>

      <section className="grid gap-3 md:grid-cols-3">
        <Note
          title="Live pit"
          body="Style kits, combos, limb loss, and tag-team stamina from the rumble engine — refined so weapons, legs, and signatures modify the math, not just the silhouette."
        />
        <Note
          title="RPG weight"
          body="Levels, salvage, persistent injuries, and a locked circuit of eight rites. Loadouts are a build, not a costume."
        />
        <Note
          title="Caller, not driver"
          body="You do not steer the chassis. You call the bout: who is in, when the special drops, when to overclock."
        />
      </section>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-faint">
        <span className="inline-flex items-center gap-2">
          <Swords className="size-3.5" />
          {save.cleared.length}/8 rites sealed · {save.bots.length} machines in the garage
        </span>
        <div className="flex gap-4">
        <button type="button" className="text-muted hover:text-fg" onClick={() => toggleSetting("mute")}>
          Audio {save.settings.mute ? "off" : "on"}
        </button>
        <button type="button" className="text-muted hover:text-fg" onClick={resetSave}>
          Reset local save
        </button>
        </div>
      </footer>
    </div>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-border bg-raised p-4">
      <h2 className="font-display text-base font-semibold tracking-tight text-fg">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}
