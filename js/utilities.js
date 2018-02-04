/** 
 * The Utilities.js file. Contains a few helpful functions used by the game engine.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */

/**
 * The distance method, which returns the distance
 * between two given points.
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

function distanceX(entity1, entity2) {
	if (entity1.lane === entity2.lane) {
		return Math.abs(entity1.x - entity2.x);
	}
	return Infinity;
}

/**
 * The flip method, which flips an image either 
 * vertically, horizontally, or both.
 * 
 * @param image The image to be flipped.
 * @param context The context.
 * @param flipH True to flip horizontally, otherwise False.
 * @param flipV True to flip vertically, otherwise False.
 */
function flip(image, context, flipH, flipV) {
	var scaleH = flipH ? -1 : 1;							// set horizontal scale to -1 if flip horizontal
	var scaleV = flipV ? -1 : 1;							// set vertical scale to -1 if flip vertical
	var posX = flipH ? width * -1 : 0;					// set x position to -100% if flip horizontal 
	var posY = flipV ? height * -1 : 0;					// set y position to -100% if flip vertical
    
    context.save();										// save the current state
    context.scale(scaleH, scaleV);					    // set scale to flip the image
    context.drawImage(image, posX, posY, width, height);	// draw the image
    context.restore();								    // restore the last saved state
}