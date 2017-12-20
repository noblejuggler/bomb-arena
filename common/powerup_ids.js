module.exports = {
	BOMB_STRENGTH: 10,

	BOMB_CAPACITY: 12,

	SPEED: 14,

	isAPowerup: function(id) {
		return id === this.BOMB_STRENGTH || id === this.BOMB_CAPACITY || id === this.SPEED;
	}
}
