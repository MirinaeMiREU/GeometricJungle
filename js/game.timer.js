/** 
 * This file represents a basic game timer and manages the running time of the canvas.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */
function Timer() {
    this.gameTime = 0;
    this.gameCount = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
    this.status = false;
    
    this.tick = function () {
        var wallCurrent = Date.now();
        var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
        this.wallLastTimestamp = wallCurrent;

        var gameDelta = Math.min(wallDelta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    }
    
    this.isPause = function() {
    	return this.status;
    }
    
    this.pause = function() {
    	this.status = true;
    }
    
    this.resume = function() {
    	this.status = false;
    }
}