import { STARTERS, START_UNLOCKS } from "./catalog";
import type { GameSave } from "./types";

export const SAVE_KEY = "ritecore-save-v1";
export const SAVE_VERSION = 1;

export function defaultSave(): GameSave {
  return {
    version: SAVE_VERSION,
    salvage: 80,
    unlocked: [...START_UNLOCKS],
    cleared: [],
    bots: STARTERS.map((b) => ({ ...b, traits: [...b.traits], injuries: [] })),
    squad: STARTERS.slice(0, 2).map((b) => b.id),
    settings: { shake: true, mute: false },
  };
}

export function migrate(raw: unknown): GameSave {
  const base = defaultSave();
  if (!raw || typeof raw !== "object") return base;
  const s = raw as Partial<GameSave>;
  return {
    ...base,
    ...s,
    version: SAVE_VERSION,
    settings: { ...base.settings, ...s.settings },
    unlocked: Array.isArray(s.unlocked) ? s.unlocked : base.unlocked,
    cleared: Array.isArray(s.cleared) ? s.cleared : base.cleared,
    bots: Array.isArray(s.bots) && s.bots.length ? s.bots : base.bots,
    squad: Array.isArray(s.squad) && s.squad.length ? s.squad : base.squad,
  };
}

export function loadSave(): GameSave {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    return migrate(JSON.parse(raw));
  } catch {
    return defaultSave();
  }
}

export function persistSave(save: GameSave) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* private mode / quota */
  }
}
