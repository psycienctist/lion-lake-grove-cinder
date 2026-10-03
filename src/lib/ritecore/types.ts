export type StyleId =
  | "Kung Fu"
  | "Boxer"
  | "Wrestler"
  | "Brawler"
  | "Martial Arts";

export type BodyId =
  | "Standard"
  | "Cannon Arm"
  | "Six Arms"
  | "Inverted"
  | "Cyclops"
  | "Drill Head"
  | "Mage";

export type LegsId = "Humanoid" | "Tank" | "Rocket" | "Hover" | "Pogo" | "Wheels";

export type WeaponId =
  | "Fists"
  | "Sword"
  | "Axe"
  | "Spear"
  | "Staff"
  | "Pistol"
  | "Rifle"
  | "Plasma Gun";

export type SignatureId =
  | "Laser Beam"
  | "Projectile"
  | "Fireball"
  | "Ice Freeze"
  | "Acid Spray"
  | "Electric Shock"
  | "Quake";

export type ScaleId = "Miniature" | "Standard" | "Large" | "Giant";

export type TraitId =
  | "Reckless"
  | "Cautious"
  | "Calculated"
  | "Aggressive"
  | "Disciplined"
  | "Erratic";

export type LimbId = "leftArm" | "rightArm" | "leftLeg" | "rightLeg";

export type Rarity = "common" | "rare" | "epic";

export interface BotBuild {
  id: string;
  name: string;
  style: StyleId;
  body: BodyId;
  legs: LegsId;
  weapon: WeaponId;
  signature: SignatureId;
  scale: ScaleId;
  traits: TraitId[];
  accent: string;
  level: number;
  xp: number;
  injuries: LimbId[];
}

export interface DerivedStats {
  maxHp: number;
  speed: number;
  damage: number;
  heavy: number;
  range: number;
  attackRate: number;
  armor: number;
  crit: number;
  dodge: number;
  staminaRegen: number;
  batteryRegen: number;
  specialPower: number;
  radius: number;
  isRanged: boolean;
}

export interface Squad {
  id: string;
  name: string;
  botIds: string[];
}

export interface RiteDef {
  id: string;
  index: number;
  name: string;
  blurb: string;
  format: 1 | 2;
  salvage: number;
  xp: number;
  unlocks: string[];
  enemies: BotBuild[];
}

export interface CombatEvent {
  t: number;
  kind: "hit" | "special" | "tag" | "ko" | "limb" | "crit" | "guard";
  text: string;
}

export interface FightResult {
  won: boolean;
  riteId: string | null;
  skirmish: boolean;
  salvage: number;
  xp: number;
  loot: string | null;
  injuries: Record<string, LimbId[]>;
  events: CombatEvent[];
  duration: number;
}

export interface GameSave {
  version: number;
  salvage: number;
  unlocked: string[];
  cleared: string[];
  bots: BotBuild[];
  squad: string[];
  settings: { shake: boolean; mute: boolean };
}
