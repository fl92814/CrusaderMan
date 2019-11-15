//WordBank

//I want a plugin that displays a window to the left of the input box whenever the input box pops up, that shows available / learned words.
//Locked words will be added to the window whenever a word that has green text appears in the message box.
//The Window should be accessable by pressing left while on the left side of the input box's keyboard window, and should move the input window to the right side of the screen to make room for more words.
//Pressing right while on the right side of the WordBank window should also move back to the input window and allow typing into the input box again.
//The WordBank window should allow scrolling through the available words if there are too many to display on screen, and should allow you to press enter on the word you want and insert it into the input window.
//If typing in the input window the WordBank window should auto-correct to a learned word that is close to what you are typing.

//Categories
	ActionBank
	//"The initial commands that are available to the player when interacting with something or someone."
    
        Unlocked Commands //"Can type these whenever the input box pops up and you are not in battle or conversation"
            (talk,speak,hello,hi) //"Initiates ConvoBank"
            (buy,shop,spend,browse,pay) //"Initiates ShopMenu"
            (battle,fight,kill,attack,punch,kick,murder) //"Initiates BattleBank"
            (look,eye,see,investigate,inspect) //"Initiates ObjectBank"

        Locked Commands //"Must first learn these commands before they're available"
            (steal,take,rob) //"Attempts to steal an item, Initiates ConvoBank if fail"

    ConvoBank
	//"The commands that are available to the player when a conversation command is selected or typed."

        Available Commands
            (yes,yeah,yup) //"Agrees"
            (no,nah,nope) //"Disagrees"
            (Bye,Cya,leave,ignore) //"Exits ConvoBank"
            (beg,money,please,poor) //"Asks for money"
            (who,you,name) //"Asks about the NPC"
            (where,place,here) //"Asks about location"
            (annoy,bug,tease) //"Attempts to upset an NPC"

        Locked Commands
            (job,work,business,stuff,things,) //"Response to what you're doing"
            (crusade,crusader,knight,paladin) //"Your profession"
            (sanctum,cult) //"The target of your first objective"
            (church,religion,faith) //"Questions for the bishop"
            (poison) //"Another word for alcohol"

	BattleBank
	//"The commands that are available to the player when a battle is initiated with something or someone."

        Available Commands
            (battle,fight,kill,attack,punch,kick,murder) //"Attacks the target"
            (defend,block,shield,protect) //"Defends if you have a shield equipped"
            (skill,special,technique,spell,magic,ability,) //"Opens SkillMenu"
            (run,flee,escape,exit,bye,cya,leave) //"Attemps to flee the battle"
        Locked Commands
            (steal,take,rob) //"attempts to steal an item"
    
    ObjectBank
	//"The Bank that contains messages for when you examine things in the world.""