import { SIGNATURES, STYLES, WEAPONS } from "./catalog";
import { deriveStats } from "./stats";
import type { BotBuild, CombatEvent, DerivedStats, LimbId, SignatureId } from "./types";

export const ARENA = { w: 1600, h: 920 };
export const OBSTACLES = [
  { x: 720, y: 130, w: 160, h: 46 },
  { x: 720, y: 744, w: 160, h: 46 },
  { x: 220, y: 360, w: 64, h: 200 },
  { x: 1316, y: 360, w: 64, h: 200 },
  { x: 540, y: 300, w: 70, h: 70 },
  { x: 990, y: 550, w: 70, h: 70 },
];

const SPAWNS = [
  [340, 280],
  [340, 640],
  [1260, 280],
  [1260, 640],
];

export interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  team: number;
  dmg: number;
  kind: string;
  r: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
}

export interface Floater {
  x: number;
  y: number;
  text: string;
  life: number;
  crit?: boolean;
}

export interface CombatBot {
  id: string;
  name: string;
  team: 0 | 1;
  slot: number;
  active: boolean;
  eliminated: boolean;
  build: BotBuild;
  stats: DerivedStats;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  hp: number;
  stamina: number;
  battery: number;
  cool: number;
  attack: number;
  attackDur: number;
  attackKind: string;
  special: boolean;
  hitFlash: number;
  guard: number;
  frozen: number;
  stagger: number;
  invuln: number;
  overclock: number;
  combo: number;
  comboT: number;
  missing: Record<LimbId, boolean>;
  assess: number;
  walk: number;
  radius: number;
}

export interface CombatWorld {
  bots: CombatBot[];
  projectiles: Projectile[];
  particles: Particle[];
  floaters: Floater[];
  events: CombatEvent[];
  t: number;
  phase: "intro" | "fight" | "over";
  winner: 0 | 1 | null;
  format: 1 | 2;
  hitstop: number;
  trauma: number;
  cam: { x: number; y: number };
  callSign: string;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function ang(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function circleRect(p: CombatBot, rect: (typeof OBSTACLES)[number]) {
  const cx = clamp(p.x, rect.x, rect.x + rect.w);
  const cy = clamp(p.y, rect.y, rect.y + rect.h);
  let dx = p.x - cx;
  let dy = p.y - cy;
  let d = Math.hypot(dx, dy);
  if (d < p.radius) {
    if (d < 0.001) {
      p.x -= p.radius;
      return;
    }
    p.x = cx + (dx / d) * p.radius;
    p.y = cy + (dy / d) * p.radius;
    p.vx *= 0.4;
    p.vy *= 0.4;
  }
}

function makeBot(build: BotBuild, team: 0 | 1, slot: number): CombatBot {
  const stats = deriveStats(build);
  const spawn = SPAWNS[team === 0 ? slot : 2 + slot] ?? SPAWNS[0];
  const missing = {
    leftArm: build.injuries.includes("leftArm"),
    rightArm: build.injuries.includes("rightArm"),
    leftLeg: build.injuries.includes("leftLeg"),
    rightLeg: build.injuries.includes("rightLeg"),
  };
  return {
    id: build.id,
    name: build.name,
    team,
    slot,
    active: slot === 0,
    eliminated: false,
    build,
    stats,
    x: spawn[0],
    y: spawn[1],
    vx: 0,
    vy: 0,
    angle: team === 0 ? 0 : Math.PI,
    hp: stats.maxHp,
    stamina: 100,
    battery: 100,
    cool: 0.4,
    attack: 0,
    attackDur: 0.5,
    attackKind: "",
    special: false,
    hitFlash: 0,
    guard: 0,
    frozen: 0,
    stagger: 0,
    invuln: 0,
    overclock: 0,
    combo: 0,
    comboT: 0,
    missing,
    assess: 1.1 + Math.random() * 0.7,
    walk: Math.random() * 10,
    radius: stats.radius,
  };
}

export function createWorld(player: BotBuild[], enemy: BotBuild[], format: 1 | 2): CombatWorld {
  const n = format;
  const bots: CombatBot[] = [];
  for (let i = 0; i < n; i++) bots.push(makeBot(player[i] ?? player[0], 0, i));
  for (let i = 0; i < n; i++) bots.push(makeBot(enemy[i] ?? enemy[0], 1, i));
  return {
    bots,
    projectiles: [],
    particles: [],
    floaters: [],
    events: [],
    t: 0,
    phase: "intro",
    winner: null,
    format,
    hitstop: 0,
    trauma: 0,
    cam: { x: ARENA.w / 2, y: ARENA.h / 2 },
    callSign: "",
  };
}

function log(w: CombatWorld, kind: CombatEvent["kind"], text: string) {
  w.events.push({ t: w.t, kind, text });
  if (w.events.length > 40) w.events.shift();
}

function spark(w: CombatWorld, x: number, y: number, color: string, n = 8) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 80 + Math.random() * 220;
    w.particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.25 + Math.random() * 0.35,
      max: 0.6,
      size: 2 + Math.random() * 3,
      color,
    });
  }
  if (w.particles.length > 160) w.particles.splice(0, w.particles.length - 160);
}

