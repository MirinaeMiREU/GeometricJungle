# UNHOLY ODYSSEY

Project Plan for Gold Two

Cuong Tran - Logan Stafford - Peter Bae - Varik Hoang

 - Introduction 

We plan to make a 2D tower defense game similar to Plants Vs. Zombies (website found [here](https://www.ea.com/games/plantsvszombies/plantsvszombies2)) or Clash Royale (website found [here](https://clashroyale.com/)) with a light fantasy theme. In this game, the player will control a series of allied  minions that begin walking towards the enemy side of the map,  playing area in the game. Each character&#39;s spawned minions and enemies will walk towards and begin attacking the closest enemies. Each minion does have a spawn cost, which deplete's the game's spawn meter (self-replenishing) that must be managed by the player. The objective of the game is to survive the waves of enemies without depleting your spawn meter to win the game.

 - Animated Resources 

Minions (Elf, Fairy, Dragon, Knight, Orc)
These minions have several different animations depending on the characters state. (I.E., starting from both sides after users dropping the troops, moving to the other side and attack any enemy's troops that face)

 - Background

The background will be static.

 - Music
 
The music and sound effects used for the game will make the game seem more responsive and engaging. (music is made by Logan)

 - Control

The controls in the game is going to be simple, mostly driven by mouse clicks, with keyboard hotkeys available.

 - Interaction

Interaction in our game will be based on collision and coordination of animated assets.

Specifically we track collisions between minions. Certain minions are ranged and will spawn projectiles, which will also collide with each other.

There will be multiple lanes for interactions similar to lanes in Plants vs. Zombies.

 - Extras 

In addition to these components we will explore expanding one or more of the following areas:

 1. Additional Levels/Underlings

The game will have a more complete feeling with more than one level. We think three levels would be a good target. Also additional enemies and rewards can be animated and added as time permits.

2. Minions that either attack multiple lanes or take up multiple lanes.

 - Timeline

1. Prototype

For the prototype we plan to implement all animations for all our animated resources. We will also implement our simple controls. However, most of the interaction in our game will still be unimplemented. This means our animated resources may hang in space or collide as they move with no effects.

2. Minimal Deliverable

This minimal deliverable will consist of a single level of the game including all animations and controls from the prototype as well as fully functioning interaction for all game elements. A simple score is calculated and the game ends with the death of the player or reaching a predefined ending of the level.

3. Final Game

The final game will include all the features of the minimal deliverable along with one or more of the extras as time permits. We expect the improvements to interaction with curved surfaces will be the simplest followed by a high score database. These will be our first targets.

 - References

[Clash Royale](https://clashroyale.com/)

[Plants vs Zombies](https://www.ea.com/games/plantsvszombies/plantsvszombies2)