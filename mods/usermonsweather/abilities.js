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
	"jointlighter": {
		desc: "When this Pokemon enters the battlefield, it causes a permanent Rain Dance that can only be stopped by Air Lock, Cloud Nine or another weather condition.",
		shortDesc: "On switch-in, this Pokemon summons Rain Dance until another weather replaces it.",
		onStart: function(pokemon) {
				this.add('-message', pokemon.name + " lit a huge ass joint!");
		},
		onStart: function(source) {
			this.setWeather('zassoukemuri');
			this.weatherData.duration = 0;
		},
		id: "jointlighter",
		name: "Joint Lighter",
		rating: 5,
		num: -10
	},
};
