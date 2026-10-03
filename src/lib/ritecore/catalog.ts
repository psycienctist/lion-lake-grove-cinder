import type {
  BodyId,
  BotBuild,
  LegsId,
  RiteDef,
  ScaleId,
  SignatureId,
  StyleId,
  TraitId,
  WeaponId,
} from "./types";

export const STYLES: Record<
  StyleId,
  {
    speed: number;
    range: number;
    damage: number;
    heavy: number;
    hp: number;
    attackRate: number;
    color: string;
    kit: string;
  }
> = {
  "Kung Fu": {
    speed: 188,
    range: 78,
    damage: 9,
    heavy: 18,
    hp: 102,
    attackRate: 0.34,
    color: "#9aa884",
    kit: "Palm strings into Dragon Rush. Prefers tempo and air kicks.",
  },
  Boxer: {
    speed: 150,
    range: 118,
    damage: 11,
    heavy: 26,
    hp: 112,
    attackRate: 0.5,
    color: "#7a9aa8",
    kit: "Jab-cross pressure. Counters with Iron Cross at close range.",
  },
  Wrestler: {
    speed: 108,
    range: 76,
    damage: 13,
    heavy: 32,
    hp: 138,
    attackRate: 0.66,
    color: "#c4a574",
    kit: "Clinch, slam, shockwave. Wins the pit floor.",
  },
  Brawler: {
    speed: 128,
    range: 84,
    damage: 16,
    heavy: 38,
    hp: 120,
    attackRate: 0.72,
    color: "#c45c3a",
    kit: "Heavy swings and scrap cannon. Trades blood for knockouts.",
  },
  "Martial Arts": {
    speed: 158,
    range: 102,
    damage: 12,
    heavy: 24,
    hp: 110,
    attackRate: 0.46,
    color: "#b7c0c8",
    kit: "Counters, freeze needles, shadow flurry. Reads the opponent first.",
  },
};

export const BODIES: Record<BodyId, { hp: number; armor: number; special: number; note: string }> = {
  Standard: { hp: 1, armor: 1, special: 1, note: "Balanced frame" },
  "Cannon Arm": { hp: 1.06, armor: 0.96, special: 1.12, note: "Ranged authority" },
  "Six Arms": { hp: 1.1, armor: 0.94, special: 1.04, note: "Combo density" },
  Inverted: { hp: 0.92, armor: 0.9, special: 1.06, note: "Evasion bias" },
  Cyclops: { hp: 0.96, armor: 1.02, special: 1.08, note: "Crit optics" },
  "Drill Head": { hp: 1.08, armor: 1.16, special: 0.92, note: "Armor break" },
  Mage: { hp: 0.9, armor: 0.88, special: 1.28, note: "Core overclock" },
};

export const LEGS: Record<
  LegsId,
  { speed: number; dodge: number; stamina: number; note: string }
> = {
  Humanoid: { speed: 1, dodge: 1, stamina: 1, note: "Sure footing" },
  Tank: { speed: 0.72, dodge: 0.7, stamina: 1.2, note: "Plated crawl" },
  Rocket: { speed: 1.18, dodge: 1.15, stamina: 0.88, note: "Burst dash" },
  Hover: { speed: 1.08, dodge: 1.22, stamina: 0.9, note: "Glides over clutter" },
  Pogo: { speed: 1.14, dodge: 1.08, stamina: 0.94, note: "Vertical burst" },
  Wheels: { speed: 1.26, dodge: 0.78, stamina: 1.06, note: "Line speed" },
};

export const WEAPONS: Record<
  WeaponId,
  {
    damage: number;
    range: number;
    rate: number;
    ranged: boolean;
    note: string;
  }
