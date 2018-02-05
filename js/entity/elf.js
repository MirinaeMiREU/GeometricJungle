/** 
 * The Elf class. Represents the Elf character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
function Elf(game, spritesheets, lane, team) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.animation = new Animation(this.animations[1], 111, 128, 4, 0.25, 4, true, 1);
	this.speed = 50;
	this.isIdle = false;
	this.isDead = false;
	this.isAttacking = false;
	this.isBehind = false;
	this.lane = lane;
	this.ctx = game.ctx;
	this.team = team;
	switch (lane) {
		case 1:
			Entity.call(this, game, 0, 50, 1);
			break;
		case 2:
			Entity.call(this, game, 0, 130, 2);
			break;
		case 3:
			Entity.call(this, game, 0, 210, 3);
			break;
		case 4:
			Entity.call(this, game, 0, 290, 4);
			break;
		case 5:
			Entity.call(this, game, 0, 370, 5);
	}
}

Elf.prototype = new Entity();
Elf.prototype.constructor = Elf;

Elf.prototype.update = function() {
	if (this.x > 1000 && !this.isDead) {
		this.die();
		this.speed = 0;
		this.isDead = true;
	}
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity) && !this.isBehind) {
			console.log('Elf colliding...');
			this.isBehind = true;
			this.speed = entity.speed;
		}
		
		if (entity.speed === 0 && this.isBehind && !this.isIdle) {
			this.idle();
		}			
			
	}
	
	
	
	this.x += this.game.clockTick * this.speed;
	
	if (this.isDead && this.animation.isDone()) {
		this.game.removeEntity(this);
	}
	Entity.prototype.update.call(this);
}

Elf.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Elf.prototype.die = function() {
	this.animation = new Animation(this.animations[3], 144, 128, 5, 0.25, 5, false, 1);
	this.isDead = true;
}

Elf.prototype.idle = function() {
	this.animation = new Animation(this.animations[0], 118, 128, 4, 0.25, 4, true, 1);
	this.isIdle = true;
	this.speed = 0;
}

Elf.prototype.collide = function(other) {
	return distanceX(this, other) < 90;
}