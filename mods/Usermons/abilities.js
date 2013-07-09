 exports.BattleAbilities = {
 "drunkenfist": {
		desc: "If a contact move knocks out this Pokemon, the opponent receives damage equal to one-fourth of its max HP.",
		shortDesc: "If this Pokemon is KOed with a contact move, that move's user loses 1/4 its max HP.",
		id: "drunkenfist",
		name: "Drunken Fist",
		onStart: function (pokemon) {
			      this.add('-message', pokemon.name + " is drunk!");
			pokemon.addVolatile('confusion');
			 self: {	
				boosts: {
			spa: 2,
			atk: 2
		},
			}
		},
		rating: 3,
		num: 800
	},
	"objection": {
		desc: "This Pokémon avoids all Rock-type attacks and hazards when switching in.",
		shortDesc: "On switch-in, this Pokemon avoids all Rock-type attacks and Stealth Rock.",
		onImmunity: function(type, target) {
			if (type === 'Normal' && !target.activeTurns) {
				return false;
			}
		},
		id: "objection",
		isNonstandard: true,
		name: "OBJECTION",
		rating: 3.5,
		num: 801
	},	
    }
};
