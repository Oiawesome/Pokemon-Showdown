/*

Ratings and how they work:

-2: Extremely detrimental
    The sort of ability that relegates Pokemon with Uber-level BSTs
    into NU.
	ex. Slow Start, Truant

-1: Detrimental
	  An ability that does more harm than good.
	ex. Defeatist, Klutz

 0: Useless
	  An ability with no net effect on a Pokemon during a battle.
	ex. Pickup, Illuminate

 1: Ineffective
	  An ability that has a minimal effect. Should never be chosen over
	  any other ability.
	ex. Pressure, Damp

 2: Situationally useful
	  An ability that can be useful in certain situations.
	ex. Blaze, Insomnia

 3: Useful
	  An ability that is generally useful.
	ex. Volt Absorb, Iron Fist

 4: Very useful
	  One of the most popular abilities. The difference between 3 and 4
	  can be ambiguous.
	ex. Technician, Intimidate

 5: Essential
	  The sort of ability that defines metagames.
	ex. Drizzle, Magnet Pull

*/

exports.BattleAbilities = {
        sweetveil: {
        	desc: "Prevents an ally from falling asleep in a double or triple battle.",
		shortDesc: "In a double or triple battle, this Pokemon's allies are immune to sleep.",
		onImmunity: function(source, target, type) {
			if (target !== this.effectData.target && target.side === this.effectData.target.side) {
				if (type === 'slp') {
					this.debug('Sweet Veil Immunity')
					return false;
				}
			}
		},
		id: "sweetveil",
		name: "Sweet Veil",
		rating: 2,
		num: -5
        },
        fairyaura: {
        	desc: "Increases the power of all Fairy-type attacks in battle.",
        	shortDesc: "Increases power of Fairy-type attacks.",
        	onBasePower: function(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				return basePower * 1.5; 
			}
		},
		id: "fairyaura",
		name: "Fairy Aura",
		rating: 4,
		num: -6
        },
        darkaura: {
        	desc: "Increases the power of all Dark-type attacks in battle.",
        	shortDesc: "Increases power of Dark-type attacks.",
        	onBasePower: function(basePower, user, target, move) {
			if (move && move.type === 'Dark') {
				return basePower * 1.5; 
			}
		},
		id: "darkaura",
		name: "Dark Aura",
		rating: 4,
		num: -7
        }
};