function pop(w: CombatWorld, x: number, y: number, text: string, crit = false) {
  w.floaters.push({ x, y, text, life: 0.9, crit });
}

function living(w: CombatWorld, team: 0 | 1) {
  return w.bots.filter((b) => b.team === team && !b.eliminated);
}

function activeOf(w: CombatWorld, team: 0 | 1) {
  return w.bots.find((b) => b.team === team && b.active && !b.eliminated);
}

function targetFor(w: CombatWorld, bot: CombatBot) {
  return activeOf(w, bot.team === 0 ? 1 : 0);
}

export function tagIn(w: CombatWorld, team: 0 | 1, slot: number) {
  if (w.phase !== "fight") return;
  const next = w.bots.find((b) => b.team === team && b.slot === slot && !b.eliminated);
  const cur = activeOf(w, team);
  if (!next || next.active) return;
  if (cur && cur.stamina < 18) return;
  if (cur) {
    cur.active = false;
    cur.attack = 0;
  }
  next.active = true;
  next.invuln = 0.35;
  next.stamina = Math.min(100, next.stamina + 8);
  w.callSign = `${next.name} IN`;
  log(w, "tag", `${next.name} tagged in`);
}

export function callSignature(w: CombatWorld, team: 0 | 1) {
  const bot = activeOf(w, team);
  if (!bot || w.phase !== "fight") return;
  fireSpecial(w, bot, true);
}

export function callOverclock(w: CombatWorld, team: 0 | 1) {
  const bot = activeOf(w, team);
  if (!bot || w.phase !== "fight" || bot.battery < 28) return;
  bot.battery -= 28;
  bot.overclock = 3.4;
  w.callSign = "OVERCLOCK";
  spark(w, bot.x, bot.y, "#dfe6d8", 14);
}

export function callBrace(w: CombatWorld, team: 0 | 1) {
  const bot = activeOf(w, team);
  if (!bot || w.phase !== "fight" || bot.stamina < 12) return;
  bot.stamina -= 12;
  bot.guard = 0.85;
}

function fireSpecial(w: CombatWorld, bot: CombatBot, forced: boolean) {
  const cost = SIGNATURES[bot.build.signature].cost;
  if (bot.battery < cost || bot.attack > 0 || bot.frozen > 0) return false;
  if (!forced && bot.battery < cost + 10) return false;
  bot.battery -= cost;
  bot.special = true;
  bot.attack = 0.92;
  bot.attackDur = 0.92;
  bot.attackKind = bot.build.signature;
  bot.cool = 0.5;
  w.callSign = bot.build.signature.toUpperCase();
  log(w, "special", `${bot.name} — ${bot.build.signature}`);
  return true;
}

function chooseAttack(bot: CombatBot, d: number) {
  const ranged = bot.stats.isRanged;
  if (ranged && d > 160) return { kind: bot.build.weapon, dur: 0.48, special: false };
  if (bot.combo >= 2) return { kind: "HEAVY", dur: 0.7, special: false };
  if (bot.build.style === "Wrestler" && d < 110) return { kind: "GRAPPLE", dur: 0.62, special: false };
  if (bot.build.style === "Kung Fu") return { kind: Math.random() < 0.4 ? "PALM" : "KICK", dur: 0.5, special: false };
  if (bot.build.style === "Boxer") return { kind: Math.random() < 0.45 ? "CROSS" : "JAB", dur: 0.42, special: false };
  return { kind: "STRIKE", dur: 0.52, special: false };
}

function attackDamage(bot: CombatBot, kind: string) {
  const oc = bot.overclock > 0 ? 1.22 : 1;
  const reckless = bot.build.traits.includes("Reckless") ? 1.08 : 1;
  if (bot.special) return bot.stats.heavy * bot.stats.specialPower * oc;
  if (kind === "HEAVY" || kind === "GRAPPLE" || kind === "CROSS" || kind === "KICK") {
    return bot.stats.heavy * 0.72 * oc * reckless;
  }
  return bot.stats.damage * oc * reckless;
}

