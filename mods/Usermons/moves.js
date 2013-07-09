exports.BattleMovedex = {
  "vodkabottlethrow": {
		num: 800,
		accuracy: 85,
		basePower: 20,
		category: "Special",
		desc: "Deals damage to one adjacent target and hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's Substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times. Makes contact.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "vodkabottlethrow",
		name: "Vodka Bottle Throw",
		pp: 20,
		priority: 0,
		isContact: true,
		multihit: [3,5],
			onFoeBeforeMove: function(attacker, defender, move) {
					this.add('-message', pokemon.name + " started throwing vodka bottles everywhere!");
				}
			},
		secondary: false,
		target: "normal",
		type: "Water"
	},
};
