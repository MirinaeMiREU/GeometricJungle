/** 
 * The Fairy class. Represents the Fairy character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
 var FAIRY_SPEED = 100;
 
function Fairy(game, spritesheets, lane, team) {
	this.animations = spritesheets;
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animation = this.createAnimation(WALK, team, spritesheets);
	this.speed = this.getSpeed(team);;
	this.state = WALK;
	this.team = team;
	this.ctx = game.ctx;
	switch (lane) {
		case 1:
			Entity.call(this, game, this.getPosition(team), LANE_1, 1);
			break;
		case 2:
			Entity.call(this, game, this.getPosition(team), LANE_2, 2);
			break;
		case 3:
			Entity.call(this, game, this.getPosition(team), LANE_3, 3);
			break;
		case 4:
			Entity.call(this, game, this.getPosition(team), LANE_4, 4);
			break;
		case 5:
			Entity.call(this, game, this.getPosition(team), LANE_5, 5);
	}
}

Fairy.prototype = new Entity();
Fairy.prototype.constructor = Fairy;

Fairy.prototype.update = function() {
	
	if (this.x > 1000) {
		this.game.removeEntity(this);
	}
	
	if (this.x > 600 && this.state !== DEAD) {
		this.die();
	}
	
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity))
			console.log('Fairy colliding...');
	}
	
	this.x += this.game.clockTick * this.speed;
	
	if (this.state === DEAD && this.animation.isDone()) {
		this.game.removeEntity(this);
	}
	
	Entity.prototype.update.call(this);
}

Fairy.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Fairy.prototype.idle = function() {
	this.animation = this.createAnimation(IDLE, this.team, this.animations);
	this.state = IDLE;
	this.speed = 0;
}

Fairy.prototype.walk = function() {
	this.animation = this.createAnimation(WALK, this.team, this.animations);
	this.state = WALK;
	this.speed = FAIRY_SPEED;
}

Fairy.prototype.attack = function() {
	this.animation = this.createAnimation(ATTACK, this.team, this.animations);
	this.state = ATTACK;
	this.speed = 0;
}

Fairy.prototype.die = function() {
	this.animation = this.createAnimation(DEAD, this.team, this.animations);
	this.state = DEAD;
	this.speed = 0;
}

Fairy.prototype.collide = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Fairy.prototype.getSpeed = function(team) {
	if (team === 0)
		return FAIRY_SPEED;
	else return -FAIRY_SPEED;
}

Fairy.prototype.getPosition = function(team) {
	if (team === 0)
		return 0;
	else return 600; // should be constant
}

Fairy.prototype.createAnimation = function(status, team, animations) {
	switch(status) {
		case IDLE:
			if (team === 0)
				return new Animation(animations[FAIRY_LEFT_IDLE], 147, 128, 5, 0.20, 5, true, 1);
			else return new Animation(animations[FAIRY_RIGHT_IDLE], 138, 128, 4, 0.20, 4, true, 1);
		case WALK:
			if (team === 0)
				return new Animation(animations[FAIRY_LEFT_WALK], 149, 128, 5, 0.20, 5, true, 1);
			else return new Animation(animations[FAIRY_RIGHT_WALK], 139, 128, 4, 0.20, 4, true, 1);
		case ATTACK:
			if (team === 0)
				return new Animation(animations[FAIRY_LEFT_ATTACK], 133, 128, 5, 0.20, 5, true, 1);
			else return new Animation(animations[FAIRY_RIGHT_ATTACK], 128, 128, 5, 0.20, 5, true, 1);
		case DEAD:
			if (team === 0)
				return new Animation(animations[FAIRY_LEFT_DIE], 144, 128, 5, 0.20, 5, false, 1.3);
			else return new Animation(animations[FAIRY_RIGHT_DIE], 151, 128, 5, 0.20, 5, false, 1.3);
		default: return null;
	}
}