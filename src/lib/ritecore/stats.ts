import {
  BODIES,
  LEGS,
  SCALES,
  SIGNATURES,
  STYLES,
  WEAPONS,
} from "./catalog";
import type { BotBuild, DerivedStats, LimbId } from "./types";

const LIMB_PENALTY: Record<LimbId, Partial<Record<keyof DerivedStats, number>>> = {
  leftArm: { damage: 0.88, heavy: 0.9 },
  rightArm: { damage: 0.82, range: 0.9, specialPower: 0.85 },
  leftLeg: { speed: 0.86, dodge: 0.8 },
  rightLeg: { speed: 0.86, dodge: 0.8 },
};

export function deriveStats(bot: BotBuild): DerivedStats {
  const style = STYLES[bot.style];
  const body = BODIES[bot.body];
  const legs = LEGS[bot.legs];
  const weapon = WEAPONS[bot.weapon];
  const sig = SIGNATURES[bot.signature];
  const scale = SCALES[bot.scale];
  const lvl = 1 + (bot.level - 1) * 0.085;

  const staffBonus = bot.weapon === "Staff" ? 1.12 : 1;
  const sixArmCombo = bot.body === "Six Arms" ? 1.1 : 1;
  const invertedDodge = bot.body === "Inverted" ? 1.18 : 1;
  const cyclopsCrit = bot.body === "Cyclops" ? 0.12 : 0.05;
  const cannonRanged = bot.body === "Cannon Arm" && weapon.ranged ? 1.12 : 1;
  const drillArmor = bot.body === "Drill Head" ? 1.08 : 1;

  const stats: DerivedStats = {
    maxHp: Math.round(style.hp * 1.45 * body.hp * scale.hp * lvl * drillArmor),
    speed: style.speed * legs.speed * scale.speed * lvl,
    damage: style.damage * weapon.damage * cannonRanged * sixArmCombo * lvl,
    heavy: style.heavy * weapon.damage * lvl,
    range: style.range * weapon.range,
    attackRate: Math.max(0.28, style.attackRate / (weapon.rate * sixArmCombo)),
    armor: 0.08 * body.armor * (bot.scale === "Giant" ? 1.2 : 1),
    crit: cyclopsCrit,
    dodge: 0.08 * legs.dodge * invertedDodge,
    staminaRegen: 14 * legs.stamina,
    batteryRegen: 10 * body.special,
    specialPower: sig.power * body.special * staffBonus * lvl,
    radius: 26 * scale.radius,
    isRanged: weapon.ranged,
  };

  for (const limb of bot.injuries) {
    const pen = LIMB_PENALTY[limb];
    for (const [k, v] of Object.entries(pen)) {
      const key = k as keyof DerivedStats;
      const cur = stats[key];
      if (typeof cur === "number" && typeof v === "number") {
        (stats[key] as number) = cur * v;
      }
    }
  }

  if (bot.injuries.includes("leftLeg") && bot.injuries.includes("rightLeg")) {
    stats.speed *= 0.72;
  }

  return stats;
}

export function describeLoadout(bot: BotBuild) {
  return `${bot.style} · ${bot.body} · ${bot.legs} · ${bot.weapon}`;
}
