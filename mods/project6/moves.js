exports.BattleMovedex = {
        "vinewhip": {
                num: 22,
                accuracy: 100,
                basePower: 35,
                category: "Physical",
                desc: "Deals damage to one adjacent target. Makes contact.",
                shortDesc: "No additional effect.",
                id: "vinewhip",
                name: "Vine Whip",
                pp: 25,
                priority: 0,
                isContact: true,
                secondary: false,
                target: "normal",
                type: "Grass"
        },
        "partingshot": {
                num: 1032,
                accuracy: 100,
                basePower: 75,
                category: "Status",
                desc: "Lowers the opponent's Special Attack and Attack by 1, then switches the user out of battle.",
                shortDesc: "User switches out after lowering the target's SpA and Atk.",
                id: "partingshot",
                name: "Parting Shot",
                pp: 25,
                priority: 0,
                boosts: {
                        atk: -1,
                        spa: -1
                },
                selfSwitch: true,
                secondary: false,
                target: "normal",
                type: "Fighting"
        },
        "paraboliccharge": {
                num: 1033,
                accuracy: 100,
                basePower: 80,
                category: "Special",
                desc: "Deals damage to all targets, including its ally. The user recovers half of the HP lost by the target, rounded up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
                shortDesc: "User recovers 50% of the damage dealt.",
                id: "paraboliccharge",
                name: "Parabolic Charge",
                pp: 16,
                priority: 0,
                drain: [1,2],
                secondary: false,
                target: "normal",
                type: "Electric"
        },
        "boomburst": {
                num: 1034,
                accuracy: 100,
                basePower: 100,
                category: "Special",
                desc: "A sound attack that deals damage to all targets, including its ally.",
                shortDesc: "Deals damage to all targets.",
                id: "boomburst",
                name: "Boomburst",
                pp: 16,
                priority: 0,
                isSoundBased: true,
                secondary: false,
                target: "all",
                type: "Normal"
        },
        "moonblast": {
                num: 1035,
                accuracy: 100,
                basePower: 110,
                category: "Special",
                desc: "Deals damage to one adjacent target with a ???% chance to lower Special Attack",
                shortDesc: "30% chance to lower SpA.",
                id: "moonblast",
                name: "Moonblast",
                pp: 25,
                priority: 0,
                secondary: {
                        chance: 30,
                        boosts: {
                                spa: -1
                        }
                },
                target: "normal",
                type: "Fairy"
        },
        "nobleroar": {
                num: 1036,
                accuracy: 100,
                basePower: 85,
                category: "Status",
                desc: "Lowers the foe's Attack and Special Attack by one stage.",
                shortDesc: "Lowers SpA and Atk by 1.",
                id: "nobleroar",
                name: "Noble Roar",
                pp: 16
                priority: 0,
                boosts: {
                        atk: -1,
                        spa: -1
                },
                secondary: false,
                target: "normal",
                type: "Fire"
        },
        "fairywind": {
                num: 1037,
                accuracy: 100,
                basePower: 85,
                category: "Special",
                desc: "Deals massive damage to all adjacent foes.",
                shortDesc: "Damages all adjacent foes.",
                id: "fairywind",
                name: "Fairy Wind",
                pp: 25,
                priority: 0,
                secondary: false,
                target: "allAdjacentFoes",
                type: "Fairy"
        },
        "topsyturvy": {
                num: 1038,
                accuracy: 100,
                basePower: 0,
                category: "Status",
                desc: "Reverses all stat modifications that the foe has.",
                shortDesc: "Reverses the foe's stat changes.",
                id: "topsyturvy",
                name: "Topsy-Turvy",
                pp: 16,
                priority: 0,
                onHit: function(target) {
                        for (var i in target.boosts) {
                                return target.boosts * -1
                        }
                        this.add('-reverseboost', target, '[from] move: Topsy-Turvy');
                },
                secondary: false,
                target: "normal",
                type: "Fairy"
        },
        "drainingkiss": {
                num: 1039,
                accuracy: 100,
                basePower: 80,
                category: "Special",
                desc: "Deals damage to one adjacent target. The user recovers half of the HP lost by the target, rounded up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
                shortDesc: "User recovers 50% of the damage dealt.",
                id: "drainingkiss",
                name: "Draining Kiss",
                pp: 16,
                priority: 0,
                drain: [1,2],
                secondary: false,
                target: "normal",
                type: "Fairy"
        },
        "geomancy": {
                num: 1040,
                accuracy: 100,
                basePower: 130,
                category: "Special",
                desc: "Deal massive damage to one adjacent target.",
                shortDesc: "No additional effect.",
                id: "geomancy",
                name: "Geomancy",
                pp: 16,
        	priority: 0,
		self: {
			boosts: {
				spa: -1
                                spd: -1
			}
		},
                secondary: false,
                target: "all",
                type: "Fairy"
        },
        "oblivionwing": {
                num: 1041,
                accuracy: 100,
                basePower: 130,
                category: "Special",
                desc: "Deal massive damage to one adjacent target.",
                shortDesc: "No additional effect.",
                id: "oblivionwing",
                name: "Oblivion Wing",
                pp: 16,
        	priority: 0,
		self: {
			boosts: {
				spa: -1
                                spd: -1
			}
		},
                secondary: false,
                target: "all",
                type: "Dark"
        }
};