function applyHit(w: CombatWorld, atk: CombatBot, vic: CombatBot, raw: number, kind: string) {
  if (vic.invuln > 0 || vic.eliminated) return;
  let dmg = raw * (1 - vic.stats.armor);
  if (vic.guard > 0) dmg *= 0.42;
  const crit = Math.random() < atk.stats.crit + (atk.build.body === "Cyclops" ? 0.04 : 0);
  if (crit) dmg *= 1.55;
  if (atk.build.body === "Drill Head") dmg *= 1.08;
  dmg = Math.max(4, dmg);
  vic.hp -= dmg;
  vic.hitFlash = 0.12;
  vic.stagger = Math.max(vic.stagger, crit ? 0.28 : 0.12);
  const a = ang(atk, vic);
  vic.vx += Math.cos(a) * (crit ? 280 : 140);
  vic.vy += Math.sin(a) * (crit ? 280 : 140);
  atk.combo += 1;
  atk.comboT = 1.2;
  w.hitstop = Math.max(w.hitstop, crit || atk.special ? 0.07 : 0.035);
  w.trauma = Math.min(1, w.trauma + (crit || atk.special ? 0.42 : 0.18));
  spark(w, vic.x, vic.y, crit ? "#eceee8" : STYLES[atk.build.style].color, crit ? 16 : 8);
  pop(w, vic.x, vic.y - 50, crit ? `${Math.round(dmg)} CRIT` : `${Math.round(dmg)}`, crit);
  log(w, crit ? "crit" : "hit", `${atk.name} ${kind} ${vic.name} for ${Math.round(dmg)}`);

  if (kind === "Ice Freeze" || atk.build.signature === "Ice Freeze" && atk.special) {
    vic.frozen = Math.max(vic.frozen, 1.35);
  }
  if (atk.build.signature === "Acid Spray" && atk.special) {
    vic.stats.armor = Math.max(0, vic.stats.armor - 0.04);
  }

  const major = atk.special || kind === "HEAVY" || kind === "GRAPPLE";
  if (major && vic.hp / vic.stats.maxHp < 0.46) {
    const parts = (Object.keys(vic.missing) as LimbId[]).filter((k) => !vic.missing[k]);
    if (parts.length && Math.random() < (atk.special ? 0.16 : 0.08)) {
      const part = parts[(Math.random() * parts.length) | 0];
      vic.missing[part] = true;
      pop(w, vic.x, vic.y - 80, `${part.replace("Arm", " ARM").replace("Leg", " LEG").toUpperCase()} LOST`, true);
      log(w, "limb", `${atk.name} dislodged ${vic.name}'s ${part}`);
      w.trauma = Math.min(1, w.trauma + 0.35);
    }
  }

  if (vic.hp <= 0) {
    vic.hp = 0;
    vic.eliminated = true;
    vic.active = false;
    log(w, "ko", `${vic.name} down`);
    spark(w, vic.x, vic.y, "#c45c3a", 22);
    const bench = w.bots.find((b) => b.team === vic.team && !b.eliminated && !b.active);
    if (bench) {
      bench.active = true;
      bench.invuln = 0.45;
      w.callSign = `${bench.name} IN`;
    } else if (!living(w, vic.team).length) {
      w.phase = "over";
      w.winner = atk.team;
    }
  }
}

function resolveMelee(w: CombatWorld, bot: CombatBot) {
  const t = targetFor(w, bot);
  if (!t) return;
  const reach = bot.special ? bot.stats.range + 90 : bot.stats.range + (WEAPONS[bot.build.weapon].ranged ? 40 : 70);
  if (dist(bot, t) <= reach + t.radius) {
    if (Math.random() < t.stats.dodge && t.guard <= 0) {
      pop(w, t.x, t.y - 40, "MISS");
      t.x += Math.cos(bot.angle + Math.PI / 2) * 18;
      return;
    }
    applyHit(w, bot, t, attackDamage(bot, bot.attackKind), bot.attackKind);
  }
}

function spawnShot(w: CombatWorld, bot: CombatBot, kind: string, dmg: number) {
  const speed = kind === "Laser Beam" ? 980 : kind === "Plasma Gun" || kind === "Fireball" ? 420 : 620;
  w.projectiles.push({
    x: bot.x + Math.cos(bot.angle) * (bot.radius + 8),
    y: bot.y + Math.sin(bot.angle) * (bot.radius + 8),
    vx: Math.cos(bot.angle) * speed,
    vy: Math.sin(bot.angle) * speed,
    life: 1.15,
    team: bot.team,
    dmg,
    kind,
    r: kind === "Fireball" ? 10 : 5,
  });
}

