/** 
 * The Knight class. Represents the Knight character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */
function Knight(game, spritesheets, sounds, lane, team) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.sounds = sounds;
	this.animation = this.createAnimation(WALK, team, spritesheets);
	this.speed = this.getSpeed(team);
	this.state = WALK;
	this.lane = lane;
	this.team = team;
	this.hit = team === 0 ? KNIGHT_HIT_DAMAGE_1 : KNIGHT_HIT_DAMAGE_2;
	this.range = team === 0 ? KNIGHT_RANGE_1 : KNIGHT_RANGE_2;
	this.health = team === 0 ? KNIGHT_HEALTH_1 : KNIGHT_HEALTH_2;
	this.isTargeting = null;
	this.isBehind = null;
	this.isTargeting = null;
	this.isAttacking = false;
	this.ctx = game.ctx;
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

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function()
{
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
			this.attack(); // change the status from walk and idle to attack
		} else if (this.state === ATTACK && this.animation.elapsedTime > 0.7 &&
				 this.animation.elapsedTime < 0.8 && !this.isAttacking) {
			this.isAttacking = true;
//			console.log("knight is attacking");
			this.sounds[KNIGHT_SOUND_ATTACK].play();
		} 
		
		if (this.state === ATTACK && this.isAttacking && this.animation.elapsedTime > 0.9) {
//			console.log("knight attacked");
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
	
	if (this.x > NEXT_LEVEL_POS) {
		this.game.removeEntity(this);
		this.game.freq -= AI_FREQ_FACTOR;
		if (this.game.freq < 2)
			this.game.freq = 2;
		this.game.currentBG++;
		if (this.game.currentBG >= this.game.backgrounds.length)
			this.game.currentBG = 0;
		this.sounds[GAME_NEXT_LEVEL].play();
	}
	
	if (this.x < LOST_POS)
	{
		this.game.timer.pause();
		this.sounds[GAME_LOST].play();
	}

	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Knight.prototype.updateStatus = function()
{
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && entity.state !== DEAD) {
			if (isEnemy(this,entity)) {
				if (this.isTargeting === null &&
					distanceAbs(entity, this) <= this.range) {
//					console.log('knight found enemy ... ');
					this.isTargeting = entity;
				}
			} else {
				if (this.collide(entity) && 
					this.isBehind === null) {
						
//					console.log('knight colliding...');
					this.isBehind = entity;
					if (entity.speed < this.speed) {
						this.speed = entity.speed;
					}	
				}
			}
		}				
	}
}

Knight.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	this.drawBar();
    Entity.prototype.draw.call(this);
}

Knight.prototype.drawBar = function()
{
	var max = this.team === 0 ? KNIGHT_HEALTH_1 : KNIGHT_HEALTH_2;
	var current = getPercentBar(this.health, max, BAR_SIZE);
	this.ctx.fillStyle = "red";
	this.ctx.fillRect(this.x, this.y + 130, current, 5);

	this.ctx.fillStyle = "white";

	this.ctx.fillRect(this.x + current, this.y + 130, BAR_SIZE - current, 5);
}

Knight.prototype.idle = function() {
	if (this.state === ATTACK) {
		this.y += 20;
	}
	this.animation = this.createAnimation(IDLE, this.team, this.animations);
	this.state = IDLE;
	this.speed = 0;
}

Knight.prototype.walk = function() {
	if (this.state === ATTACK) {
		this.y += 20;
	}
	this.animation = this.createAnimation(WALK, this.team, this.animations);
	this.state = WALK;
	this.speed = this.getSpeed(this.team);
}

Knight.prototype.attack = function() {
	if(this.state === WALK || this.state === IDLE) {
		this.y -= 20;
	}
	
	this.animation = this.createAnimation(ATTACK, this.team, this.animations);
	this.state = ATTACK;
	this.speed = 0;
}

Knight.prototype.die = function() {
	this.animation = this.createAnimation(DEAD, this.team, this.animations);
	//this.sounds[KNIGHT_SOUND_DEAD].play();
	this.state = DEAD;
	this.speed = 0;
}

Knight.prototype.isTouching = function(other) {
	return distanceX(this, other) > 85 && distanceX(this, other) < 90;
}

Knight.prototype.collide = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Knight.prototype.onTop = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Knight.prototype.getSpeed = function(team) {
	if (team === 0)
		return KNIGHT_SPEED_1;
	else return -KNIGHT_SPEED_2;
}

Knight.prototype.getPosition = function(team) {
	if (team === 0)
		return 220;
	else return 1000; // should be constant
}

Knight.prototype.createAnimation = function(status, team, animations) {
	switch(status) {
		case IDLE:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_IDLE], 133, 128, 7, 0.14, 7, true, 1.0);
			else return new Animation(animations[KNIGHT_RIGHT_IDLE], 140, 128, 7, 0.14, 7, true, 1.0);
		case WALK:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_WALK], 137, 128, 7, 0.14, 7, true, 1);
			else return new Animation(animations[KNIGHT_RIGHT_WALK], 143, 128, 7, 0.14, 7, true, 1);
		case ATTACK:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_ATTACK], 124, 128, 7, 0.14, 7, true, 1.1);
			else return new Animation(animations[KNIGHT_RIGHT_ATTACK], 147, 128, 7, 0.14, 7, true, 1.1);
		case DEAD:
			if (team === 0)
				return new Animation(animations[KNIGHT_LEFT_DIE], 156, 128, 7, 0.14, 7, false, 1.16);
			else return new Animation(animations[KNIGHT_RIGHT_DIE], 153, 128, 7, 0.14, 7, false, 1.3);
		default: return null;
	}
}