> = {
  Fists: { damage: 0.92, range: 0.9, rate: 1.18, ranged: false, note: "Fast hands" },
  Sword: { damage: 1.08, range: 1.12, rate: 1.02, ranged: false, note: "Clean arcs" },
  Axe: { damage: 1.28, range: 1.05, rate: 0.78, ranged: false, note: "Cleave" },
  Spear: { damage: 1.06, range: 1.34, rate: 0.94, ranged: false, note: "Reach" },
  Staff: { damage: 0.96, range: 1.16, rate: 1.04, ranged: false, note: "Signature synergy" },
  Pistol: { damage: 0.88, range: 2.4, rate: 1.1, ranged: true, note: "Snap shots" },
  Rifle: { damage: 1.04, range: 3.1, rate: 0.86, ranged: true, note: "Lane control" },
  "Plasma Gun": { damage: 1.22, range: 2.7, rate: 0.72, ranged: true, note: "Heavy bolt" },
};

export const SIGNATURES: Record<SignatureId, { power: number; cost: number; note: string }> = {
  "Laser Beam": { power: 1.15, cost: 38, note: "Instant line" },
  Projectile: { power: 1, cost: 32, note: "Hard round" },
  Fireball: { power: 1.18, cost: 40, note: "Arcing heat" },
  "Ice Freeze": { power: 0.92, cost: 42, note: "Locks joints" },
  "Acid Spray": { power: 0.86, cost: 36, note: "Eats armor" },
  "Electric Shock": { power: 1.08, cost: 44, note: "Chains nearby" },
  Quake: { power: 1.22, cost: 48, note: "Floor break" },
};

export const SCALES: Record<ScaleId, { hp: number; speed: number; radius: number }> = {
  Miniature: { hp: 0.82, speed: 1.16, radius: 0.82 },
  Standard: { hp: 1, speed: 1, radius: 1 },
  Large: { hp: 1.18, speed: 0.9, radius: 1.16 },
  Giant: { hp: 1.36, speed: 0.78, radius: 1.34 },
};

export const TRAITS: Record<TraitId, { note: string }> = {
  Reckless: { note: "Commits early, hits harder, guards less" },
  Cautious: { note: "Keeps range, tags out sooner" },
  Calculated: { note: "Waits for counters and crit windows" },
  Aggressive: { note: "Hunts low HP, spends battery fast" },
  Disciplined: { note: "Holds guard, spends stamina cleanly" },
  Erratic: { note: "Feints, odd timing, wild specials" },
};

export const START_UNLOCKS = [
  "style:Kung Fu",
  "style:Boxer",
  "style:Wrestler",
  "style:Brawler",
  "style:Martial Arts",
  "body:Standard",
  "body:Cyclops",
  "legs:Humanoid",
  "legs:Wheels",
  "weapon:Fists",
  "weapon:Sword",
  "weapon:Pistol",
  "signature:Projectile",
  "signature:Laser Beam",
  "scale:Miniature",
  "scale:Standard",
  "trait:Calculated",
  "trait:Aggressive",
  "trait:Disciplined",
];

export const ACCENTS = ["#dfe6d8", "#9aa884", "#7a9aa8", "#c45c3a", "#c4a574", "#b7c0c8"];

function bot(
  partial: Omit<BotBuild, "xp" | "injuries"> & { xp?: number; injuries?: BotBuild["injuries"] },
): BotBuild {
  return { xp: 0, injuries: [], ...partial };
}

export const STARTERS: BotBuild[] = [
  bot({
    id: "starter-iota",
    name: "IOTA",
    style: "Martial Arts",
    body: "Standard",
    legs: "Humanoid",
    weapon: "Sword",
    signature: "Laser Beam",
    scale: "Standard",
    traits: ["Calculated"],
    accent: "#b7c0c8",
    level: 1,
  }),
  bot({
    id: "starter-cinder",
    name: "CINDER",
    style: "Brawler",
    body: "Cyclops",
    legs: "Wheels",
    weapon: "Fists",
    signature: "Projectile",
    scale: "Standard",
    traits: ["Aggressive"],
    accent: "#c45c3a",
    level: 1,
  }),
  bot({
    id: "starter-vesper",
    name: "VESPER",
    style: "Boxer",
    body: "Standard",
    legs: "Humanoid",
    weapon: "Pistol",
    signature: "Laser Beam",
    scale: "Miniature",
    traits: ["Disciplined"],
    accent: "#7a9aa8",
    level: 1,
  }),
];

