import { useEffect } from "react";
import { setMuted } from "@/lib/ritecore/audio";
import { useGame } from "@/lib/ritecore/store";
import { AftermathScreen } from "./AftermathScreen";
import { ArenaScreen } from "./ArenaScreen";
import { CircuitScreen } from "./CircuitScreen";
import { GarageScreen } from "./GarageScreen";
import { TitleScreen } from "./TitleScreen";

export function RiteCoreApp() {
  const hydrate = useGame((s) => s.hydrate);
  const screen = useGame((s) => s.screen);
  const mute = useGame((s) => s.save.settings.mute);
  const persist = useGame((s) => s.persist);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    setMuted(mute);
  }, [mute]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") persist();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [persist]);

  if (screen === "garage") return <GarageScreen />;
  if (screen === "circuit") return <CircuitScreen />;
  if (screen === "arena") return <ArenaScreen />;
  if (screen === "aftermath") return <AftermathScreen />;
  return <TitleScreen />;
}
