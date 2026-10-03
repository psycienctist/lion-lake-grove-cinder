import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, c as Hammer, i as Swords, l as Copy, o as Map, r as Trash2, s as Lock, t as Wrench } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DO_3mvcY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ctx = null;
var muted = false;
function setMuted(v) {
	muted = v;
}
function ac() {
	if (muted || typeof window === "undefined") return null;
	if (!ctx) {
		const C = window.AudioContext || window.webkitAudioContext;
		if (!C) return null;
		ctx = new C();
	}
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function unlockAudio() {
	ac();
}
function beep(freq, dur, type, gain = .05) {
	const c = ac();
	if (!c) return;
	const t = c.currentTime;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = type;
	o.frequency.value = freq;
	g.gain.setValueAtTime(gain, t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	o.connect(g);
	g.connect(c.destination);
	o.start(t);
	o.stop(t + dur);
}
var sfx = {
	hit: () => beep(180 + Math.random() * 40, .08, "square", .04),
	heavy: () => {
		beep(90, .14, "sawtooth", .06);
		beep(220, .08, "square", .03);
	},
	special: () => {
		beep(420, .18, "triangle", .05);
		beep(180, .22, "sawtooth", .04);
	},
	tag: () => beep(520, .1, "square", .035),
	ko: () => beep(70, .35, "sawtooth", .07),
	ui: () => beep(640, .05, "triangle", .03),
	win: () => {
		beep(440, .12, "triangle", .04);
		setTimeout(() => beep(660, .16, "triangle", .04), 90);
	}
};
var STYLES = {
	"Kung Fu": {
		speed: 188,
		range: 78,
		damage: 9,
		heavy: 18,
		hp: 102,
		attackRate: .34,
		color: "#9aa884",
		kit: "Palm strings into Dragon Rush. Prefers tempo and air kicks."
	},
	Boxer: {
		speed: 150,
		range: 118,
		damage: 11,
		heavy: 26,
		hp: 112,
		attackRate: .5,
		color: "#7a9aa8",
		kit: "Jab-cross pressure. Counters with Iron Cross at close range."
	},
	Wrestler: {
		speed: 108,
		range: 76,
		damage: 13,
		heavy: 32,
		hp: 138,
		attackRate: .66,
		color: "#c4a574",
		kit: "Clinch, slam, shockwave. Wins the pit floor."
	},
	Brawler: {
		speed: 128,
		range: 84,
		damage: 16,
		heavy: 38,
		hp: 120,
		attackRate: .72,
		color: "#c45c3a",
		kit: "Heavy swings and scrap cannon. Trades blood for knockouts."
	},
	"Martial Arts": {
		speed: 158,
		range: 102,
		damage: 12,
		heavy: 24,
		hp: 110,
		attackRate: .46,
		color: "#b7c0c8",
		kit: "Counters, freeze needles, shadow flurry. Reads the opponent first."
	}
};
var BODIES = {
	Standard: {
		hp: 1,
		armor: 1,
		special: 1,
		note: "Balanced frame"
	},
	"Cannon Arm": {
		hp: 1.06,
		armor: .96,
		special: 1.12,
		note: "Ranged authority"
	},
	"Six Arms": {
		hp: 1.1,
		armor: .94,
		special: 1.04,
		note: "Combo density"
	},
	Inverted: {
		hp: .92,
		armor: .9,
		special: 1.06,
		note: "Evasion bias"
	},
	Cyclops: {
		hp: .96,
		armor: 1.02,
		special: 1.08,
		note: "Crit optics"
	},
	"Drill Head": {
		hp: 1.08,
		armor: 1.16,
		special: .92,
		note: "Armor break"
	},
	Mage: {
		hp: .9,
		armor: .88,
		special: 1.28,
		note: "Core overclock"
	}
};
var LEGS = {
	Humanoid: {
		speed: 1,
		dodge: 1,
		stamina: 1,
		note: "Sure footing"
	},
	Tank: {
		speed: .72,
		dodge: .7,
		stamina: 1.2,
		note: "Plated crawl"
	},
	Rocket: {
		speed: 1.18,
		dodge: 1.15,
		stamina: .88,
		note: "Burst dash"
	},
	Hover: {
		speed: 1.08,
		dodge: 1.22,
		stamina: .9,
		note: "Glides over clutter"
	},
	Pogo: {
		speed: 1.14,
		dodge: 1.08,
		stamina: .94,
		note: "Vertical burst"
	},
	Wheels: {
		speed: 1.26,
		dodge: .78,
		stamina: 1.06,
		note: "Line speed"
	}
};
var WEAPONS = {
	Fists: {
		damage: .92,
		range: .9,
		rate: 1.18,
		ranged: false,
		note: "Fast hands"
	},
	Sword: {
		damage: 1.08,
		range: 1.12,
		rate: 1.02,
		ranged: false,
		note: "Clean arcs"
	},
	Axe: {
		damage: 1.28,
		range: 1.05,
		rate: .78,
		ranged: false,
		note: "Cleave"
	},
	Spear: {
		damage: 1.06,
		range: 1.34,
		rate: .94,
		ranged: false,
		note: "Reach"
	},
	Staff: {
		damage: .96,
		range: 1.16,
		rate: 1.04,
		ranged: false,
		note: "Signature synergy"
	},
	Pistol: {
		damage: .88,
		range: 2.4,
		rate: 1.1,
		ranged: true,
		note: "Snap shots"
	},
	Rifle: {
		damage: 1.04,
		range: 3.1,
		rate: .86,
		ranged: true,
		note: "Lane control"
	},
	"Plasma Gun": {
		damage: 1.22,
		range: 2.7,
		rate: .72,
		ranged: true,
		note: "Heavy bolt"
	}
};
var SIGNATURES = {
	"Laser Beam": {
		power: 1.15,
		cost: 38,
		note: "Instant line"
	},
	Projectile: {
		power: 1,
		cost: 32,
		note: "Hard round"
	},
	Fireball: {
		power: 1.18,
		cost: 40,
		note: "Arcing heat"
	},
	"Ice Freeze": {
		power: .92,
		cost: 42,
		note: "Locks joints"
	},
	"Acid Spray": {
		power: .86,
		cost: 36,
		note: "Eats armor"
	},
	"Electric Shock": {
		power: 1.08,
		cost: 44,
		note: "Chains nearby"
	},
	Quake: {
		power: 1.22,
		cost: 48,
		note: "Floor break"
	}
};
var SCALES = {
	Miniature: {
		hp: .82,
		speed: 1.16,
		radius: .82
	},
	Standard: {
		hp: 1,
		speed: 1,
		radius: 1
	},
	Large: {
		hp: 1.18,
		speed: .9,
		radius: 1.16
	},
	Giant: {
		hp: 1.36,
		speed: .78,
		radius: 1.34
	}
};
var TRAITS = {
	Reckless: { note: "Commits early, hits harder, guards less" },
	Cautious: { note: "Keeps range, tags out sooner" },
	Calculated: { note: "Waits for counters and crit windows" },
	Aggressive: { note: "Hunts low HP, spends battery fast" },
	Disciplined: { note: "Holds guard, spends stamina cleanly" },
	Erratic: { note: "Feints, odd timing, wild specials" }
};
var START_UNLOCKS = [
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
	"trait:Disciplined"
];
var ACCENTS = [
	"#dfe6d8",
	"#9aa884",
	"#7a9aa8",
	"#c45c3a",
	"#c4a574",
	"#b7c0c8"
];
function bot(partial) {
	return {
		xp: 0,
		injuries: [],
		...partial
	};
}
var STARTERS = [
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
		level: 1
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
		level: 1
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
		level: 1
	})
];
var RITES = [
	{
		id: "white-room",
		index: 0,
		name: "White Room",
		blurb: "A calibration bout. Learn the caller's verbs: tag, signature, overclock, brace.",
		format: 1,
		salvage: 40,
		xp: 70,
		unlocks: [
			"body:Cannon Arm",
			"weapon:Axe",
			"legs:Tank"
		],
		enemies: [bot({
			id: "en-spar",
			name: "SPAR-01",
			style: "Boxer",
			body: "Standard",
			legs: "Humanoid",
			weapon: "Fists",
			signature: "Projectile",
			scale: "Standard",
			traits: ["Disciplined"],
			accent: "#8d9186",
			level: 1
		})]
	},
	{
		id: "rust-approach",
		index: 1,
		name: "Rust Approach",
		blurb: "The gate bot chews armor. Bring a drill or don't bother.",
		format: 1,
		salvage: 55,
		xp: 90,
		unlocks: [
			"signature:Fireball",
			"legs:Rocket",
			"trait:Reckless"
		],
		enemies: [bot({
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
			level: 2
		})]
	},
	{
		id: "twin-bell",
		index: 2,
		name: "Twin Bell",
		blurb: "First tag rite. Bench stamina is a resource — spend it on purpose.",
		format: 2,
		salvage: 80,
		xp: 120,
		unlocks: [
			"body:Six Arms",
			"weapon:Spear",
			"signature:Ice Freeze"
		],
		enemies: [bot({
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
			level: 3
		}), bot({
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
			level: 3
		})]
	},
	{
		id: "coil-garden",
		index: 3,
		name: "Coil Garden",
		blurb: "Hover frames thread the pillars. Frozen joints decide the bout.",
		format: 2,
		salvage: 95,
		xp: 140,
		unlocks: [
			"legs:Hover",
			"body:Mage",
			"weapon:Staff",
			"trait:Cautious"
		],
		enemies: [bot({
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
			level: 4
		}), bot({
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
			level: 4
		})]
	},
	{
		id: "the-vat",
		index: 4,
		name: "The Vat",
		blurb: "Acid and plasma. Repair bills after this one are the real boss.",
		format: 2,
		salvage: 110,
		xp: 160,
		unlocks: [
			"weapon:Rifle",
			"weapon:Plasma Gun",
			"signature:Acid Spray",
			"scale:Large"
		],
		enemies: [bot({
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
			level: 5
		}), bot({
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
			level: 5
		})]
	},
	{
		id: "night-gauge",
		index: 5,
		name: "Night Gauge",
		blurb: "Disciplined pair. They brace, then punish overclocks.",
		format: 2,
		salvage: 130,
		xp: 190,
		unlocks: [
			"body:Inverted",
			"signature:Electric Shock",
			"legs:Pogo",
			"trait:Erratic"
		],
		enemies: [bot({
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
			level: 6
		}), bot({
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
			level: 6
		})]
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
		enemies: [bot({
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
			level: 8
		}), bot({
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
			level: 8
		})]
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
		enemies: [bot({
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
			level: 10
		}), bot({
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
			level: 10
		})]
	}
];
function xpToNext(level) {
	return 70 + level * 55;
}
function repairCost(injuries) {
	return 28 * injuries;
}
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;
}
var SAVE_KEY = "ritecore-save-v1";
function defaultSave() {
	return {
		version: 1,
		salvage: 80,
		unlocked: [...START_UNLOCKS],
		cleared: [],
		bots: STARTERS.map((b) => ({
			...b,
			traits: [...b.traits],
			injuries: []
		})),
		squad: STARTERS.slice(0, 2).map((b) => b.id),
		settings: {
			shake: true,
			mute: false
		}
	};
}
function migrate(raw) {
	const base = defaultSave();
	if (!raw || typeof raw !== "object") return base;
	const s = raw;
	return {
		...base,
		...s,
		version: 1,
		settings: {
			...base.settings,
			...s.settings
		},
		unlocked: Array.isArray(s.unlocked) ? s.unlocked : base.unlocked,
		cleared: Array.isArray(s.cleared) ? s.cleared : base.cleared,
		bots: Array.isArray(s.bots) && s.bots.length ? s.bots : base.bots,
		squad: Array.isArray(s.squad) && s.squad.length ? s.squad : base.squad
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return defaultSave();
		return migrate(JSON.parse(raw));
	} catch {
		return defaultSave();
	}
}
function persistSave(save) {
	try {
		localStorage.setItem(SAVE_KEY, JSON.stringify(save));
	} catch {}
}
function write(save) {
	persistSave(save);
}
var useGame = create((set, get) => ({
	ready: false,
	screen: "title",
	save: defaultSave(),
	selectedId: STARTERS[0].id,
	match: null,
	result: null,
	hydrate: () => {
		const save = loadSave();
		set({
			save,
			selectedId: save.bots[0]?.id ?? "",
			ready: true
		});
	},
	persist: () => write(get().save),
	setScreen: (screen) => set({ screen }),
	selectBot: (selectedId) => set({ selectedId }),
	updateBot: (id, patch) => {
		const save = {
			...get().save,
			bots: get().save.bots.map((b) => b.id === id ? {
				...b,
				...patch
			} : b)
		};
		write(save);
		set({ save });
	},
	toggleSquad: (id) => {
		const save = get().save;
		let squad = save.squad.includes(id) ? save.squad.filter((x) => x !== id) : [...save.squad, id];
		if (squad.length > 3) squad = squad.slice(-3);
		const next = {
			...save,
			squad
		};
		write(next);
		set({ save: next });
	},
	newBot: () => {
		const save = get().save;
		const bot = {
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
			injuries: []
		};
		const next = {
			...save,
			bots: [...save.bots, bot]
		};
		write(next);
		set({
			save: next,
			selectedId: bot.id
		});
	},
	deleteBot: (id) => {
		const save = get().save;
		if (save.bots.length <= 1) return;
		const bots = save.bots.filter((b) => b.id !== id);
		const squad = save.squad.filter((s) => s !== id);
		const next = {
			...save,
			bots,
			squad: squad.length ? squad : [bots[0].id]
		};
		write(next);
		set({
			save: next,
			selectedId: bots[0].id
		});
	},
	duplicateBot: (id) => {
		const src = get().save.bots.find((b) => b.id === id);
		if (!src) return;
		const bot = {
			...src,
			id: uid("bot"),
			name: `${src.name}-2`,
			injuries: []
		};
		const save = {
			...get().save,
			bots: [...get().save.bots, bot]
		};
		write(save);
		set({
			save,
			selectedId: bot.id
		});
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
			bots: save.bots.map((b) => b.id === id ? {
				...b,
				injuries: []
			} : b)
		};
		write(next);
		set({ save: next });
	},
	startRite: (riteId) => {
		const rite = RITES.find((r) => r.id === riteId);
		const save = get().save;
		if (!rite) return;
		const squad = save.squad.map((id) => save.bots.find((b) => b.id === id)).filter((b) => Boolean(b)).slice(0, rite.format);
		if (squad.length < rite.format) return;
		set({
			match: {
				riteId,
				skirmish: false,
				format: rite.format,
				player: squad,
				enemy: rite.enemies
			},
			screen: "arena"
		});
	},
	startSkirmish: () => {
		const save = get().save;
		const format = save.squad.length >= 2 ? 2 : 1;
		const squad = save.squad.map((id) => save.bots.find((b) => b.id === id)).filter((b) => Boolean(b)).slice(0, format);
		if (!squad.length) return;
		const pool = RITES.flatMap((r) => r.enemies);
		set({
			match: {
				riteId: null,
				skirmish: true,
				format,
				player: squad,
				enemy: Array.from({ length: format }, (_, i) => {
					return {
						...pool[Math.random() * pool.length | 0],
						id: uid("sk"),
						level: Math.max(1, squad[i % squad.length].level)
					};
				})
			},
			screen: "arena"
		});
	},
	finishFight: (result) => set({
		result,
		screen: "aftermath"
	}),
	collectResult: () => {
		const { result, save } = get();
		if (!result) {
			set({
				screen: "circuit",
				match: null
			});
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
			const injuries = inj ? Array.from(/* @__PURE__ */ new Set([...b.injuries, ...inj])) : b.injuries;
			return {
				...b,
				xp,
				level,
				injuries
			};
		});
		const unlocked = new Set(save.unlocked);
		const cleared = new Set(save.cleared);
		if (result.won && result.riteId) {
			cleared.add(result.riteId);
			RITES.find((r) => r.id === result.riteId)?.unlocks.forEach((u) => unlocked.add(u));
		}
		if (result.loot && result.won) unlocked.add(result.loot);
		const next = {
			...save,
			salvage: save.salvage + (result.won ? result.salvage : Math.floor(result.salvage * .25)),
			bots,
			unlocked: Array.from(unlocked),
			cleared: Array.from(cleared)
		};
		write(next);
		set({
			save: next,
			result: null,
			match: null,
			screen: "circuit"
		});
	},
	resetSave: () => {
		const save = defaultSave();
		write(save);
		set({
			save,
			selectedId: save.bots[0].id,
			screen: "title",
			match: null,
			result: null
		});
	},
	toggleSetting: (k) => {
		const save = {
			...get().save,
			settings: {
				...get().save.settings,
				[k]: !get().save.settings[k]
			}
		};
		write(save);
		set({ save });
	}
}));
function isUnlocked(save, key) {
	return save.unlocked.includes(key) || START_UNLOCKS.includes(key);
}
function riteLocked(save, index) {
	if (index === 0) return false;
	return !save.cleared.includes(RITES[index - 1].id);
}
var STYLE_LIST = [
	"Kung Fu",
	"Boxer",
	"Wrestler",
	"Brawler",
	"Martial Arts"
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-[var(--motion-fast,250ms)] disabled:pointer-events-none disabled:opacity-40", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-fg",
			secondary: "border border-border bg-raised text-fg hover:bg-surface",
			ghost: "text-muted hover:bg-raised hover:text-fg",
			danger: "bg-hp text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function AftermathScreen() {
	const result = useGame((s) => s.result);
	const save = useGame((s) => s.save);
	const collectResult = useGame((s) => s.collectResult);
	const setScreen = useGame((s) => s.setScreen);
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => setScreen("circuit"),
			children: "Circuit"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-[0.2em] text-muted uppercase",
				children: "Aftermath"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold tracking-tight",
				children: result.won ? "Rite sealed" : "Rite broken"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: result.won ? "Salvage and experience land in the garage. Injured limbs stay missing until you pay the wrench." : "A quarter of the purse as scrap. Injuries still stick."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface p-4 font-mono text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: "Salvage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-lg tabular-nums",
						children: result.won ? result.salvage : Math.floor(result.salvage * .25)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: "XP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-lg tabular-nums",
						children: result.won ? result.xp : 0
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Duration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [Math.round(result.duration), "s"] })]
					}),
					result.loot && result.won && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Unlocked"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: result.loot.replace(":", " · ") })]
					})
				]
			}),
			Object.keys(result.injuries).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-border bg-raised p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-hp",
					children: "Structural damage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 text-muted",
					children: Object.entries(result.injuries).map(([id, limbs]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						save.bots.find((b) => b.id === id)?.name ?? id,
						": ",
						limbs.join(", ")
					] }, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-1 font-mono text-xs text-faint",
				children: result.events.slice(-8).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					e.t.toFixed(1),
					" · ",
					e.text
				] }, `${e.t}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				onClick: collectResult,
				children: "Return to circuit"
			})
		]
	});
}
var LIMB_PENALTY = {
	leftArm: {
		damage: .88,
		heavy: .9
	},
	rightArm: {
		damage: .82,
		range: .9,
		specialPower: .85
	},
	leftLeg: {
		speed: .86,
		dodge: .8
	},
	rightLeg: {
		speed: .86,
		dodge: .8
	}
};
function deriveStats(bot) {
	const style = STYLES[bot.style];
	const body = BODIES[bot.body];
	const legs = LEGS[bot.legs];
	const weapon = WEAPONS[bot.weapon];
	const sig = SIGNATURES[bot.signature];
	const scale = SCALES[bot.scale];
	const lvl = 1 + (bot.level - 1) * .085;
	const staffBonus = bot.weapon === "Staff" ? 1.12 : 1;
	const sixArmCombo = bot.body === "Six Arms" ? 1.1 : 1;
	const invertedDodge = bot.body === "Inverted" ? 1.18 : 1;
	const cyclopsCrit = bot.body === "Cyclops" ? .12 : .05;
	const cannonRanged = bot.body === "Cannon Arm" && weapon.ranged ? 1.12 : 1;
	const drillArmor = bot.body === "Drill Head" ? 1.08 : 1;
	const stats = {
		maxHp: Math.round(style.hp * 1.45 * body.hp * scale.hp * lvl * drillArmor),
		speed: style.speed * legs.speed * scale.speed * lvl,
		damage: style.damage * weapon.damage * cannonRanged * sixArmCombo * lvl,
		heavy: style.heavy * weapon.damage * lvl,
		range: style.range * weapon.range,
		attackRate: Math.max(.28, style.attackRate / (weapon.rate * sixArmCombo)),
		armor: .08 * body.armor * (bot.scale === "Giant" ? 1.2 : 1),
		crit: cyclopsCrit,
		dodge: .08 * legs.dodge * invertedDodge,
		staminaRegen: 14 * legs.stamina,
		batteryRegen: 10 * body.special,
		specialPower: sig.power * body.special * staffBonus * lvl,
		radius: 26 * scale.radius,
		isRanged: weapon.ranged
	};
	for (const limb of bot.injuries) {
		const pen = LIMB_PENALTY[limb];
		for (const [k, v] of Object.entries(pen)) {
			const key = k;
			const cur = stats[key];
			if (typeof cur === "number" && typeof v === "number") stats[key] = cur * v;
		}
	}
	if (bot.injuries.includes("leftLeg") && bot.injuries.includes("rightLeg")) stats.speed *= .72;
	return stats;
}
var ARENA = {
	w: 1600,
	h: 920
};
var OBSTACLES = [
	{
		x: 720,
		y: 130,
		w: 160,
		h: 46
	},
	{
		x: 720,
		y: 744,
		w: 160,
		h: 46
	},
	{
		x: 220,
		y: 360,
		w: 64,
		h: 200
	},
	{
		x: 1316,
		y: 360,
		w: 64,
		h: 200
	},
	{
		x: 540,
		y: 300,
		w: 70,
		h: 70
	},
	{
		x: 990,
		y: 550,
		w: 70,
		h: 70
	}
];
var SPAWNS = [
	[340, 280],
	[340, 640],
	[1260, 280],
	[1260, 640]
];
function clamp(v, a, b) {
	return Math.max(a, Math.min(b, v));
}
function dist(a, b) {
	return Math.hypot(a.x - b.x, a.y - b.y);
}
function ang(a, b) {
	return Math.atan2(b.y - a.y, b.x - a.x);
}
function circleRect(p, rect) {
	const cx = clamp(p.x, rect.x, rect.x + rect.w);
	const cy = clamp(p.y, rect.y, rect.y + rect.h);
	let dx = p.x - cx;
	let dy = p.y - cy;
	let d = Math.hypot(dx, dy);
	if (d < p.radius) {
		if (d < .001) {
			p.x -= p.radius;
			return;
		}
		p.x = cx + dx / d * p.radius;
		p.y = cy + dy / d * p.radius;
		p.vx *= .4;
		p.vy *= .4;
	}
}
function makeBot(build, team, slot) {
	const stats = deriveStats(build);
	const spawn = SPAWNS[team === 0 ? slot : 2 + slot] ?? SPAWNS[0];
	const missing = {
		leftArm: build.injuries.includes("leftArm"),
		rightArm: build.injuries.includes("rightArm"),
		leftLeg: build.injuries.includes("leftLeg"),
		rightLeg: build.injuries.includes("rightLeg")
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
		cool: .4,
		attack: 0,
		attackDur: .5,
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
		assess: 1.1 + Math.random() * .7,
		walk: Math.random() * 10,
		radius: stats.radius
	};
}
function createWorld(player, enemy, format) {
	const n = format;
	const bots = [];
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
		cam: {
			x: ARENA.w / 2,
			y: ARENA.h / 2
		},
		callSign: ""
	};
}
function log(w, kind, text) {
	w.events.push({
		t: w.t,
		kind,
		text
	});
	if (w.events.length > 40) w.events.shift();
}
function spark(w, x, y, color, n = 8) {
	for (let i = 0; i < n; i++) {
		const a = Math.random() * Math.PI * 2;
		const s = 80 + Math.random() * 220;
		w.particles.push({
			x,
			y,
			vx: Math.cos(a) * s,
			vy: Math.sin(a) * s,
			life: .25 + Math.random() * .35,
			max: .6,
			size: 2 + Math.random() * 3,
			color
		});
	}
	if (w.particles.length > 160) w.particles.splice(0, w.particles.length - 160);
}
function pop(w, x, y, text, crit = false) {
	w.floaters.push({
		x,
		y,
		text,
		life: .9,
		crit
	});
}
function living(w, team) {
	return w.bots.filter((b) => b.team === team && !b.eliminated);
}
function activeOf(w, team) {
	return w.bots.find((b) => b.team === team && b.active && !b.eliminated);
}
function targetFor(w, bot) {
	return activeOf(w, bot.team === 0 ? 1 : 0);
}
function tagIn(w, team, slot) {
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
	next.invuln = .35;
	next.stamina = Math.min(100, next.stamina + 8);
	w.callSign = `${next.name} IN`;
	log(w, "tag", `${next.name} tagged in`);
}
function callSignature(w, team) {
	const bot = activeOf(w, team);
	if (!bot || w.phase !== "fight") return;
	fireSpecial(w, bot, true);
}
function callOverclock(w, team) {
	const bot = activeOf(w, team);
	if (!bot || w.phase !== "fight" || bot.battery < 28) return;
	bot.battery -= 28;
	bot.overclock = 3.4;
	w.callSign = "OVERCLOCK";
	spark(w, bot.x, bot.y, "#dfe6d8", 14);
}
function callBrace(w, team) {
	const bot = activeOf(w, team);
	if (!bot || w.phase !== "fight" || bot.stamina < 12) return;
	bot.stamina -= 12;
	bot.guard = .85;
}
function fireSpecial(w, bot, forced) {
	const cost = SIGNATURES[bot.build.signature].cost;
	if (bot.battery < cost || bot.attack > 0 || bot.frozen > 0) return false;
	if (!forced && bot.battery < cost + 10) return false;
	bot.battery -= cost;
	bot.special = true;
	bot.attack = .92;
	bot.attackDur = .92;
	bot.attackKind = bot.build.signature;
	bot.cool = .5;
	w.callSign = bot.build.signature.toUpperCase();
	log(w, "special", `${bot.name} — ${bot.build.signature}`);
	return true;
}
function chooseAttack(bot, d) {
	if (bot.stats.isRanged && d > 160) return {
		kind: bot.build.weapon,
		dur: .48,
		special: false
	};
	if (bot.combo >= 2) return {
		kind: "HEAVY",
		dur: .7,
		special: false
	};
	if (bot.build.style === "Wrestler" && d < 110) return {
		kind: "GRAPPLE",
		dur: .62,
		special: false
	};
	if (bot.build.style === "Kung Fu") return {
		kind: Math.random() < .4 ? "PALM" : "KICK",
		dur: .5,
		special: false
	};
	if (bot.build.style === "Boxer") return {
		kind: Math.random() < .45 ? "CROSS" : "JAB",
		dur: .42,
		special: false
	};
	return {
		kind: "STRIKE",
		dur: .52,
		special: false
	};
}
function attackDamage(bot, kind) {
	const oc = bot.overclock > 0 ? 1.22 : 1;
	const reckless = bot.build.traits.includes("Reckless") ? 1.08 : 1;
	if (bot.special) return bot.stats.heavy * bot.stats.specialPower * oc;
	if (kind === "HEAVY" || kind === "GRAPPLE" || kind === "CROSS" || kind === "KICK") return bot.stats.heavy * .72 * oc * reckless;
	return bot.stats.damage * oc * reckless;
}
function applyHit(w, atk, vic, raw, kind) {
	if (vic.invuln > 0 || vic.eliminated) return;
	let dmg = raw * (1 - vic.stats.armor);
	if (vic.guard > 0) dmg *= .42;
	const crit = Math.random() < atk.stats.crit + (atk.build.body === "Cyclops" ? .04 : 0);
	if (crit) dmg *= 1.55;
	if (atk.build.body === "Drill Head") dmg *= 1.08;
	dmg = Math.max(4, dmg);
	vic.hp -= dmg;
	vic.hitFlash = .12;
	vic.stagger = Math.max(vic.stagger, crit ? .28 : .12);
	const a = ang(atk, vic);
	vic.vx += Math.cos(a) * (crit ? 280 : 140);
	vic.vy += Math.sin(a) * (crit ? 280 : 140);
	atk.combo += 1;
	atk.comboT = 1.2;
	w.hitstop = Math.max(w.hitstop, crit || atk.special ? .07 : .035);
	w.trauma = Math.min(1, w.trauma + (crit || atk.special ? .42 : .18));
	spark(w, vic.x, vic.y, crit ? "#eceee8" : STYLES[atk.build.style].color, crit ? 16 : 8);
	pop(w, vic.x, vic.y - 50, crit ? `${Math.round(dmg)} CRIT` : `${Math.round(dmg)}`, crit);
	log(w, crit ? "crit" : "hit", `${atk.name} ${kind} ${vic.name} for ${Math.round(dmg)}`);
	if (kind === "Ice Freeze" || atk.build.signature === "Ice Freeze" && atk.special) vic.frozen = Math.max(vic.frozen, 1.35);
	if (atk.build.signature === "Acid Spray" && atk.special) vic.stats.armor = Math.max(0, vic.stats.armor - .04);
	if ((atk.special || kind === "HEAVY" || kind === "GRAPPLE") && vic.hp / vic.stats.maxHp < .46) {
		const parts = Object.keys(vic.missing).filter((k) => !vic.missing[k]);
		if (parts.length && Math.random() < (atk.special ? .16 : .08)) {
			const part = parts[Math.random() * parts.length | 0];
			vic.missing[part] = true;
			pop(w, vic.x, vic.y - 80, `${part.replace("Arm", " ARM").replace("Leg", " LEG").toUpperCase()} LOST`, true);
			log(w, "limb", `${atk.name} dislodged ${vic.name}'s ${part}`);
			w.trauma = Math.min(1, w.trauma + .35);
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
			bench.invuln = .45;
			w.callSign = `${bench.name} IN`;
		} else if (!living(w, vic.team).length) {
			w.phase = "over";
			w.winner = atk.team;
		}
	}
}
function resolveMelee(w, bot) {
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
function spawnShot(w, bot, kind, dmg) {
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
		r: kind === "Fireball" ? 10 : 5
	});
}
function specialContact(w, bot) {
	const t = targetFor(w, bot);
	const sig = bot.build.signature;
	const dmg = attackDamage(bot, sig);
	if (sig === "Quake") {
		for (const o of w.bots) if (o.team !== bot.team && !o.eliminated && dist(bot, o) < 210) applyHit(w, bot, o, dmg, sig);
		spark(w, bot.x, bot.y, "#c4a574", 20);
		return;
	}
	if (sig === "Electric Shock" && t) {
		applyHit(w, bot, t, dmg, sig);
		const other = w.bots.find((b) => b.team === t.team && b !== t && !b.eliminated && dist(t, b) < 220);
		if (other) applyHit(w, bot, other, dmg * .55, sig);
		return;
	}
	if (sig === "Laser Beam" || sig === "Projectile" || sig === "Fireball" || sig === "Ice Freeze" || sig === "Acid Spray") {
		spawnShot(w, bot, sig, dmg);
		return;
	}
	resolveMelee(w, bot);
}
function ai(w, bot, dt) {
	const t = targetFor(w, bot);
	if (!t) return;
	const d = dist(bot, t);
	bot.angle += Math.atan2(Math.sin(ang(bot, t) - bot.angle), Math.cos(ang(bot, t) - bot.angle)) * 8 * dt;
	const traits = bot.build.traits;
	const cautious = traits.includes("Cautious");
	const agg = traits.includes("Aggressive") || traits.includes("Reckless");
	const disc = traits.includes("Disciplined");
	const desired = bot.stats.isRanged ? cautious ? 340 : 260 : agg ? 70 : 100;
	const speed = bot.stats.speed * (bot.overclock > 0 ? 1.2 : 1) * (bot.missing.leftLeg || bot.missing.rightLeg ? .9 : 1);
	if (bot.hp / bot.stats.maxHp < (cautious ? .38 : .22) && bot.team === 1) {
		const bench = w.bots.find((b) => b.team === 1 && !b.active && !b.eliminated && b.stamina > 40);
		if (bench && bot.stamina > 20) tagIn(w, 1, bench.slot);
	}
	if (bot.battery > SIGNATURES[bot.build.signature].cost + (agg ? 0 : 15) && (d < 380 || bot.stats.isRanged) && Math.random() < (agg ? .012 : .006)) fireSpecial(w, bot, false);
	if (disc && t.attack > 0 && d < 140 && bot.stamina > 20 && Math.random() < .08) {
		bot.guard = .4;
		bot.stamina -= 8;
	}
	const dx = t.x - bot.x;
	const dy = t.y - bot.y;
	const n = Math.hypot(dx, dy) || 1;
	let ax = 0;
	let ay = 0;
	if (d > desired + 16) {
		ax = dx / n * speed;
		ay = dy / n * speed;
	} else if (d < desired - 24) {
		ax = -dx / n * speed * .85;
		ay = -dy / n * speed * .85;
	} else {
		ax = -dy / n * speed * .35;
		ay = dx / n * speed * .35;
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
function stepWorld(w, dt) {
	w.t += dt;
	w.trauma = Math.max(0, w.trauma - dt * 1.8);
	if (w.callSign && Math.random() < dt * 1.2) {}
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
			bot.battery = Math.min(100, bot.battery + bot.stats.batteryRegen * .7 * dt);
			continue;
		}
		bot.stamina = Math.min(100, bot.stamina + bot.stats.staminaRegen * dt * .35);
		bot.battery = Math.min(100, bot.battery + bot.stats.batteryRegen * dt * .25);
		if (bot.assess > 0) {
			bot.assess -= dt;
			bot.vx *= .9;
			bot.vy *= .9;
		} else if (bot.frozen > 0 || bot.stagger > .18) {
			bot.vx *= .82;
			bot.vy *= .82;
		} else ai(w, bot, dt);
		if (bot.attack > 0) {
			const prev = bot.attack;
			bot.attack -= dt;
			const contact = bot.attackDur * .42;
			if (prev >= contact && bot.attack < contact) {
				if (bot.special) specialContact(w, bot);
				else if (bot.stats.isRanged && bot.attackKind === bot.build.weapon) spawnShot(w, bot, bot.build.weapon, attackDamage(bot, bot.attackKind));
				else resolveMelee(w, bot);
			}
			if (bot.attack <= 0) bot.special = false;
		}
		bot.x += bot.vx * dt;
		bot.y += bot.vy * dt;
		bot.x = clamp(bot.x, bot.radius + 20, ARENA.w - bot.radius - 20);
		bot.y = clamp(bot.y, bot.radius + 20, ARENA.h - bot.radius - 20);
		if (bot.build.legs !== "Hover") for (const o of OBSTACLES) circleRect(bot, o);
		bot.vx *= .86;
		bot.vy *= .86;
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
				const atk = activeOf(w, p.team);
				if (atk) applyHit(w, atk, b, p.dmg, p.kind);
				if (p.kind === "Ice Freeze") b.frozen = Math.max(b.frozen, 1.4);
				hit = true;
				break;
			}
		}
		if (hit || p.life <= 0 || p.x < 0 || p.y < 0 || p.x > ARENA.w || p.y > ARENA.h) w.projectiles.splice(i, 1);
	}
	for (let i = w.particles.length - 1; i >= 0; i--) {
		const p = w.particles[i];
		p.x += p.vx * dt;
		p.y += p.vy * dt;
		p.life -= dt;
		p.vx *= .96;
		p.vy *= .96;
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
function snapshotInjuries(w) {
	const out = {};
	for (const b of w.bots) {
		if (b.team !== 0) continue;
		const limbs = Object.keys(b.missing).filter((k) => b.missing[k]);
		if (limbs.length) out[b.id] = limbs;
	}
	return out;
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function teamTint(team) {
	return team === 0 ? "#dfe6d8" : "#c45c3a";
}
function drawBot(ctx, bot, t) {
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
	const swing = bot.attack > 0 ? Math.sin((1 - bot.attack / bot.attackDur) * Math.PI) * .9 : 0;
	const gait = Math.sin(bot.walk) * (bot.active ? 6 : 2);
	const drawLeg = (side, missing) => {
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
			ctx.globalAlpha = .5;
			ctx.fillStyle = teamTint(bot.team);
			ctx.beginPath();
			ctx.ellipse(side * 10 * scale, 24 * scale, 10, 4, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = 1;
		} else {
			ctx.save();
			ctx.translate(side * 10 * scale, 10);
			ctx.rotate(side * gait * .04);
			roundRect(ctx, -4, 0, 8, 22 * scale, 3);
			ctx.fill();
			ctx.restore();
		}
	};
	drawLeg(-1, bot.missing.leftLeg);
	drawLeg(1, bot.missing.rightLeg);
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
	const drawArm = (side, missing, armed) => {
		if (missing) return;
		ctx.save();
		ctx.translate(side * 16 * scale, -10 * scale);
		ctx.rotate(side * .4 + (armed ? swing * side : -swing * .3));
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
		ctx.globalAlpha = .7;
		drawArm(-1.15, false, false);
		drawArm(1.15, false, false);
		ctx.globalAlpha = 1;
	}
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
function drawWorld(ctx, w, viewW, viewH, shakeOn) {
	const shake = shakeOn ? w.trauma * w.trauma : 0;
	const ox = (Math.random() - .5) * 18 * shake;
	const oy = (Math.random() - .5) * 18 * shake;
	const zoom = Math.min(viewW / (ARENA.w * .72), viewH / (ARENA.h * .72));
	ctx.save();
	ctx.fillStyle = "#0b0c0b";
	ctx.fillRect(0, 0, viewW, viewH);
	ctx.translate(viewW / 2 + ox, viewH / 2 + oy);
	ctx.scale(zoom, zoom);
	ctx.translate(-w.cam.x, -w.cam.y);
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
	for (const bot of drawOrder) if (bot.eliminated) {
		ctx.save();
		ctx.globalAlpha = .28;
		drawBot(ctx, bot, w.t);
		ctx.restore();
	} else if (bot.active) drawBot(ctx, bot, w.t);
	else {
		ctx.save();
		ctx.globalAlpha = .4;
		drawBot(ctx, bot, w.t);
		ctx.restore();
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
function drawPortrait(ctx, bot, w, h) {
	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = "#141614";
	ctx.fillRect(0, 0, w, h);
	const fake = {
		id: "p",
		name: bot.name,
		team: 0,
		slot: 0,
		active: true,
		eliminated: false,
		build: {
			id: "p",
			name: bot.name,
			style: bot.style,
			body: bot.body,
			legs: bot.legs,
			weapon: bot.weapon,
			signature: "Projectile",
			scale: "Standard",
			traits: [],
			accent: bot.accent,
			level: 1,
			xp: 0,
			injuries: []
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
			isRanged: false
		},
		x: w / 2,
		y: h / 2 + 10,
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
		missing: {
			leftArm: false,
			rightArm: false,
			leftLeg: false,
			rightLeg: false
		},
		assess: 0,
		walk: 2.2,
		radius: 28
	};
	ctx.save();
	ctx.translate(0, 8);
	drawBot(ctx, fake, 0);
	ctx.restore();
}
function ArenaScreen() {
	const match = useGame((s) => s.match);
	const save = useGame((s) => s.save);
	const finishFight = useGame((s) => s.finishFight);
	const setScreen = useGame((s) => s.setScreen);
	const canvasRef = (0, import_react.useRef)(null);
	const worldRef = (0, import_react.useRef)(null);
	const [hud, setHud] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!match) return;
		unlockAudio();
		worldRef.current = createWorld(match.player, match.enemy, match.format);
	}, [match]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas || !match) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let acc = 0;
		let last = performance.now();
		const tick = (now) => {
			const raw = Math.min(.1, (now - last) / 1e3);
			last = now;
			acc += raw;
			const w = worldRef.current;
			if (w) {
				while (acc >= 1 / 60) {
					const before = w.events.length;
					stepWorld(w, 1 / 60);
					if (w.events.length > before) {
						const ev = w.events[w.events.length - 1];
						if (ev.kind === "hit" || ev.kind === "crit") sfx.hit();
						if (ev.kind === "special") sfx.special();
						if (ev.kind === "ko") sfx.ko();
						if (ev.kind === "tag") sfx.tag();
						if (ev.kind === "limb") sfx.heavy();
					}
					acc -= 1 / 60;
				}
				const dpr = Math.min(2, window.devicePixelRatio || 1);
				const cw = canvas.clientWidth;
				const ch = canvas.clientHeight;
				if (canvas.width !== Math.floor(cw * dpr) || canvas.height !== Math.floor(ch * dpr)) {
					canvas.width = Math.floor(cw * dpr);
					canvas.height = Math.floor(ch * dpr);
				}
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				drawWorld(ctx, w, cw, ch, save.settings.shake);
			}
			setHud((n) => n + 1);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [match, save.settings.shake]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const w = worldRef.current;
			if (!w) return;
			if (e.key === "1") tagIn(w, 0, 0);
			if (e.key === "2") tagIn(w, 0, 1);
			if (e.key === " " || e.key === "q" || e.key === "Q") {
				e.preventDefault();
				callSignature(w, 0);
				sfx.special();
			}
			if (e.key === "e" || e.key === "E") callOverclock(w, 0);
			if (e.key === "r" || e.key === "R") callBrace(w, 0);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (!match) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => setScreen("circuit"),
			children: "Back to circuit"
		})
	});
	const w = worldRef.current;
	const rite = match.riteId ? RITES.find((r) => r.id === match.riteId) : null;
	const mine = w?.bots.filter((b) => b.team === 0) ?? [];
	const theirs = w?.bots.filter((b) => b.team === 1) ?? [];
	const resolve = () => {
		const world = worldRef.current;
		if (!world || world.phase !== "over") return;
		const won = world.winner === 0;
		const result = {
			won,
			riteId: match.riteId,
			skirmish: match.skirmish,
			salvage: rite?.salvage ?? 35,
			xp: rite?.xp ?? 50,
			loot: won && rite && rite.unlocks[0] ? rite.unlocks[0] : null,
			injuries: snapshotInjuries(world),
			events: world.events.slice(-12),
			duration: world.t
		};
		if (won) sfx.win();
		finishFight(result);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-full w-full touch-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 flex justify-between gap-3 p-3 sm:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
						side: "A",
						bots: mine
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface/90 px-3 py-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] tracking-[0.18em] text-muted uppercase",
							children: rite?.name ?? "Skirmish"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-semibold",
							children: w?.phase === "intro" ? "READ" : w?.phase === "over" ? w.winner === 0 ? "RITE TAKEN" : "RITE LOST" : w?.callSign || "FIGHT"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
						side: "B",
						bots: theirs
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex flex-wrap justify-center gap-2",
					children: [
						mine.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: b.eliminated,
							onClick: () => tagIn(w, 0, b.slot),
							className: cn("min-w-20 rounded-md border px-3 py-2 text-left text-xs", b.active ? "border-accent bg-raised" : "border-border bg-surface", b.eliminated && "opacity-30"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium",
								children: [
									b.slot + 1,
									" ",
									b.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted",
								children: b.eliminated ? "KO" : b.active ? "IN" : "BENCH"
							})]
						}, b.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => {
								callSignature(w, 0);
								sfx.special();
							},
							children: "Signature"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => callOverclock(w, 0),
							children: "Overclock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => callBrace(w, 0),
							children: "Brace"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center font-mono text-[10px] text-faint",
					children: "1/2 tag · Space signature · E overclock · R brace"
				})]
			}),
			w?.phase === "over" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center bg-bg/55 p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center shadow-[var(--shadow-panel)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold",
							children: w.winner === 0 ? "You take the pit" : "The house keeps it"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								Math.round(w.t),
								"s · ",
								w.events.length,
								" logged exchanges"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-5 w-full",
							onClick: resolve,
							children: "Aftermath"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: hud
			})
		]
	});
}
function TeamCard({ side, bots }) {
	const live = bots.filter((b) => b.active)[0] ?? bots[0];
	if (!live) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-36 rounded-md border border-border bg-surface/90 p-2 sm:min-w-48",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-[10px] tracking-wide text-muted uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Team ", side] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					children: live.build.style
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-sm font-semibold",
				children: live.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
				value: live.hp / live.stats.maxHp,
				color: "bg-hp"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
				value: live.stamina / 100,
				color: "bg-stamina"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
				value: live.battery / 100,
				color: "bg-battery"
			})
		]
	});
}
function Meter({ value, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-1.5 overflow-hidden rounded-full bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full", color),
			style: { width: `${Math.max(0, Math.min(1, value)) * 100}%` }
		})
	});
}
function CircuitScreen() {
	const save = useGame((s) => s.save);
	const setScreen = useGame((s) => s.setScreen);
	const startRite = useGame((s) => s.startRite);
	const startSkirmish = useGame((s) => s.startSkirmish);
	const squad = save.squad.map((id) => save.bots.find((b) => b.id === id)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-5xl flex-col gap-6 px-4 py-6 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.18em] text-muted uppercase",
					children: "Circuit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Eight rites"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 max-w-xl text-sm text-muted",
					children: [
						"Squad ",
						squad.map((b) => b?.name).join(" · ") || "empty",
						" · ",
						save.salvage,
						" salvage"
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setScreen("garage"),
					children: "Garage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: startSkirmish,
					disabled: !squad.length,
					children: "Skirmish"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-3",
			children: RITES.map((rite) => {
				const locked = riteLocked(save, rite.index);
				const cleared = save.cleared.includes(rite.id);
				const ready = squad.length >= rite.format && !locked;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center", locked && "opacity-55"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-xs text-faint tabular-nums",
							children: ["0", rite.index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg font-semibold",
										children: rite.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted",
										children: [
											rite.format,
											"v",
											rite.format
										]
									}),
									cleared && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tracking-wide text-stamina uppercase",
										children: "Sealed"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: rite.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-[11px] text-faint",
								children: [
									rite.salvage,
									" salvage · ",
									rite.xp,
									" XP",
									rite.unlocks.length ? ` · unlocks ${rite.unlocks.length} parts` : ""
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							disabled: !ready,
							variant: cleared ? "secondary" : "default",
							onClick: () => startRite(rite.id),
							children: [locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }) : null, locked ? "Locked" : squad.length < rite.format ? `Need ${rite.format}` : "Call rite"]
						})
					]
				}, rite.id);
			})
		})]
	});
}
function Portrait({ name, style, body, legs, weapon, accent, className }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const c = ref.current;
		if (!c) return;
		const ctx = c.getContext("2d");
		if (!ctx) return;
		const dpr = Math.min(2, window.devicePixelRatio || 1);
		const w = c.clientWidth;
		const h = c.clientHeight;
		c.width = w * dpr;
		c.height = h * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		drawPortrait(ctx, {
			name,
			style,
			body,
			legs,
			weapon,
			accent
		}, w, h);
	}, [
		name,
		style,
		body,
		legs,
		weapon,
		accent
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className,
		"aria-hidden": true
	});
}
function GarageScreen() {
	const save = useGame((s) => s.save);
	const selectedId = useGame((s) => s.selectedId);
	const bot = save.bots.find((b) => b.id === selectedId) ?? save.bots[0];
	const stats = deriveStats(bot);
	const setScreen = useGame((s) => s.setScreen);
	const updateBot = useGame((s) => s.updateBot);
	const selectBot = useGame((s) => s.selectBot);
	const toggleSquad = useGame((s) => s.toggleSquad);
	const newBot = useGame((s) => s.newBot);
	const deleteBot = useGame((s) => s.deleteBot);
	const duplicateBot = useGame((s) => s.duplicateBot);
	const repairBot = useGame((s) => s.repairBot);
	const inSquad = save.squad.includes(bot.id);
	const repair = repairCost(bot.injuries.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 py-6 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.18em] text-muted uppercase",
					children: "Garage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Forge the machine"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setScreen("title"),
						children: "Title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setScreen("circuit"),
						children: "Circuit"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [save.bots.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => selectBot(b.id),
					className: cn("min-w-28 rounded-md border px-3 py-2 text-left", b.id === bot.id ? "border-accent bg-raised" : "border-border bg-surface"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: b.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-[10px] text-muted",
						children: [
							"Lv ",
							b.level,
							save.squad.includes(b.id) ? " · SQUAD" : ""
						]
					})]
				}, b.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: newBot,
					className: "inline-flex min-w-24 items-center justify-center gap-1 rounded-md border border-dashed border-border text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " New"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[220px_1fr_220px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-lg border border-border bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
							name: bot.name,
							style: bot.style,
							body: bot.body,
							legs: bot.legs,
							weapon: bot.weapon,
							accent: bot.accent,
							className: "h-64 w-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs text-muted",
									children: ["Callsign", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: bot.name,
										maxLength: 12,
										onChange: (e) => updateBot(bot.id, { name: e.target.value.toUpperCase() }),
										className: "mt-1 h-10 w-full rounded-sm border border-border bg-bg px-3 font-mono text-sm text-fg"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: inSquad ? "default" : "secondary",
									className: "w-full",
									onClick: () => toggleSquad(bot.id),
									children: inSquad ? "On squad" : "Add to squad"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => duplicateBot(bot.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => deleteBot(bot.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Style",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											value: bot.style,
											onChange: (v) => updateBot(bot.id, { style: v }),
											options: STYLE_LIST.map((s) => ({
												value: s,
												locked: !isUnlocked(save, `style:${s}`)
											}))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Body",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											value: bot.body,
											onChange: (v) => updateBot(bot.id, { body: v }),
											options: Object.keys(BODIES).map((s) => ({
												value: s,
												locked: !isUnlocked(save, `body:${s}`)
											}))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Locomotion",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											value: bot.legs,
											onChange: (v) => updateBot(bot.id, { legs: v }),
											options: Object.keys(LEGS).map((s) => ({
												value: s,
												locked: !isUnlocked(save, `legs:${s}`)
											}))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Weapon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											value: bot.weapon,
											onChange: (v) => updateBot(bot.id, { weapon: v }),
											options: Object.keys(WEAPONS).map((s) => ({
												value: s,
												locked: !isUnlocked(save, `weapon:${s}`)
											}))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Signature",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											value: bot.signature,
											onChange: (v) => updateBot(bot.id, { signature: v }),
											options: Object.keys(SIGNATURES).map((s) => ({
												value: s,
												locked: !isUnlocked(save, `signature:${s}`)
											}))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Scale",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											value: bot.scale,
											onChange: (v) => updateBot(bot.id, { scale: v }),
											options: Object.keys(SCALES).map((s) => ({
												value: s,
												locked: !isUnlocked(save, `scale:${s}`)
											}))
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: STYLES[bot.style].kit
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs tracking-wide text-muted uppercase",
									children: "Traits (max 2)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: Object.keys(TRAITS).map((t) => {
										const on = bot.traits.includes(t);
										const locked = !isUnlocked(save, `trait:${t}`);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: locked,
											onClick: () => {
												let traits = on ? bot.traits.filter((x) => x !== t) : [...bot.traits, t];
												if (traits.length > 2) traits = traits.slice(-2);
												updateBot(bot.id, { traits });
											},
											className: cn("rounded-full border px-3 py-1 text-xs", on ? "border-accent bg-raised text-fg" : "border-border text-muted", locked && "opacity-30"),
											children: t
										}, t);
									})
								})]
							}),
							bot.injuries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-between rounded-md border border-border bg-bg px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-hp",
									children: [
										"Injuries: ",
										bot.injuries.join(", "),
										" · ",
										repair,
										" salvage"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "secondary",
									disabled: save.salvage < repair,
									onClick: () => repairBot(bot.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }), " Repair"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "rounded-lg border border-border bg-raised p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
								children: "System profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-3 space-y-2 font-mono text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "HP",
										v: String(stats.maxHp)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Speed",
										v: stats.speed.toFixed(0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Damage",
										v: stats.damage.toFixed(1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Heavy",
										v: stats.heavy.toFixed(1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Range",
										v: stats.range.toFixed(0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Armor",
										v: `${Math.round(stats.armor * 100)}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Crit",
										v: `${Math.round(stats.crit * 100)}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Dodge",
										v: `${Math.round(stats.dodge * 100)}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Special",
										v: stats.specialPower.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Kind",
										v: stats.isRanged ? "Ranged" : "Melee"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs leading-relaxed text-muted",
								children: [
									BODIES[bot.body].note,
									". ",
									LEGS[bot.legs].note,
									". ",
									WEAPONS[bot.weapon].note,
									".",
									" ",
									SIGNATURES[bot.signature].note,
									"."
								]
							})
						]
					})
				]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-xs text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children
		})]
	});
}
function Select({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "h-10 w-full rounded-sm border border-border bg-bg px-2 text-sm text-fg",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
			value: o.value,
			disabled: o.locked,
			children: [o.value, o.locked ? " (locked)" : ""]
		}, o.value))
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-3 text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-fg tabular-nums",
			children: v
		})]
	});
}
function TitleScreen() {
	const setScreen = useGame((s) => s.setScreen);
	const save = useGame((s) => s.save);
	const resetSave = useGame((s) => s.resetSave);
	const toggleSetting = useGame((s) => s.toggleSetting);
	const enter = (screen) => {
		unlockAudio();
		setScreen(screen);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.22em] text-muted uppercase",
					children: "Pit protocol 03"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-faint tabular-nums",
					children: [save.salvage, " salvage"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm tracking-[0.18em] text-muted uppercase",
						children: "Underground foundry · tag arena"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-fg sm:text-7xl",
						children: "RITECORE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base leading-relaxed text-muted",
						children: "Forge a machine whose parts actually change the fight. Call tags, signatures, and overclocks while the pit AI brawls in real time. Injuries persist. Salvage pays the repair bill."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							onClick: () => enter("circuit"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-4" }), "Open the circuit"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							variant: "secondary",
							onClick: () => enter("garage"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-4" }), "Garage"]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-panel)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
						children: "Caller verbs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-sm leading-relaxed text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "Tag"
							}), " — swap the active frame. Bench regenerates stamina and battery."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "Signature"
							}), " — spend battery on the mounted rite (beam, freeze, quake)."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "Overclock"
							}), " — short damage and speed spike."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "Brace"
							}), " — eat the next exchange at a discount."] })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "Live pit",
						body: "Style kits, combos, limb loss, and tag-team stamina from the rumble engine — refined so weapons, legs, and signatures modify the math, not just the silhouette."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "RPG weight",
						body: "Levels, salvage, persistent injuries, and a locked circuit of eight rites. Loadouts are a build, not a costume."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "Caller, not driver",
						body: "You do not steer the chassis. You call the bout: who is in, when the special drops, when to overclock."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-faint",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-3.5" }),
						save.cleared.length,
						"/8 rites sealed · ",
						save.bots.length,
						" machines in the garage"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-muted hover:text-fg",
						onClick: () => toggleSetting("mute"),
						children: ["Audio ", save.settings.mute ? "off" : "on"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-muted hover:text-fg",
						onClick: resetSave,
						children: "Reset local save"
					})]
				})]
			})
		]
	});
}
function Note({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-raised p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-base font-semibold tracking-tight text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
function RiteCoreApp() {
	const hydrate = useGame((s) => s.hydrate);
	const ready = useGame((s) => s.ready);
	const screen = useGame((s) => s.screen);
	const mute = useGame((s) => s.save.settings.mute);
	const persist = useGame((s) => s.persist);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		setMuted(mute);
	}, [mute]);
	(0, import_react.useEffect)(() => {
		const onHide = () => {
			if (document.visibilityState === "hidden") persist();
		};
		document.addEventListener("visibilitychange", onHide);
		return () => document.removeEventListener("visibilitychange", onHide);
	}, [persist]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-bg text-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-[0.2em] uppercase",
			children: "Booting garage"
		})
	});
	if (screen === "garage") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GarageScreen, {});
	if (screen === "circuit") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitScreen, {});
	if (screen === "arena") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArenaScreen, {});
	if (screen === "aftermath") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AftermathScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiteCoreApp, {});
}
//#endregion
export { Home as component };
