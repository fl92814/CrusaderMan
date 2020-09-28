//=============================================================================
// MenuMouseScroll.js
//=============================================================================

/*:
 * @plugindesc Enable mouse wheel and touch swipe to scroll through party members in main menu.
 * including the Skill, Equip, and Status screens
 * @author Amuseum
 *
 * @param Move Threshold
 * @desc Threshold for scrolling and swiping.
 * Default 5
 * @default 5
 *
 * @help 
 * While playing the game, go to the main menu -> Skill, Equip, or Status screen.
 * Select a character. Then, you can change party members by one of the following:
 * 1) Scroll mouse wheel up for previous party member; scroll down for next member.
 * 2) Swipe with mouse drag or tablet swipe. Swipe up or left for previous member; 
 *    swipe down or right for next member.
 *
 * Swipe in any long list to page up or down. Start at an unselected item, 
 * then swipe.
 * 
 * This plugin does not provide plugin commands.
 */

(function() {

	var parameters = PluginManager.parameters('MenuMouseScroll');
	var moveThreshold = Number(parameters['Move Threshold']);
	
	// Amuseum new functions start
	var scrollThroughActor = function() {
		if (this.isOpen()) {
			var threshold = moveThreshold;
			if (TouchInput.wheelY >= threshold) {
				SceneManager._scene.nextActor();
			}
			else if (TouchInput.wheelY <= -threshold) {
				SceneManager._scene.previousActor();
			}
		}
	};
	
	var swipeThroughActor = function() {
		if (this.isOpen()) {
			if (TouchInput.isTriggered()) {
				TouchInput._startX = TouchInput._x;
				TouchInput._startY = TouchInput._y;
			}

			if (TouchInput.isMoved() && TouchInput.isReleased()) {
				this._touching = false;

				var threshold = moveThreshold;
				var deltaX = TouchInput._x - TouchInput._startX;
				var deltaY = TouchInput._y - TouchInput._startY;
				if (deltaY >= threshold) {
					SceneManager._scene.nextActor();
				}
				else if (deltaY <= -threshold) {
					SceneManager._scene.previousActor();
				}
				else if (deltaX >= threshold) {
					SceneManager._scene.nextActor();
				}
				else if (deltaX <= -threshold) {
					SceneManager._scene.previousActor();
				}
			}
		}
	}
	
	Window_Selectable.prototype.processSwipe = function() {
		if (this.isOpenAndActive()) {
			if (TouchInput.isTriggered()) {
				TouchInput._startX = TouchInput._x;
				TouchInput._startY = TouchInput._y;
			}

			if (TouchInput.isMoved() && TouchInput.isReleased()) {
				this._touching = false;

				var threshold = moveThreshold;
				var deltaX = TouchInput._x - TouchInput._startX;
				var deltaY = TouchInput._y - TouchInput._startY;
				if (deltaY >= threshold) {
					this.cursorPagedown();
				}
				else if (deltaY <= -threshold) {
					this.cursorPageup();
				}
				else if (deltaX >= threshold) {
					this.cursorPagedown();
				}
				else if (deltaX <= -threshold) {
					this.cursorPageup();
				}
			}
		}
	}
	// Amuseum new functions end
	
	// Amuseum hook functions start
	var oldProcessTouch = Window_Selectable.prototype.processTouch;
	Window_Selectable.prototype.processTouch = function() {
		this.processSwipe();
		oldProcessTouch.call(this);
	}	
	
	var oldScrollDown = Window_Selectable.prototype.scrollDown;
	Window_Selectable.prototype.scrollDown = function() {
		oldScrollDown.call(this);
		this.cursorDown();
	};
		
	var oldScrollUp = Window_Selectable.prototype.scrollUp;
	Window_Selectable.prototype.scrollUp = function() {
		oldScrollUp.call(this);
		this.cursorUp();
	};

	// Amuseum hook functions end
	
	// Amuseum replace functions start
	Window_SkillType.prototype.processWheel = scrollThroughActor;
	Window_EquipCommand.prototype.processWheel = scrollThroughActor;		
	Window_Status.prototype.processWheel = scrollThroughActor;
	Window_QuestData.prototype.processWheel = scrollThroughActor;
	
	Window_SkillType.prototype.processSwipe = swipeThroughActor;
	Window_EquipCommand.prototype.processSwipe = swipeThroughActor;		
	Window_Status.prototype.processSwipe = swipeThroughActor;
	// Amuseum replace functions end

})();