export const RITES: RiteDef[] = [
  {
    id: "white-room",
    index: 0,
    name: "White Room",
    blurb: "A calibration bout. Learn the caller's verbs: tag, signature, overclock, brace.",
    format: 1,
    salvage: 40,
    xp: 70,
    unlocks: ["body:Cannon Arm", "weapon:Axe", "legs:Tank"],
    enemies: [
      bot({
        id: "en-spar",
        name: "SPAR-01",
        style: "Boxer",
        body: "Standard",
        legs: "Humanoid",
        weapon: "Fists",
        signature: "Projectile",
        scale: "Miniature",
        traits: ["Cautious"],
        accent: "#8d9186",
        level: 1,
      }),
    ],
  },
  {
    id: "rust-approach",
    index: 1,
    name: "Rust Approach",
    blurb: "The gate bot chews armor. Bring a drill or don't bother.",
    format: 1,
    salvage: 55,
    xp: 90,
    unlocks: ["signature:Fireball", "legs:Rocket", "trait:Reckless"],
    enemies: [
      bot({
        id: "en-rasp",
        name: "RASP",
        style: "Wrestler",
        body: "Drill Head",
        legs: "Tank",
        weapon: "Axe",
        signature: "Quake",
        scale: "Large",
        traits: ["Aggressive"],
        accent: "#c4a574",
        level: 2,
      }),
    ],
  },
  {
    id: "twin-bell",
    index: 2,
    name: "Twin Bell",
    blurb: "First tag rite. Bench stamina is a resource — spend it on purpose.",
    format: 2,
    salvage: 80,
    xp: 120,
    unlocks: ["body:Six Arms", "weapon:Spear", "signature:Ice Freeze"],
    enemies: [
      bot({
        id: "en-bell-a",
        name: "CLAPPER",
        style: "Kung Fu",
        body: "Inverted",
        legs: "Pogo",
        weapon: "Spear",
        signature: "Projectile",
        scale: "Standard",
        traits: ["Erratic"],
        accent: "#9aa884",
        level: 3,
      }),
      bot({
        id: "en-bell-b",
        name: "TONGUE",
        style: "Brawler",
        body: "Cannon Arm",
        legs: "Humanoid",
        weapon: "Pistol",
        signature: "Fireball",
        scale: "Standard",
        traits: ["Reckless"],
        accent: "#c45c3a",
        level: 3,
      }),
    ],
  },
  {
    id: "coil-garden",
    index: 3,
    name: "Coil Garden",
    blurb: "Hover frames thread the pillars. Frozen joints decide the bout.",
    format: 2,
    salvage: 95,
    xp: 140,
    unlocks: ["legs:Hover", "body:Mage", "weapon:Staff", "trait:Cautious"],
    enemies: [
      bot({
        id: "en-coil-a",
        name: "IVY",
        style: "Martial Arts",
        body: "Mage",
        legs: "Hover",
        weapon: "Staff",
        signature: "Ice Freeze",
        scale: "Miniature",
        traits: ["Cautious"],
        accent: "#7a9aa8",
        level: 4,
      }),
      bot({
        id: "en-coil-b",
        name: "THORN",
        style: "Kung Fu",
        body: "Standard",
        legs: "Hover",
        weapon: "Sword",
        signature: "Acid Spray",
        scale: "Standard",
        traits: ["Calculated"],
        accent: "#9aa884",
        level: 4,
      }),
    ],
  },
  {
    id: "the-vat",
    index: 4,
    name: "The Vat",
    blurb: "Acid and plasma. Repair bills after this one are the real boss.",
    format: 2,
    salvage: 110,
    xp: 160,
    unlocks: ["weapon:Rifle", "weapon:Plasma Gun", "signature:Acid Spray", "scale:Large"],
    enemies: [
      bot({
        id: "en-vat-a",
        name: "SLUICE",
        style: "Brawler",
        body: "Cannon Arm",
        legs: "Tank",
        weapon: "Plasma Gun",
        signature: "Acid Spray",
        scale: "Large",
        traits: ["Aggressive"],
        accent: "#c45c3a",
        level: 5,
      }),
      bot({
        id: "en-vat-b",
        name: "FROTH",
        style: "Wrestler",
        body: "Drill Head",
        legs: "Wheels",
        weapon: "Axe",
        signature: "Quake",
        scale: "Standard",
        traits: ["Reckless"],
        accent: "#c4a574",
        level: 5,
      }),
    ],
  },
  {
    id: "night-gauge",
    index: 5,
    name: "Night Gauge",
    blurb: "Disciplined pair. They brace, then punish overclocks.",
    format: 2,
    salvage: 130,
    xp: 190,
    unlocks: ["body:Inverted", "signature:Electric Shock", "legs:Pogo", "trait:Erratic"],
    enemies: [
      bot({
        id: "en-night-a",
        name: "GAUGE",
        style: "Boxer",
        body: "Six Arms",
        legs: "Humanoid",
        weapon: "Fists",
        signature: "Electric Shock",
        scale: "Standard",
        traits: ["Disciplined"],
        accent: "#7a9aa8",
        level: 6,
      }),
      bot({
        id: "en-night-b",
        name: "NEEDLE",
        style: "Martial Arts",
        body: "Cyclops",
        legs: "Rocket",
        weapon: "Rifle",
        signature: "Laser Beam",
        scale: "Miniature",
        traits: ["Calculated"],
        accent: "#b7c0c8",
        level: 6,
      }),
    ],
  },
  {
    id: "crownworks",
    index: 6,
    name: "Crownworks",
    blurb: "Giant chassis. Limb loss is likely. Pack a repair budget.",
    format: 2,
    salvage: 150,
    xp: 220,
    unlocks: ["scale:Giant", "signature:Quake"],
    enemies: [
      bot({
        id: "en-crown-a",
        name: "CORONET",
        style: "Wrestler",
        body: "Six Arms",
        legs: "Tank",
        weapon: "Axe",
        signature: "Quake",
        scale: "Giant",
        traits: ["Aggressive"],
        accent: "#c4a574",
        level: 8,
      }),
      bot({
        id: "en-crown-b",
        name: "FILIGREE",
        style: "Kung Fu",
        body: "Mage",
        legs: "Hover",
        weapon: "Staff",
        signature: "Fireball",
        scale: "Large",
        traits: ["Erratic"],
        accent: "#9aa884",
        level: 8,
      }),
    ],
  },
  {
    id: "last-rite",
    index: 7,
    name: "Last Rite",
    blurb: "The house squad. Tag discipline and signature timing, or get dismantled.",
    format: 2,
    salvage: 200,
    xp: 280,
    unlocks: [],
    enemies: [
      bot({
        id: "en-last-a",
        name: "HIEROPHANT",
        style: "Martial Arts",
        body: "Mage",
        legs: "Rocket",
        weapon: "Plasma Gun",
        signature: "Electric Shock",
        scale: "Standard",
        traits: ["Calculated", "Disciplined"],
        accent: "#dfe6d8",
        level: 10,
      }),
      bot({
        id: "en-last-b",
        name: "RELIQUARY",
        style: "Brawler",
        body: "Drill Head",
        legs: "Tank",
        weapon: "Spear",
        signature: "Quake",
        scale: "Giant",
        traits: ["Aggressive", "Reckless"],
        accent: "#c45c3a",
        level: 10,
      }),
    ],
  },
];

export function xpToNext(level: number) {
  return 70 + level * 55;
}

export function repairCost(injuries: number) {
  return 28 * injuries;
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;
}
