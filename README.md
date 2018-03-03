# Rumble in the Geometric Jungle

Project Plan for Gold Two

Cuong Tran - Logan Stafford - Peter Bae - Varik Hoang

**Introduction**

We plan to make a 2D tower defense/battle arena game mechanically similar to Plants Vs. Zombies (website found [here](https://www.ea.com/games/plantsvszombies/plantsvszombies2)) or  Clash Royale (website found [here](https://clashroyale.com/)) with a light fantasy theme. In this game, the player will control a series of allied &quot;towers&quot; alongside procedurally spawned &quot;underlings&quot; and a randomly picked list of various heroes to use against a single enemy (AIcontrolled, or Human) which is set on the opposite side of a given &quot;arena&quot; playing area in the game. Each character&#39;s spawned minions and enemies will walk towards and begin attacking the closest enemies and towers. The objective of the game is to completely destroy the enemy&#39;s towers to collect money, points, and end the game.

**Animated Resources**

 ****** Underlings (Elf, Fairy, Dragon, Knight, Orc)**

These user controlled characters will have several different animations depending on the characters state.

 **** Starting from both sides after users dropping the troops
 **** Moving to the other side and attack any enemy&#39;s troops that face
 **** Attacking the enemy&#39;s buildings

 ****** Buildings**

Some buildings will protect the user from being attacked. (Walls)

 **** These types of buildings will not have much animation other than showing wear and tear as the building is damaged and being destroyed.

Some buildings will automatically generate troops after a set interval. (Underling Spawners)

 **** These types of buildings will have animation when spawning underlings and when damaged and destroyed.

Some buildings will defend the user by damaging attacking underlings. (Watch Tower)

 **** These types of buildings will have animation when attacking, receiving damage, and being destroyed.

 ****** Background**

The background will be static.

 ****** Music**

The music and sound effects used for the game will make the game seem more responsive and engaging. (music is made by Logan)

  Attacking
  Spawning
  Destruction
  Point Earning
  Win Game/Lose Game
  General Game BG
  General Menu BG

**Control**

The controls in the game is going to be simple, mostly driven by mouse clicks, with keyboard hotkeys.

**Interaction**

Interaction in our game will be based on collision and coordination of animated assets.

Specifically we track collisions between the underlings and the buildings. Certain underlings and buildings will spawn projectiles, which will also collide with each other.

There will be multiple lanes for interactions similar to lanes in Plants vs. Zombies and there will be underlings and buildings that either attack multiple lanes or take up multiple lanes.

**Extras**

In addition to these components we will explore expanding one or more of the following areas:

1. **1.**** Additional Levels/Underlings**

The game will have a more complete feeling with more than one level. We think three levels would be a good target. Also additional enemies and rewards can be animated and added as time permits.

1. **2.**** The Ability to Level Up Underlings**

The game will reward the player for each level cleared with ability points to enhance underlings or buildings for future levels. This will give the player the ability to either evenly improve all underlings or focus on specializing in a particular underling or building.

**Timeline**

1. **1.**** Prototype**

For the prototype we plan to implement all animations for all our animated resources. We will also implement our simple controls. However, most of the interaction in our game will still be unimplemented. This means our animated resources may hang in space or collide as they move with no effects.

1. **2.**** Minimal Deliverable**

This minimal deliverable will consist of a single level of the game including all animations and controls from the prototype as well as fully functioning interaction for all game elements. A simple score is calculated and the game ends with the death of the player or reaching a predefined ending of the level.

1. **3.**** Final Game**

The final game will include all the features of the minimal deliverable along with one or more of the extras as time permits. We expect the improvements to interaction with curved surfaces will be the simplest followed by a high score database. These will be our first targets.

**References**

[Clash Royale](https://clashroyale.com/)

[Plants vs Zombies](https://www.ea.com/games/plantsvszombies/plantsvszombies2)