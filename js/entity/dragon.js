/** 
 * The Dragon class. Represents the Dragon character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */
function Dragon(game, spritesheets, sounds, lane, team) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.sounds = sounds;
	this.animation = this.createAnimation(WALK, team, spritesheets);
	this.speed = this.getSpeed(team);
	this.state = WALK;
	this.isBehind = null;
	this.isTargeting = null;
	this.isAttacking = false;
	this.hit = team === 0 ? DRAGON_HIT_DAMAGE_1 : DRAGON_HIT_DAMAGE_2;
	this.range = team === 0 ? DRAGON_RANGE_1 : DRAGON_RANGE_2;
	this.health = team === 0 ? DRAGON_HEALTH_1 : DRAGON_HEALTH_2;
	this.lane = lane;
	this.ctx = game.ctx;
	this.team = team;
	switch (lane) {
		case 1:
			Entity.call(this, game, this.getPosition(team), LANE_1 - VERTICAL_LANE_SIZE, 1);
			break;
		case 2:
			Entity.call(this, game, this.getPosition(team), LANE_2 - VERTICAL_LANE_SIZE, 2);
			break;
		case 3:
			Entity.call(this, game, this.getPosition(team), LANE_3 - VERTICAL_LANE_SIZE, 3);
			break;
		case 4:
			Entity.call(this, game, this.getPosition(team), LANE_4 - VERTICAL_LANE_SIZE, 4);
			break;
		case 5:
			Entity.call(this, game, this.getPosition(team), LANE_5 - VERTICAL_LANE_SIZE, 5);
	}
}

Dragon.prototype = new Entity();
Dragon.prototype.constructor = Dragon;

Dragon.prototype.update = function() {
	// debug animation
//	if (this.lane == 1)
//		this.die();
//	else if (this.lane == 2)
//		this.walk();
//	else if (this.lane == 3)
//		this.attack();
//	else if (this.lane == 4)
//		this.idle();
//	return;
	
	// collision
	this.updateStatus();
	
	// Is this object behind an ally?
	if (this.isBehind !== null) {
		if (this.isBehind.state === DEAD) {
			this.isBehind = null;
			this.walk();
		} else if (this.isTouching(this.isBehind)) {
			if ((this.isBehind.state === IDLE || this.isBehind.state === ATTACK) && 
			    this.state !== IDLE &&
				this.isTargeting === null) { // only if not targeting anything
				this.idle();
			} else if (this.isBehind.state === WALK && this.state !== WALK) {
				this.walk();
			}
			this.speed = this.isBehind.speed;
		} else if (this.onTop(this.isBehind) && 
		           this.state !== IDLE && 
				   this.isTargeting === null) { // only if not targeting anything
			this.idle();
		} else if (this.isBehind.state === IDLE && this.state !== IDLE) {
			this.idle();
		} else if (!this.collide(this.isBehind)) {
			this.isBehind = null;
		}
	}
	
	// Is this object attacking?
	if (this.isTargeting !== null) {
		if (this.isTargeting.state === DEAD) {
			this.isTargeting = null;
			this.walk();
		} else if (this.state === WALK || this.state === IDLE) {
			this.attack();
		} else if (this.state === ATTACK && 
		           this.animation.elapsedTime > 0.7 &&
				   this.animation.elapsedTime < 0.8 &&
				   !this.isAttacking) {
			this.isAttacking = true;
//			console.log("dragon is attacking");
			this.sounds[DRAGON_SOUND_ATTACK].play();
		} 
		if (this.state === ATTACK &&
		    this.isAttacking &&
			this.animation.elapsedTime > 0.9) {
//			console.log("dragon attacked");
			this.isAttacking = false;
			this.isTargeting.health -= this.hit;
		}
	}
	

	
	if (this.health <= 0 && this.state !== DEAD) {
		this.die();
	}
	
	if (this.state === DEAD && this.animation.isDone()) {
		this.game.removeEntity(this);
	}
	
	this.x += this.game.clockTick * this.speed;
	
	Entity.prototype.update.call(this);
}