function specialContact(w: CombatWorld, bot: CombatBot) {
  const t = targetFor(w, bot);
  const sig = bot.build.signature as SignatureId;
  const dmg = attackDamage(bot, sig);
  if (sig === "Quake") {
    for (const o of w.bots) {
      if (o.team !== bot.team && !o.eliminated && dist(bot, o) < 210) applyHit(w, bot, o, dmg, sig);
    }
    spark(w, bot.x, bot.y, "#c4a574", 20);
    return;
  }
  if (sig === "Electric Shock" && t) {
    applyHit(w, bot, t, dmg, sig);
    const other = w.bots.find((b) => b.team === t.team && b !== t && !b.eliminated && dist(t, b) < 220);
    if (other) applyHit(w, bot, other, dmg * 0.55, sig);
    return;
  }
  if (sig === "Laser Beam" || sig === "Projectile" || sig === "Fireball" || sig === "Ice Freeze" || sig === "Acid Spray") {
    spawnShot(w, bot, sig, dmg);
    return;
  }
  resolveMelee(w, bot);
}

function ai(w: CombatWorld, bot: CombatBot, dt: number) {
  const t = targetFor(w, bot);
  if (!t) return;
  const d = dist(bot, t);
  bot.angle += Math.atan2(Math.sin(ang(bot, t) - bot.angle), Math.cos(ang(bot, t) - bot.angle)) * 8 * dt;

  const traits = bot.build.traits;
  const cautious = traits.includes("Cautious");
  const agg = traits.includes("Aggressive") || traits.includes("Reckless");
  const disc = traits.includes("Disciplined");
  const desired = bot.stats.isRanged ? (cautious ? 340 : 260) : agg ? 70 : 100;
  const speed = bot.stats.speed * (bot.overclock > 0 ? 1.2 : 1) * (bot.missing.leftLeg || bot.missing.rightLeg ? 0.9 : 1);

  if (bot.hp / bot.stats.maxHp < (cautious ? 0.38 : 0.22) && bot.team === 1) {
    const bench = w.bots.find((b) => b.team === 1 && !b.active && !b.eliminated && b.stamina > 40);
    if (bench && bot.stamina > 20) tagIn(w, 1, bench.slot);
  }

  if (bot.battery > SIGNATURES[bot.build.signature].cost + (agg ? 0 : 15) && (d < 380 || bot.stats.isRanged) && Math.random() < (agg ? 0.012 : 0.006)) {
    fireSpecial(w, bot, false);
  }

  if (disc && t.attack > 0 && d < 140 && bot.stamina > 20 && Math.random() < 0.08) {
    bot.guard = 0.4;
    bot.stamina -= 8;
  }

  const dx = t.x - bot.x;
  const dy = t.y - bot.y;
  const n = Math.hypot(dx, dy) || 1;
  let ax = 0;
  let ay = 0;
  if (d > desired + 16) {
    ax = (dx / n) * speed;
    ay = (dy / n) * speed;
  } else if (d < desired - 24) {
    ax = (-dx / n) * speed * 0.85;
    ay = (-dy / n) * speed * 0.85;
  } else {
    ax = (-dy / n) * speed * 0.35;
    ay = (dx / n) * speed * 0.35;
  }
  if (bot.build.legs === "Hover") {
    ax *= 1.02;
    ay *= 1.02;
  }
  bot.vx += (ax - bot.vx) * 6 * dt;
  bot.vy += (ay - bot.vy) * 6 * dt;

  const reach = bot.stats.range + (bot.stats.isRanged ? 80 : 55);
  if (bot.cool <= 0 && bot.attack <= 0 && d < reach + 40) {
    const at = chooseAttack(bot, d);
    bot.attackKind = at.kind;
    bot.attackDur = at.dur;
    bot.attack = at.dur;
    bot.cool = bot.stats.attackRate;
    bot.special = false;
  }
}

