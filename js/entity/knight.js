/** 
 * The Knight class. Represents the Knight character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
 var KNIGHT_SPEED = 25;
 var KNIGHT_HEALTH = 200;
 
function Knight(game, spritesheets, lane, team) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.animation = this.createAnimation(WALK, team, spritesheets);
	this.speed = this.getSpeed(team);
	this.state = WALK;
	this.lane = lane;
	this.team = team;
	this.health = 10;
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
	
	this.game.manager.getMusic('./sound/pop.mp3').play();
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function() {
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (this.collide(entity) && entity !== this && entity.state !== DEAD) {
			if (isEnemy(this, entity)) {
				console.log('knight found enemy ... ');
				this.attack();
				//console.log('knight health ... ' + this.health);
				if (entity.health > 0)
					entity.health -= 1;
				else {
					entity.die();
					this.walk();
				}
			}
		}
	}
	
//	if (this.x > 300 && this.state !== IDLE) {
//		this.idle();
//	}
	if (this.health <= 0 && this.state !== DEAD) {
		this.die();
	}
	
	if (this.state === DEAD && this.animation.isDone()) {
		this.game.removeEntity(this);
	}
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Knight.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Knight.prototype.idle = function() {
	this.animation = this.createAnimation(IDLE, this.team, this.animations);
	this.state = IDLE;
	this.speed = 0;
}

Knight.prototype.walk = function() {
	this.animation = this.createAnimation(WALK, this.team, this.animations);
	this.state = WALK;
	this.speed = this.getSpeed(this.team);
}

Knight.prototype.attack = function() {
	this.animation = this.createAnimation(ATTACK, this.team, this.animations);
	this.state = ATTACK;
	this.speed = 0;
}

Knight.prototype.die = function() {
	this.animation = this.createAnimation(DEAD, this.team, this.animations);
	this.state = DEAD;
	this.speed = 0;
}

Knight.prototype.collide = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Knight.prototype.getSpeed = function(team) {
	if (team === 0)
		return KNIGHT_SPEED;
	else return -KNIGHT_SPEED;
}

Knight.prototype.getPosition = function(team) {
	if (team === 0)
		return 0;
	else return 600; // should be constant
}

Knight.prototype.createAnimation = function(status, team, animations) {
	switch(status) {
		case IDLE:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_IDLE], 133, 128, 7, 0.14, 7, true, 1.1);
			else return new Animation(animations[KNIGHT_RIGHT_IDLE], 140, 128, 7, 0.14, 7, true, 1.1);
		case WALK:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_WALK], 137, 128, 7, 0.14, 7, true, 1.1);
			else return new Animation(animations[KNIGHT_RIGHT_WALK], 143, 128, 7, 0.14, 7, true, 1.1);
		case ATTACK:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_ATTACK], 124, 128, 7, 0.14, 7, true, 1.2);
			else return new Animation(animations[KNIGHT_RIGHT_ATTACK], 147, 128, 7, 0.14, 7, true, 1.1);
		case DEAD:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_DIE], 144, 128, 7, 0.14, 7, false, 1);
			else return new Animation(animations[KNIGHT_RIGHT_DIE], 153, 128, 7, 0.14, 7, false, 1);
		default: return null;
	}
}