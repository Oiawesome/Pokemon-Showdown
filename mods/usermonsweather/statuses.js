function clampIntRange(num, min, max) {
  num = Math.floor(num);
	if (num < min) num = min;
	if (typeof max !== 'undefined' && num > max) num = max;
	return num;
}
exports.BattleStatuses = {
  zassoukemuri: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'superjoint') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('weed grass boost');
				return basePower * 1.5;
			}
			if (move.type === 'Fire') {
				this.debug('weed fire boost');
				return basePower * 1.5;
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'ZassouKemuri', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'ZassouKemuri');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'ZassouKemuri', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
};
