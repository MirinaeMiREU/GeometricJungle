/** 
 * The Fairy class. Represents the Fairy character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 */
function Fairy(game, spritesheets, sounds, lane, team) {
	
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.sounds = sounds;
	this.animation = this.createAnimation(WALK, team, spritesheets);
	this.magic = null;
	this.magicFromFairy = 0;
	this.speed = this.getSpeed(team);
	this.state = WALK;
	this.lane = lane;
	this.team = team;
	this.hit = team === 0 ? FAIRY_HIT_DAMAGE_1 : FAIRY_HIT_DAMAGE_2;
	this.range = team === 0 ? FAIRY_RANGE_1 : FAIRY_RANGE_2;
	this.health = team === 0 ? FAIRY_HEALTH_1 : FAIRY_HEALTH_2;
	this.isTargeting = null;
	this.isBehind = null;
	this.ctx = game.ctx;
	this.position = this.getPosition(team);
	switch (lane) {
		case 1:
			Entity.call(this, game, this.position, LANE_1 - VERTICAL_LANE_SIZE, 1);
			break;
		case 2:
			Entity.call(this, game, this.position, LANE_2 - VERTICAL_LANE_SIZE, 2);
			break;
		case 3:
			Entity.call(this, game, this.position, LANE_3 - VERTICAL_LANE_SIZE, 3);
			break;
		case 4:
			Entity.call(this, game, this.position, LANE_4 - VERTICAL_LANE_SIZE, 4);
			break;
		case 5:
			Entity.call(this, game, this.position, LANE_5 - VERTICAL_LANE_SIZE, 5);
	}
}

Fairy.prototype = new Entity();
Fairy.prototype.constructor = Fairy;

Fairy.prototype.update = function() 
{
	// debug animations
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
	if (this.isTargeting !== null)
	{
		// if the target is dead
		if (this.isTargeting.state === DEAD)
		{
			this.isTargeting = null;
			this.walk();
		}
		else if (this.state === WALK || this.state === IDLE) {
			this.attack(); // change the status from walk and idle to attack
		}	else if (this.state === ATTACK && this.animation.elapsedTime > 0.7 &&
				 this.animation.elapsedTime < 0.8 && !this.isAttacking)
		{
			this.isAttacking = true;
			console.log("fairy is attacking");
			this.sounds[FAIRY_SOUND_ATTACK].play();
		} 
		
		if (this.state === ATTACK && this.isAttacking && this.animation.elapsedTime > 0.9)
		{
			console.log("fairy attacked");
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
		if (this.game.currentBG >= this.game.backgrounds.length - 1)
			this.game.currentBG = 0;
		this.sounds[GAME_NEXT_LEVEL].play();
	}
	
	if (this.x < LOST_POS) {
		this.game.timer.pause();
		this.game.toggleMusic(false);
		this.game.currentBG = 0;
		this.sounds[GAME_LOST].play();
		this.game.endGame();
	}
	
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Fairy.prototype.updateStatus = function() {
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && entity.state !== DEAD) {
			if (isEnemy(this,entity)) {
				if (this.isTargeting === null &&
					distanceAbs(this, entity) <= this.range) {
//					console.log('fairy found enemy ... ');
					this.isTargeting = entity;
				}
			} else {
				if (this.collide(entity) && 
					this.isBehind === null) {
						
//					console.log('fairy colliding...');
					this.isBehind = entity;
					if (entity.speed < this.speed) {
						this.speed = entity.speed;
					}	
				}
			}
		}				
	}
}

Fairy.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	this.drawBar();
	this.drawMagic(this.isTargeting);
    Entity.prototype.draw.call(this);
}

Fairy.prototype.drawBar = function() {
	var max = this.team === 0 ? FAIRY_HEALTH_1 : FAIRY_HEALTH_2;
	var current = getPercentBar(this.health, max, BAR_SIZE);
	this.ctx.fillStyle = "red";
	this.ctx.fillRect(this.x, this.y + 130, current, 5);

	this.ctx.fillStyle = "white";
	this.ctx.fillRect(this.x + current, this.y + 130, BAR_SIZE - current, 5);
}

Fairy.prototype.drawMagic = function(enemy) {
	if (this.state === ATTACK)
	{
		this.magic = this.createMagicStar(this.team, this.animations);
		if (this.team === 0)
		{
			if (this.x + 80 + this.magicFromFairy > enemy.x)
				this.magicFromFairy = 0;
			else this.magicFromFairy += 5; // need to mathematically calculate this factor
			this.magic.drawFrame(this.game.clockTick, this.ctx, 
				this.x + 80 + this.magicFromFairy, this.y + 70); // this adjusts the arrow based on the fairy
		}
		else
		{
			if (this.x - 80 / 2 - this.magicFromFairy < enemy.x)
				this.magicFromFairy = 0;
			else this.magicFromFairy += 5; // need to mathematically calculate this factor
			this.magic.drawFrame(this.game.clockTick, this.ctx, 
				this.x - 80 / 2 - this.magicFromFairy, this.y + 70); // this adjusts the arrow based on the fairy
		}
	}
}

Fairy.prototype.idle = function() {
	this.animation = this.createAnimation(IDLE, this.team, this.animations);
	this.state = IDLE;
	this.speed = 0;
	
}

Fairy.prototype.walk = function() {
	this.animation = this.createAnimation(WALK, this.team, this.animations);
	this.state = WALK;
	this.speed = this.getSpeed(this.team);
}

Fairy.prototype.attack = function() {
	this.animation = this.createAnimation(ATTACK, this.team, this.animations);
	this.state = ATTACK;
	this.speed = 0;
}

Fairy.prototype.die = function() {
	this.animation = this.createAnimation(DEAD, this.team, this.animations);
	this.sounds[FAIRY_SOUND_DEAD].play();
	this.state = DEAD;
	this.speed = 0;
}

Fairy.prototype.magicStar = function() {
	this.animation = this.createMagicStar(this.team, this.magicstars);
	this.speed = 5;
}

Fairy.prototype.isTouching = function(other) {
	return distanceX(this, other) > 85 && distanceX(this, other) < 90;
}

Fairy.prototype.collide = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Fairy.prototype.onTop = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}

Fairy.prototype.getSpeed = function(team) {
	if (team === 0)
		return FAIRY_SPEED_1;
	else return -FAIRY_SPEED_2;
}

Fairy.prototype.getPosition = function(team) {
	if (team === 0)
		return 220;
	else return 1200; // should be constant
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
			else return new Animation(animations[FAIRY_RIGHT_DIE], 144, 128, 5, 0.20, 5, false, 1.3);
		default: return null;
	}
}

Fairy.prototype.createMagicStar = function(team, animations) {
	if (team === 0)
		return new Animation(animations[FAIRY_LEFT_MAGIC], 76, 73, 1, 1, 1, false, 1);
	else return new Animation(animations[FAIRY_RIGHT_MAGIC], 76, 73, 1, 1, 1, false, 1);
}