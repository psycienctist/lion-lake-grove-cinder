import { STYLES } from "./catalog";
import { ARENA, OBSTACLES, type CombatBot, type CombatWorld } from "./combat";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function teamTint(team: number) {
  return team === 0 ? "#dfe6d8" : "#c45c3a";
}

function drawBot(ctx: CanvasRenderingContext2D, bot: CombatBot, t: number) {
  const style = STYLES[bot.build.style];
  const accent = bot.build.accent || style.color;
  const scale = bot.radius / 26;
  ctx.save();
  ctx.translate(bot.x, bot.y);
  ctx.rotate(bot.angle + Math.PI / 2);

  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 10, 22 * scale, 10 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  if (bot.guard > 0) {
    ctx.strokeStyle = "rgba(223,230,216,0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, bot.radius + 8, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (bot.frozen > 0) {
    ctx.strokeStyle = "rgba(122,154,168,0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, bot.radius + 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  const lean = bot.attack > 0 ? -8 : 0;
  ctx.translate(0, lean);
  const flash = bot.hitFlash > 0;
  const body = flash ? "#eceee8" : accent;
  const dark = flash ? "#8d9186" : "#1c1e1b";

  const swing = bot.attack > 0 ? Math.sin((1 - bot.attack / bot.attackDur) * Math.PI) * 0.9 : 0;
  const gait = Math.sin(bot.walk) * (bot.active ? 6 : 2);

  // legs
  const drawLeg = (side: number, missing: boolean) => {
    if (missing) return;
    ctx.fillStyle = dark;
    if (bot.build.legs === "Tank") {
      roundRect(ctx, side * 14 * scale - 8, 8, 16, 22 * scale, 3);
      ctx.fill();
    } else if (bot.build.legs === "Wheels") {
      ctx.beginPath();
      ctx.arc(side * 12 * scale, 22 * scale, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
    } else if (bot.build.legs === "Hover") {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = teamTint(bot.team);
      ctx.beginPath();
      ctx.ellipse(side * 10 * scale, 24 * scale, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else {
      ctx.save();
      ctx.translate(side * 10 * scale, 10);
      ctx.rotate(side * gait * 0.04);
      roundRect(ctx, -4, 0, 8, 22 * scale, 3);
      ctx.fill();
      ctx.restore();
    }
  };
  drawLeg(-1, bot.missing.leftLeg);
  drawLeg(1, bot.missing.rightLeg);

  // torso
  ctx.fillStyle = body;
  if (bot.build.body === "Inverted") {
    ctx.beginPath();
    ctx.moveTo(0, -28 * scale);
    ctx.lineTo(18 * scale, 8 * scale);
    ctx.lineTo(-18 * scale, 8 * scale);
    ctx.closePath();
    ctx.fill();
  } else if (bot.build.body === "Mage") {
    roundRect(ctx, -14 * scale, -24 * scale, 28 * scale, 36 * scale, 14);
    ctx.fill();
  } else {
    roundRect(ctx, -16 * scale, -22 * scale, 32 * scale, 34 * scale, 8);
    ctx.fill();
  }

  ctx.fillStyle = teamTint(bot.team);
  roundRect(ctx, -6, -8, 12, 8, 2);
  ctx.fill();

  if (bot.build.body === "Drill Head") {
    ctx.fillStyle = dark;
    ctx.beginPath();
    ctx.moveTo(0, -46 * scale);
    ctx.lineTo(8 * scale, -24 * scale);
    ctx.lineTo(-8 * scale, -24 * scale);
    ctx.closePath();
    ctx.fill();
  }

  const drawArm = (side: number, missing: boolean, armed: boolean) => {
    if (missing) return;
    ctx.save();
    ctx.translate(side * 16 * scale, -10 * scale);
    ctx.rotate(side * 0.4 + (armed ? swing * side : -swing * 0.3));
    ctx.fillStyle = dark;
    roundRect(ctx, -4, 0, 8, 24 * scale, 3);
    ctx.fill();
    if (armed) {
      ctx.fillStyle = "#eceee8";
      const w = bot.build.weapon;
      if (w === "Sword" || w === "Spear" || w === "Staff" || w === "Axe") {
        roundRect(ctx, -2, 18 * scale, 4, w === "Spear" ? 36 * scale : 26 * scale, 1);
        ctx.fill();
        if (w === "Axe") {
          ctx.beginPath();
          ctx.arc(0, 28 * scale, 10 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (w === "Pistol" || w === "Rifle" || w === "Plasma Gun") {
        roundRect(ctx, -3, 18 * scale, 18 * scale, 6, 1);
        ctx.fill();
      }
    }
    ctx.restore();
  };
  drawArm(-1, bot.missing.leftArm, false);
  drawArm(1, bot.missing.rightArm, true);

  if (bot.build.body === "Six Arms") {
    ctx.globalAlpha = 0.7;
    drawArm(-1.15, false, false);
    drawArm(1.15, false, false);
    ctx.globalAlpha = 1;
  }

  // head
  ctx.fillStyle = flash ? "#eceee8" : dark;
  if (bot.build.body === "Cyclops") {
    ctx.beginPath();
    ctx.arc(0, -30 * scale, 11 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(0, -30 * scale, 4.5 * scale, 0, Math.PI * 2);
    ctx.fill();
  } else {
    roundRect(ctx, -10 * scale, -40 * scale, 20 * scale, 16 * scale, 5);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.fillRect(-6 * scale, -36 * scale, 4 * scale, 4 * scale);
    ctx.fillRect(2 * scale, -36 * scale, 4 * scale, 4 * scale);
  }

  ctx.restore();

  ctx.save();
  ctx.font = "700 11px Figtree, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = bot.team === 0 ? "#dfe6d8" : "#c45c3a";
  ctx.fillText(bot.name, bot.x, bot.y - bot.radius - 22);
  const bw = 44;
  ctx.fillStyle = "#1c1e1b";
  ctx.fillRect(bot.x - bw / 2, bot.y - bot.radius - 16, bw, 4);
  ctx.fillStyle = "#c45c3a";
  ctx.fillRect(bot.x - bw / 2, bot.y - bot.radius - 16, bw * (bot.hp / bot.stats.maxHp), 4);
  ctx.restore();
}

export function drawWorld(
  ctx: CanvasRenderingContext2D,
  w: CombatWorld,
  viewW: number,
  viewH: number,
  shakeOn: boolean,
) {
  const shake = shakeOn ? w.trauma * w.trauma : 0;
  const ox = (Math.random() - 0.5) * 18 * shake;
  const oy = (Math.random() - 0.5) * 18 * shake;
  const zoom = Math.min(viewW / (ARENA.w * 0.72), viewH / (ARENA.h * 0.72));
  ctx.save();
  ctx.fillStyle = "#0b0c0b";
  ctx.fillRect(0, 0, viewW, viewH);
  ctx.translate(viewW / 2 + ox, viewH / 2 + oy);
  ctx.scale(zoom, zoom);
  ctx.translate(-w.cam.x, -w.cam.y);

  // floor
  ctx.fillStyle = "#121412";
  ctx.fillRect(0, 0, ARENA.w, ARENA.h);
  ctx.strokeStyle = "rgba(223,230,216,0.12)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.ellipse(ARENA.w / 2, ARENA.h / 2, 520, 320, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(223,230,216,0.06)";
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, ARENA.w - 32, ARENA.h - 32);

  for (const o of OBSTACLES) {
    ctx.fillStyle = "#1c1e1b";
    ctx.strokeStyle = "rgba(236,238,232,0.08)";
    ctx.lineWidth = 1;
    roundRect(ctx, o.x, o.y, o.w, o.h, 6);
    ctx.fill();
    ctx.stroke();
  }

  for (const p of w.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
  ctx.globalAlpha = 1;

  for (const p of w.projectiles) {
    ctx.fillStyle = p.kind === "Ice Freeze" ? "#7a9aa8" : p.kind === "Fireball" ? "#c45c3a" : "#eceee8";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  const drawOrder = [...w.bots].sort((a, b) => a.y - b.y);
  for (const bot of drawOrder) {
    if (bot.eliminated) {
      ctx.save();
      ctx.globalAlpha = 0.28;
      drawBot(ctx, bot, w.t);
      ctx.restore();
    } else if (bot.active) {
      drawBot(ctx, bot, w.t);
    } else {
      ctx.save();
      ctx.globalAlpha = 0.4;
      drawBot(ctx, bot, w.t);
      ctx.restore();
    }
  }

  for (const f of w.floaters) {
    ctx.globalAlpha = Math.max(0, f.life);
    ctx.fillStyle = f.crit ? "#eceee8" : "#c45c3a";
    ctx.font = `${f.crit ? 700 : 600} ${f.crit ? 16 : 13}px IBM Plex Mono, monospace`;
    ctx.textAlign = "center";
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

export function drawPortrait(
  ctx: CanvasRenderingContext2D,
  bot: { style: string; body: string; legs: string; weapon: string; accent: string; name: string },
  w: number,
  h: number,
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#141614";
  ctx.fillRect(0, 0, w, h);
  const fake = {
    id: "p",
    name: bot.name,
    team: 0 as const,
    slot: 0,
    active: true,
    eliminated: false,
    build: {
      id: "p",
      name: bot.name,
      style: bot.style as CombatBot["build"]["style"],
      body: bot.body as CombatBot["build"]["body"],
      legs: bot.legs as CombatBot["build"]["legs"],
      weapon: bot.weapon as CombatBot["build"]["weapon"],
      signature: "Projectile" as const,
      scale: "Standard" as const,
      traits: [],
      accent: bot.accent,
      level: 1,
      xp: 0,
      injuries: [],
    },
    stats: {
      maxHp: 100,
      speed: 1,
      damage: 1,
      heavy: 1,
      range: 1,
      attackRate: 1,
      armor: 0,
      crit: 0,
      dodge: 0,
      staminaRegen: 1,
      batteryRegen: 1,
      specialPower: 1,
      radius: 28,
      isRanged: false,
    },
    x: w / 2,
    y: h / 2 - 6,
    vx: 0,
    vy: 0,
    angle: -Math.PI / 2,
    hp: 100,
    stamina: 100,
    battery: 100,
    cool: 0,
    attack: 0,
    attackDur: 1,
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
    missing: { leftArm: false, rightArm: false, leftLeg: false, rightLeg: false },
    assess: 0,
    walk: 2.2,
    radius: 28,
  };
  ctx.save();
  ctx.translate(0, 8);
  drawBot(ctx, fake, 0);
  ctx.restore();
}
