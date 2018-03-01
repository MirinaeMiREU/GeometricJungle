/** 
 * This file contains a few helpful functions used by the game engine.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */

/**
 * Returns the distance between two given points.
 * 
 * @param point1 The first point.
 * @param point2 The second point.
 * @returns The distance between the two points.
 */
function distance(point1, point2) {
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Checks to see if any two entities belong to the same team.
 * 
 * @param entity1 The first entity to check.
 * @param entity2 The second entity to check.
 * @returns True if entities belong to same team, false otherwise.
 */
function isEnemy(entity1, entity2) {
	return entity1.team !== entity2.team;
}

/**
 * Returns the x-coordinate distance between any two entites.
 * 
 * @param entity1 The first entity's x-coordinate.
 * @param entity2 The first second's x-coordinate.
 * @returns
 */
function distanceX(entity1, entity2) {
	if (entity1.z === entity2.z) {
		return entity2.x - entity1.x;
	}
	return Infinity;
}

function distanceAbs(entity1, entity2) {
	if (entity1.z === entity2.z) {
		return Math.abs(entity2.x - entity1.x);
	}
	return Infinity;
}

/**
 * Flips an image vertically, horizontally, or both.
 * 
 * @param image The image to be flipped.
 * @param context The context.
 * @param flipH True to flip horizontally, otherwise False.
 * @param flipV True to flip vertically, otherwise False.
 */
function flip(image, context, flipH, flipV) {
	var scaleH = flipH ? -1 : 1;							// set horizontal scale to -1 if flip horizontal
	var scaleV = flipV ? -1 : 1;							// set vertical scale to -1 if flip vertical
	var posX = flipH ? width * -1 : 0;					    // set x position to -100% if flip horizontal 
	var posY = flipV ? height * -1 : 0;					    // set y position to -100% if flip vertical
    
    context.save();										    // save the current state
    context.scale(scaleH, scaleV);					        // set scale to flip the image
    context.drawImage(image, posX, posY, width, height);	// draw the image
    context.restore();								        // restore the last saved state
}

/**
 * Creates a current health pecentage bar based on input health info.
 * 
 * @param currentHealth The current health of the unit.
 * @param maxHealth The max health of the unit.
 * @param barMaxSize The size of the health bar.
 * @returns A current health pecentage bar based on input health info.
 */
function getPercentBar(currentHealth, maxHealth, barMaxSize) {
	return currentHealth / maxHealth * barMaxSize;
}

/**
 * Spawns an allied unit given a specific input team, unit, amd lane.
 * 
 * @param game The game engine.
 * @param animArr The animations data for the unit.
 * @param soundArr The sound data for the unit.
 * @param lane The lane to spawn the unit in.
 * @param unit The type of unit to spawn.
 * @param team What team to spawn the unit in.
 * @returns Adds the entity to the game.
 */
function spawnUnit(game, animArr, soundArr, lane, unit, team) {
	if (unit === 1) {
		game.addEntity(new Elf(game, animArr, soundArr, lane, team));
		soundArr[ELF_SOUND_DEPLOY].play();
	} else if (unit === 2) {
		game.addEntity(new Knight(game, animArr, soundArr, lane, team));
		soundArr[KNIGHT_SOUND_DEPLOY].play();
	} else if (unit === 3) {
		game.addEntity(new Fairy(game, animArr, soundArr, lane, team));
		soundArr[FAIRY_SOUND_DEPLOY].play();
	} else if (unit === 4) {
		game.addEntity(new Orc(game, animArr, soundArr, lane, team));
		soundArr[ORC_SOUND_DEPLOY].play();
	} else if (unit === 5) {
		game.addEntity(new Dragon(game, animArr, soundArr, lane, team));
		soundArr[DRAGON_SOUND_DEPLOY].play();
	}
}

function collision(entity1, entity2, threshold) {
	if (entity1.z === entity2.z) {}
}