Dragon.prototype.updateStatus = function()
{
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && entity.state !== DEAD) {
			if (isEnemy(this,entity)) {
				if (this.isTargeting === null &&
					distanceAbs(this, entity) <= this.range) {
//					console.log('dragon found enemy ... ');
					this.isTargeting = entity;
				}
			} else {
				if (this.collide(entity) && 
					this.isBehind === null) {
						
//					console.log('dragon colliding...');
					this.isBehind = entity;
					if (entity.speed < this.speed) {
						this.speed = entity.speed;
					}	
				}
			}
		}				
	}
}

Dragon.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	this.drawBar();
    Entity.prototype.draw.call(this);
}

Dragon.prototype.drawBar = function()
{
	var max = this.team === 0 ? DRAGON_HEALTH_1 : DRAGON_HEALTH_2;
	var current = getPercentBar(this.health, max, BAR_SIZE);
	this.ctx.fillStyle = "green";
	this.ctx.fillRect(this.x, this.y + 130, current, 5);
	this.ctx.fillStyle = "red";
	this.ctx.fillRect(this.x + current, this.y + 130, BAR_SIZE - current, 5);
}

Dragon.prototype.idle = function() {
	this.animation = this.createAnimation(IDLE, this.team, this.animations);
	this.state = IDLE;
	this.speed = 0;
}

Dragon.prototype.walk = function() {
	this.animation = this.createAnimation(WALK, this.team, this.animations);
	this.state = WALK;
	this.speed = this.getSpeed(this.team);
}

Dragon.prototype.attack = function() {
	this.animation = this.createAnimation(ATTACK, this.team, this.animations);
	this.state = ATTACK;
	this.speed = 0;
}

Dragon.prototype.die = function() {
	this.animation = this.createAnimation(DEAD, this.team, this.animations);
	this.sounds[DRAGON_SOUND_DEAD].play();
	this.state = DEAD;
	this.speed = 0;
}

Dragon.prototype.onTop = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Dragon.prototype.isTouching = function(other) {
	return distanceX(this, other) > 85 && distanceX(this, other) < 90;
}

Dragon.prototype.collide = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Dragon.prototype.getSpeed = function(team) {
	if (team === 0)
		return DRAGON_SPEED_1;
	else return -DRAGON_SPEED_2;
}

Dragon.prototype.getPosition = function(team) {
	if (team === 0)
		return 0;
	else return 600; // should be constant
}

Dragon.prototype.createAnimation = function(status, team, animations) {
	switch(status) {
		case IDLE:
			if (team === 0)
				return new Animation(animations[DRAGON_LEFT_IDLE], 118, 128, 4, 0.25, 4, true, 1);
			else return new Animation(animations[DRAGON_RIGHT_IDLE], 116, 128, 4, 0.25, 4, true, 1);
		case WALK:
			if (team === 0)
				return new Animation(animations[DRAGON_LEFT_WALK], 111, 128, 4, 0.25, 4, true, 1);
			else return new Animation(animations[DRAGON_RIGHT_WALK], 118, 128, 4, 0.25, 4, true, 1);
		case ATTACK:
			if (team === 0)
				return new Animation(animations[DRAGON_LEFT_ATTACK], 128, 128, 5, 0.20, 5, true, 1);
			else return new Animation(animations[DRAGON_RIGHT_ATTACK], 128, 128, 5, 0.20, 5, true, 1);
		case DEAD:
			if (team === 0)
				return new Animation(animations[DRAGON_LEFT_DIE], 144, 128, 5, 0.20, 5, false, 1);
			else return new Animation(animations[DRAGON_RIGHT_DIE], 144, 128, 5, 0.20, 5, false, 1);
		default: return null;
	}
}