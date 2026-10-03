import { create } from "zustand";
import { ACCENTS, RITES, STARTERS, START_UNLOCKS, uid, xpToNext } from "./catalog";
import { defaultSave, loadSave, persistSave } from "./save";
import type { BotBuild, FightResult, GameSave, LimbId, StyleId } from "./types";

export type Screen = "title" | "garage" | "circuit" | "arena" | "aftermath";

interface MatchSetup {
  riteId: string | null;
  skirmish: boolean;
  format: 1 | 2;
  player: BotBuild[];
  enemy: BotBuild[];
}

interface GameState {
  screen: Screen;
  save: GameSave;
  selectedId: string;
  match: MatchSetup | null;
  result: FightResult | null;
  hydrate: () => void;
  persist: () => void;
  setScreen: (s: Screen) => void;
  updateBot: (id: string, patch: Partial<BotBuild>) => void;
  selectBot: (id: string) => void;
  toggleSquad: (id: string) => void;
  newBot: () => void;
  deleteBot: (id: string) => void;
  repairBot: (id: string) => void;
  duplicateBot: (id: string) => void;
  startRite: (riteId: string) => void;
  startSkirmish: () => void;
  finishFight: (result: FightResult) => void;
  collectResult: () => void;
  resetSave: () => void;
  toggleSetting: (k: "shake" | "mute") => void;
}

function write(save: GameSave) {
  persistSave(save);
}

export const useGame = create<GameState>((set, get) => ({
  screen: "title",
  save: defaultSave(),
  selectedId: STARTERS[0].id,
  match: null,
  result: null,
  hydrate: () => {
    const save = loadSave();
    set({ save, selectedId: save.bots[0]?.id ?? "" });
  },
  persist: () => write(get().save),
  setScreen: (screen) => set({ screen }),
  selectBot: (selectedId) => set({ selectedId }),
  updateBot: (id, patch) => {
    const save = {
      ...get().save,
      bots: get().save.bots.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    };
    write(save);
    set({ save });
  },
  toggleSquad: (id) => {
    const save = get().save;
    const on = save.squad.includes(id);
    let squad = on ? save.squad.filter((x) => x !== id) : [...save.squad, id];
    if (squad.length > 3) squad = squad.slice(-3);
    const next = { ...save, squad };
    write(next);
    set({ save: next });
  },
  newBot: () => {
    const save = get().save;
    const bot: BotBuild = {
      id: uid("bot"),
      name: "SPARE",
      style: "Boxer",
      body: "Standard",
      legs: "Humanoid",
      weapon: "Fists",
      signature: "Projectile",
      scale: "Standard",
      traits: ["Disciplined"],
      accent: ACCENTS[save.bots.length % ACCENTS.length],
      level: 1,
      xp: 0,
      injuries: [],
    };
    const next = { ...save, bots: [...save.bots, bot] };
    write(next);
    set({ save: next, selectedId: bot.id });
  },
  deleteBot: (id) => {
    const save = get().save;
    if (save.bots.length <= 1) return;
    const bots = save.bots.filter((b) => b.id !== id);
    const squad = save.squad.filter((s) => s !== id);
    const next = { ...save, bots, squad: squad.length ? squad : [bots[0].id] };
    write(next);
    set({ save: next, selectedId: bots[0].id });
  },
  duplicateBot: (id) => {
    const src = get().save.bots.find((b) => b.id === id);
    if (!src) return;
    const bot: BotBuild = { ...src, id: uid("bot"), name: `${src.name}-2`, injuries: [] };
    const save = { ...get().save, bots: [...get().save.bots, bot] };
    write(save);
    set({ save, selectedId: bot.id });
  },
  repairBot: (id) => {
    const save = get().save;
    const bot = save.bots.find((b) => b.id === id);
    if (!bot || !bot.injuries.length) return;
    const cost = 28 * bot.injuries.length;
    if (save.salvage < cost) return;
    const next = {
      ...save,
      salvage: save.salvage - cost,
      bots: save.bots.map((b) => (b.id === id ? { ...b, injuries: [] } : b)),
    };
    write(next);
    set({ save: next });
  },
  startRite: (riteId) => {
    const rite = RITES.find((r) => r.id === riteId);
    const save = get().save;
    if (!rite) return;
    const squad = save.squad
      .map((id) => save.bots.find((b) => b.id === id))
      .filter((b): b is BotBuild => Boolean(b))
      .slice(0, rite.format);
    if (squad.length < rite.format) return;
    set({
      match: { riteId, skirmish: false, format: rite.format, player: squad, enemy: rite.enemies },
      screen: "arena",
    });
  },
  startSkirmish: () => {
    const save = get().save;
    const format: 1 | 2 = save.squad.length >= 2 ? 2 : 1;
    const squad = save.squad
      .map((id) => save.bots.find((b) => b.id === id))
      .filter((b): b is BotBuild => Boolean(b))
      .slice(0, format);
    if (!squad.length) return;
    const pool = RITES.flatMap((r) => r.enemies);
    const enemy = Array.from({ length: format }, (_, i) => {
      const src = pool[(Math.random() * pool.length) | 0];
      return { ...src, id: uid("sk"), level: Math.max(1, squad[i % squad.length].level) };
    });
    set({
      match: { riteId: null, skirmish: true, format, player: squad, enemy },
      screen: "arena",
    });
  },
  finishFight: (result) => set({ result, screen: "aftermath" }),
  collectResult: () => {
    const { result, save } = get();
    if (!result) {
      set({ screen: "circuit", match: null });
      return;
    }
    let bots = save.bots.map((b) => {
      const inj = result.injuries[b.id];
      let xp = b.xp;
      let level = b.level;
      if (result.won && save.squad.includes(b.id)) {
        xp += result.xp;
        while (xp >= xpToNext(level) && level < 12) {
          xp -= xpToNext(level);
          level += 1;
        }
      }
      const injuries: LimbId[] = inj ? Array.from(new Set([...b.injuries, ...inj])) : b.injuries;
      return { ...b, xp, level, injuries };
    });
    const unlocked = new Set(save.unlocked);
    const cleared = new Set(save.cleared);
    if (result.won && result.riteId) {
      cleared.add(result.riteId);
      const rite = RITES.find((r) => r.id === result.riteId);
      rite?.unlocks.forEach((u) => unlocked.add(u));
    }
    if (result.loot && result.won) unlocked.add(result.loot);
    const next: GameSave = {
      ...save,
      salvage: save.salvage + (result.won ? result.salvage : Math.floor(result.salvage * 0.25)),
      bots,
      unlocked: Array.from(unlocked),
      cleared: Array.from(cleared),
    };
    write(next);
    set({ save: next, result: null, match: null, screen: "circuit" });
  },
  resetSave: () => {
    const save = defaultSave();
    write(save);
    set({ save, selectedId: save.bots[0].id, screen: "title", match: null, result: null });
  },
  toggleSetting: (k) => {
    const save = {
      ...get().save,
      settings: { ...get().save.settings, [k]: !get().save.settings[k] },
    };
    write(save);
    set({ save });
  },
}));

export function isUnlocked(save: GameSave, key: string) {
  return save.unlocked.includes(key) || START_UNLOCKS.includes(key);
}

export function riteLocked(save: GameSave, index: number) {
  if (index === 0) return false;
  return !save.cleared.includes(RITES[index - 1].id);
}

export const STYLE_LIST: StyleId[] = ["Kung Fu", "Boxer", "Wrestler", "Brawler", "Martial Arts"];
