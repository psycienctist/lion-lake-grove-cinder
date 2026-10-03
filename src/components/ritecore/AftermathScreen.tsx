import { Button } from "@/components/ui/button";
import { useGame } from "@/lib/ritecore/store";

export function AftermathScreen() {
  const result = useGame((s) => s.result);
  const save = useGame((s) => s.save);
  const collectResult = useGame((s) => s.collectResult);
  const setScreen = useGame((s) => s.setScreen);

  if (!result) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Button onClick={() => setScreen("circuit")}>Circuit</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-5 py-10">
      <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Aftermath</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {result.won ? "Rite sealed" : "Rite broken"}
      </h1>
      <p className="text-muted">
        {result.won
          ? "Salvage and experience land in the garage. Injured limbs stay missing until you pay the wrench."
          : "A quarter of the purse as scrap. Injuries still stick."}
      </p>
      <dl className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface p-4 font-mono text-sm">
        <div>
          <dt className="text-xs text-muted">Salvage</dt>
          <dd className="text-lg tabular-nums">{result.won ? result.salvage : Math.floor(result.salvage * 0.25)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">XP</dt>
          <dd className="text-lg tabular-nums">{result.won ? result.xp : 0}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-muted">Duration</dt>
          <dd>{Math.round(result.duration)}s</dd>
        </div>
        {result.loot && result.won && (
          <div className="col-span-2">
            <dt className="text-xs text-muted">Unlocked</dt>
            <dd>{result.loot.replace(":", " · ")}</dd>
          </div>
        )}
      </dl>
      {Object.keys(result.injuries).length > 0 && (
        <div className="rounded-md border border-border bg-raised p-4 text-sm">
          <p className="text-hp">Structural damage</p>
          <ul className="mt-2 space-y-1 text-muted">
            {Object.entries(result.injuries).map(([id, limbs]) => (
              <li key={id}>
                {save.bots.find((b) => b.id === id)?.name ?? id}: {limbs.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ol className="space-y-1 font-mono text-xs text-faint">
        {result.events.slice(-8).map((e, i) => (
          <li key={`${e.t}-${i}`}>
            {e.t.toFixed(1)} · {e.text}
          </li>
        ))}
      </ol>
      <Button size="lg" onClick={collectResult}>
        Return to circuit
      </Button>
    </div>
  );
}
