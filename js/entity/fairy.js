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
	this.animation = new Animation(spritesheets[WALK], 149, 128, 5, 0.20, 5, true, 1);
	this.speed = FAIRY_SPEED;
	this.state = WALK;
	this.team = team;
	this.ctx = game.ctx;
	switch (lane) {
		case 1:
			Entity.call(this, game, 0, 55, 1);
			break;
		case 2:
			Entity.call(this, game, 0, 135, 2);
			break;
		case 3:
			Entity.call(this, game, 0, 215, 3);
			break;
		case 4:
			Entity.call(this, game, 0, 295, 4);
			break;
		case 5:
			Entity.call(this, game, 0, 375, 5);
	}
}

Fairy.prototype = new Entity();
Fairy.prototype.constructor = Fairy;

Fairy.prototype.update = function() {
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
	this.animation = new Animation(this.animations[IDLE], 147, 128, 5, 0.20, 5, true, 1);
	this.state = IDLE;
	this.speed = 0;
}

Fairy.prototype.walk = function() {
	this.animation = new Animation(this.animations[WALK], 149, 128, 5, 0.20, 5, true, 1);
	this.state = WALK;
	this.speed = FAIRY_SPEED;
}

Fairy.prototype.attack = function() {
	this.animation = new Animation(this.animations[ATTACK], 262, 128, 5, 0.20, 5, true, 1);
	this.state = ATTACK;
	this.speed = 0;
}

Fairy.prototype.die = function() {
	this.animation = new Animation(this.animations[DEAD], 144, 128, 5, 0.20, 5, false, 1);
	this.state = DEAD;
	this.speed = 0;
}

Fairy.prototype.collide = function(other) {
	return distanceX(this, other) > 0 && distanceX(this, other) < 90;
}