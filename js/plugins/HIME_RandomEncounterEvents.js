/*:
-------------------------------------------------------------------------
@title Random Encounter Events
@author Hime
@date Nov 10, 2015
-------------------------------------------------------------------------
@plugindesc Allows you to run a common event when you run into a
random encounter.

@param Variable ID
@desc Holds the ID of the common event that should be run. Changeable in-game
@default 0
@help 
-------------------------------------------------------------------------
== Description ==

In RPG Maker, you can set up your maps so that the player will randomly
encounter enemies. You can choose what enemies will be present on the
map, what regions they will be available in, how often they will
show up, and so on.

During the game, the player can then explore your maps and randomly
encounter enemies.

However, what happens if you wanted to have some more control over
the random encounters? What if you wanted to increment some variables
depending on what you encountered? Or perhaps give the player a chance
to skip the encounter by pressing a certain sequence of buttons in
time!

This plugin gives you the tools to apply your eventing knowledge
towards random encounters as well.

When the player runs into a random encounter, a common event of
your choice will execute, before the battle begins.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 10, 2015 - renamed clearEncounter to cancelEncounter
Nov 7, 2015  - initial release
 
== Usage == 

Begin by reserving a variable in your game. This is a special variable
that the game will use to determine which common event will run.

Next, go to the plugin manager, double-click on RandomEncounterEvents,
and enter the ID of the variable that you've decided to use.

And now everything is ready. To test that it works, follow this
example:

1. Let's assume you have chosen variable 10 as your random encounter
variable, and that your map has some random encounters set up.

2. Create a common event that will display a message "Encounter!"
   We'll assume this is common event 4

3. Start testplay, press F9, and change the value of variable 10 to 
   the ID of the common event you set up in step 2. In this case, I will
   set it to 4.
   
4. Now, run around and wait for a random encounter. At some point, you
   should get a message that says "Encounter!", and once you finish
   reading the message, the battle will occur.
   
If you see the encounter message, then your random encounter event has
been set up successfully. You can choose which common event to run
at anytime using events.
   
-- Skipping Encounters --

This plugin let's you skip random encounters in your random encounter
event.

To do this, you would make a script call

  $gamePlayer.cancelEncounter();
  
Which would basically tell the engine to ignore the battle.

-- Accessing Encountered Enemy Information --

In your common event, you will have access to the enemy troop that
you encounter.

You can access the troop through this object in script calls

   $gameTroop
   
I will provide a separate tutorial showing some things you can
do with the troop information.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {};
var TH = TH || {};
Imported.RandomEncounterEvents = 1;
TH.RandomEncounterEvents = TH.RandomEncounterEvents || {};

(function ($) {

  $.parameters = PluginManager.parameters('HIME_RandomEncounterEvents');
  $.VariableID = Math.floor($.parameters["Variable ID"]);

  /* Overwrite */
  Scene_Map.prototype.updateEncounter = function() {
    if ($gamePlayer.executeEncounter()) {
      $gamePlayer.pendingEncounter()      
      $gameTemp.reserveCommonEvent($gameVariables.value($.VariableID))
      $gameMap.setupStartingEvent()      
    }
    else if ($gamePlayer.isPendingEncounter()) {
      if ($gameMap.isEventRunning()) {
        return;
      }
      $gamePlayer.cancelEncounter();
      SceneManager.push(Scene_Battle)
    }
  };
  
  var TH_RandomEncounterEvents_GamePlayer_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    TH_RandomEncounterEvents_GamePlayer_initMembers.call(this);
    this.cancelEncounter();
  };
  
  /* */
  Game_Player.prototype.pendingEncounter = function() {
    this._isEncountering = true;
  };
  
  /* Returns true if there is a pending encounter */
  Game_Player.prototype.isPendingEncounter = function() {
    return this._isEncountering;
  };
  
  /* Removes any pending encounters */
  Game_Player.prototype.cancelEncounter = function() {
    this._isEncountering = false;
  };
  
})(TH.RandomEncounterEvents);