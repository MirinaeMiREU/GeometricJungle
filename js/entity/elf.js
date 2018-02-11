/** 
 * The Elf class. Represents the Elf character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
 var ELF_SPEED = 50;
 
function Elf(game, spritesheets, lane, team) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.animation = this.createAnimation(WALK, team, spritesheets);
	this.speed = this.getSpeed(team);
	this.state = WALK;
	this.isBehind = null;
	this.lane = lane;
	this.ctx = game.ctx;
	this.team = team;
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

Elf.prototype = new Entity();
Elf.prototype.constructor = Elf;

Elf.prototype.update = function() {
	if (this.x > 1000) {
		this.game.removeEntity(this);
	}
	
//	if (this.x > 600 && this.state !== DEAD) {
//		this.die();
//	}
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && entity.state !== DEAD && this.collide(entity) && this.isBehind === null) {
			console.log('Elf colliding...');
			this.isBehind = entity;
			if (entity.speed < this.speed) {
				this.speed = entity.speed;
			}
		}			
	}
	
	// Is this object behind an ally?
	if (this.isBehind !== null) {
		if (this.isBehind.state === DEAD) {
			this.isBehind = null;
			this.walk();
		} else if (this.isTouching(this.isBehind)) {
			if (this.isBehind.state === IDLE && this.state !== IDLE) {
				this.idle();
			} else if (this.isBehind.state === WALK && this.state !== WALK) {
				this.walk();
			}
			this.speed = this.isBehind.speed;
		} else if (this.onTop(this.isBehind) && this.state !== IDLE) {
			this.idle();
		} else if (this.isBehind.state === IDLE && this.state !== IDLE) {
			this.idle();
		}
		
		
	}
	
	this.x += this.game.clockTick * this.speed;
	
	if (this.state === DEAD && this.animation.isDone()) {
		this.game.removeEntity(this);
	}
	Entity.prototype.update.call(this);
}

Elf.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Elf.prototype.idle = function() {
	this.animation = this.createAnimation(IDLE, this.team, this.animations);
	this.state = IDLE;
	this.speed = 0;
}

Elf.prototype.walk = function() {
	this.animation = this.createAnimation(WALK, this.team, this.animations);
	this.state = WALK;
	this.speed = ELF_SPEED;
}

Elf.prototype.attack = function() {
	this.animation = this.createAnimation(ATTACK, this.team, this.animations);
	this.state = ATTACK;
	this.speed = 0;
}

Elf.prototype.die = function() {
	this.animation = this.createAnimation(DEAD, this.team, this.animations);
	this.state = DEAD;
	this.speed = 0;
}

Elf.prototype.onTop = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Elf.prototype.isTouching = function(other) {
	return distanceX(this, other) > 85 && distanceX(this, other) < 90;
}

Elf.prototype.collide = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Elf.prototype.getSpeed = function(team) {
	if (team === 0)
		return ELF_SPEED;
	else return -ELF_SPEED;
}

Elf.prototype.getPosition = function(team) {
	if (team === 0)
		return 0;
	else return 600; // should be constant
}

Elf.prototype.createAnimation = function(status, team, animations) {
	switch(status) {
		case IDLE:
			if (team === 0)
				return new Animation(animations[ELF_LEFT_IDLE], 118, 128, 4, 0.25, 4, true, 1);
			else return new Animation(animations[ELF_RIGHT_IDLE], 118, 128, 4, 0.25, 4, true, 1);
		case WALK:
			if (team === 0)
				return new Animation(animations[ELF_LEFT_WALK], 111, 128, 4, 0.25, 4, true, 1);
			else return new Animation(animations[ELF_RIGHT_WALK], 111, 128, 4, 0.25, 4, true, 1);
		case ATTACK:
			if (team === 0)
				return new Animation(animations[ELF_LEFT_ATTACK], 254, 128, 5, 0.20, 5, true, 1);
			else return new Animation(animations[ELF_RIGHT_ATTACK], 254, 128, 5, 0.20, 5, true, 1);
		case DEAD:
			if (team === 0)
				return new Animation(animations[ELF_LEFT_DIE], 144, 128, 5, 0.20, 5, false, 1);
			else return new Animation(animations[ELF_RIGHT_DIE], 144, 128, 5, 0.20, 5, false, 1);
		default: return null;
	}
}