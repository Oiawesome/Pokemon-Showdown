exports.BattleAbilities = {
	"bigpecks": {
		inherit: true,
		onBoost: function(boost) {
			if (boost['def'] && boost['def'] < 0) {
				boost['def'] *= -1;
			}
		}
	},
	"colorchange": {
		desc: "This Pokemon's secondary type changes according to it's most powerful attack.",
		shortDesc: "This Pokemon's secondary type changes according to it's most powerful attack.",
		onStart: function(pokemon) {
			var move = this.getMove(pokemon.moveset[0].move);
			if (pokemon.types[0] != move.type) {
				pokemon.types[1] = move.type;
				this.add('-message', pokemon.name+' changed its color!');
			}
		},
		id: "colorchange",
		name: "Color Change",
		rating: 4,
		num: 16
	},
	"healer": {
		desc: "Heals 1\/16 HP each turn.",
		shortDesc: "Heals 1\/16 HP each turn.",
		id: "healer",
		name: "Healer",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function(pokemon) {
			this.heal(pokemon.maxhp/16);
		},
		rating: 0,
		num: 131
	},
	"justified": {
		desc: "When a Pokemon with Justified is hit with a Dark-type attack, its attack is increased by one level, and the move itself has no effect. If hit by a multi-hit attack like Beat Up, it will increase attack by one stage for each hit. The only Dark-type move that will not activate Sap Sipper is Aromatherapy.",
		shortDesc: "This Pokemon's Attack is boosted by 1 if hit by any Dark move; Dark immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				this.boost({atk:1});
				return null;
			}
		},
		id: "justified",
		name: "Justified",
		rating: 2,
		num: 154
	},
	"mummy": {
		inherit: true,
		onResidual: function(pokemon) {
			if (!pokemon.hasType('Ghost')) {
				this.damage(pokemon.maxhp/16);
			}
		}
	},
	"snowcloak": {
		desc: "If active while Hail is in effect, this Pokemon's Evasion receives a 20% boost; if this Pokemon has a typing that would normally take damage from Hail, this Pokemon is also immune to Hail's damage.",
		shortDesc: "If Hail is active, this Pokemon's evasion is 1.25x; immunity to Hail.",
		onImmunity: function(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyStats: function(stats, pokemon) {
			if (this.isWeather('hail')) {
				stats.spe *= 1.5;
			}
		},
		id: "snowcloak",
		name: "Snow Cloak",
		rating: 2,
		num: 81
	},
	"swiftswim": {
		inherit: true,
		onModifyStats: function(stats, pokemon) {
			if (this.isWeather('raindance')) {
				stats.spe *= 1.5;
			}
		}
	},
	"chlorophyll": {
		inherit: true,
		onModifyStats: function(stats, pokemon) {
			if (this.isWeather('sunnyday')) {
				stats.spe *= 1.5;
			}
		}
	},
	"sandrush": {
		inherit: true,
		onModifyStats: function(stats, pokemon) {
			if (this.isWeather('sandstorm')) {
				stats.spe *= 1.5;
			}
		}
	},
	"lightmetal": {
		inherit: true,
		desc: "The user's speed is increased by 20%, and the user's weight is halved. The weight loss decreases the damage taken from Low Kick and Grass Knot, and also lowers user's base power of Heavy Slam and Heat Crash, due these moves being calculated by the target and user's weight.",
		shortDesc: "This Pokemon's speed is increased by 20%, and weight is halved.",
		onModifySpe: function(spe) {
			return spe * 1.2;
		}
	},
	"zenmode": {
		desc: "When Darmanitan enters the battle, it will enter Zen Mode. This ability only works on Darmanitan, even if it is copied by Role Play, Entrainment, or swapped with Skill Swap.",
		shortDesc: "If this Pokemon is Darmanitan, it changes to Zen Mode.",
		onStart: function(pokemon) {
			if (pokemon.template.speciesid==='darmanitan' && pokemon.transformInto('Darmanitan-Zen')) {
				pokemon.transformed = false;
				this.add('-formechange', pokemon, 'Darmanitan-Zen');
				this.add('-message', 'Zen Mode triggered! (placeholder)');
			} else {
				return false;
			}
		},
		id: "zenmode",
		name: "Zen Mode",
		rating: 3,
		num: 161
	}
};