export function stepWorld(w: CombatWorld, dt: number) {
  w.t += dt;
  w.trauma = Math.max(0, w.trauma - dt * 1.8);
  if (w.callSign && Math.random() < dt * 1.2) {
    /* fade handled in UI via t */
  }
  if (w.phase === "intro") {
    if (w.t > 1.15) w.phase = "fight";
    return;
  }
  if (w.phase === "over") return;

  if (w.hitstop > 0) {
    w.hitstop -= dt;
    return;
  }

  for (const bot of w.bots) {
    if (bot.eliminated) continue;
    bot.cool = Math.max(0, bot.cool - dt);
    bot.hitFlash = Math.max(0, bot.hitFlash - dt);
    bot.guard = Math.max(0, bot.guard - dt);
    bot.frozen = Math.max(0, bot.frozen - dt);
    bot.stagger = Math.max(0, bot.stagger - dt);
    bot.invuln = Math.max(0, bot.invuln - dt);
    bot.overclock = Math.max(0, bot.overclock - dt);
    bot.comboT = Math.max(0, bot.comboT - dt);
    if (bot.comboT <= 0) bot.combo = 0;
    bot.walk += dt * 8;

    if (!bot.active) {
      bot.stamina = Math.min(100, bot.stamina + 22 * dt);
      bot.battery = Math.min(100, bot.battery + bot.stats.batteryRegen * 0.7 * dt);
      continue;
    }

    bot.stamina = Math.min(100, bot.stamina + bot.stats.staminaRegen * dt * 0.35);
    bot.battery = Math.min(100, bot.battery + bot.stats.batteryRegen * dt * 0.25);

    if (bot.assess > 0) {
      bot.assess -= dt;
      bot.vx *= 0.9;
      bot.vy *= 0.9;
    } else if (bot.frozen > 0 || bot.stagger > 0.18) {
      bot.vx *= 0.82;
      bot.vy *= 0.82;
    } else {
      ai(w, bot, dt);
    }

    if (bot.attack > 0) {
      const prev = bot.attack;
      bot.attack -= dt;
      const contact = bot.attackDur * 0.42;
      if (prev >= contact && bot.attack < contact) {
        if (bot.special) specialContact(w, bot);
        else if (bot.stats.isRanged && bot.attackKind === bot.build.weapon) {
          spawnShot(w, bot, bot.build.weapon, attackDamage(bot, bot.attackKind));
        } else resolveMelee(w, bot);
      }
      if (bot.attack <= 0) bot.special = false;
    }

    bot.x += bot.vx * dt;
    bot.y += bot.vy * dt;
    bot.x = clamp(bot.x, bot.radius + 20, ARENA.w - bot.radius - 20);
    bot.y = clamp(bot.y, bot.radius + 20, ARENA.h - bot.radius - 20);
    if (bot.build.legs !== "Hover") {
      for (const o of OBSTACLES) circleRect(bot, o);
    }
    bot.vx *= 0.86;
    bot.vy *= 0.86;
  }

  for (let i = w.projectiles.length - 1; i >= 0; i--) {
    const p = w.projectiles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    let hit = false;
    for (const b of w.bots) {
      if (b.team === p.team || b.eliminated || !b.active) continue;
      if (Math.hypot(b.x - p.x, b.y - p.y) < b.radius + p.r) {
        const atk = activeOf(w, p.team as 0 | 1);
        if (atk) applyHit(w, atk, b, p.dmg, p.kind);
        if (p.kind === "Ice Freeze") b.frozen = Math.max(b.frozen, 1.4);
        hit = true;
        break;
      }
    }
    if (hit || p.life <= 0 || p.x < 0 || p.y < 0 || p.x > ARENA.w || p.y > ARENA.h) {
      w.projectiles.splice(i, 1);
    }
  }

  for (let i = w.particles.length - 1; i >= 0; i--) {
    const p = w.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    p.vx *= 0.96;
    p.vy *= 0.96;
    if (p.life <= 0) w.particles.splice(i, 1);
  }
  for (let i = w.floaters.length - 1; i >= 0; i--) {
    w.floaters[i].y -= 36 * dt;
    w.floaters[i].life -= dt;
    if (w.floaters[i].life <= 0) w.floaters.splice(i, 1);
  }

  const a0 = activeOf(w, 0);
  const a1 = activeOf(w, 1);
  if (a0 && a1) {
    w.cam.x += ((a0.x + a1.x) / 2 - w.cam.x) * (1 - Math.exp(-3 * dt));
    w.cam.y += ((a0.y + a1.y) / 2 - w.cam.y) * (1 - Math.exp(-3 * dt));
  }
}

export function snapshotInjuries(w: CombatWorld) {
  const out: Record<string, LimbId[]> = {};
  for (const b of w.bots) {
    if (b.team !== 0) continue;
    const limbs = (Object.keys(b.missing) as LimbId[]).filter((k) => b.missing[k]);
    if (limbs.length) out[b.id] = limbs;
  }
  return out;
}
