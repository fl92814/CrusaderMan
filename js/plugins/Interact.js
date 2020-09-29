//=============================================================================
// Interact.js
//=============================================================================

/*:
 * @plugindesc v0.0.3 Interact allows the user to interact with something
 * @author Atlas
 *
 * @param Variable ID
 * @parent Settings
 * @type number
 * @default 69
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Variable ID where input is returned
 * 
 * @param Command Display
 * @parent Settings
 * @type struct<CommandDisplay>
 * @desc Position, max length and default command.
 * @default {"Position X":"0","Position Y":"0","Max Length":"12","Default String":""}
 *
 * @param Character Input
 * @parent Settings
 * @type struct<CharacterInput>
 * @desc Position, width, and height
 * @default {"Position X":"0","Position Y":"0","Row Size":"1","Column Size":"1"}
 *
 * @param Keyword Bank
 * @parent Settings
 * @type struct<KeywordBank>
 * @desc Position, max keyword length, and max keywords displayed
 * @default {"Position X":"0","Position Y":"0","Max Keyword Length":"1","Max Keywords Displayed":"1"}
 *
 * @param Portrait
 * @parent Settings
 * @type struct<Portrait>
 * @desc Default portrait position and size
 * @default {"Position X":"0","Position Y":"0","Width":"0","Height":"0","Portrait Image":"example"}
 *
 * @param Dialogue
 * @parent Settings
 * @type struct<Dialogue>
 * @desc Default dialogue position and line length in chars
 * @default {"Position X":"0","Position Y":"0","Max Line Characters":"36"}
 */

 /*~struct~CommandDisplay:
 * @param Position X
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc X Position of portrait window
 * 
 * @param Position Y
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Y Position of portrait window
 * 
 * @param Max Length
 * @type number
 * @default 12
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc Maximum length of command word
 * 
 * @param Default String
 * @type string
 * @default
 * @desc Default command string
 */

 /*~struct~CharacterInput:
 * @param Position X
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc X Position of portrait window
 * 
 * @param Position Y
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Y Position of portrait window
 * 
 * @param Row Size
 * @type number
 * @default 1
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc How many characters in each row
 * 
 * @param Column Size
 * @type number
 * @default 1
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc How many characters in each column
 */

  /*~struct~KeywordBank:
 * @param Position X
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc X Position of portrait window
 * 
 * @param Position Y
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Y Position of portrait window
 * 
 * @param Max Keyword Length
 * @type number
 * @default 1
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc How many characters in each keyword are displayed
 * 
 * @param Max Keywords Displayed
 * @type number
 * @default 1
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc How many keywords are displayed at a time
 */

 /*~struct~Portrait:
 * @param Position X
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc X Position of portrait window
 * 
 * @param Position Y
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Y Position of portrait window
 * 
 * @param Width
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Width of portrait window
 * 
 * @param Height
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Height of portrait window
 * 
 * @param Portrait Image
 * @type string
 * @default ../
 * @desc Name of image in /img/pictures without the extension
 */

 /*~struct~Dialogue:
 * @param Position X
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc X Position of portrait window
 * 
 * @param Position Y
 * @type number
 * @default 0
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Y Position of portrait window
 * 
 * @param Max Line Characters
 * @type number
 * @default 36
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc Maximum amound of characters per line
 */

var Interact = Interact || {};
Interact.DefaultParameters = PluginManager.parameters('Interact');
Interact.Parameters = Interact.Parameters || {};

var Imported = Imported || {};
Imported.Interact = '0.0.3';

if (!Imported.KeywordBank) console.error("This plugin requires KeywordBank");

(function() {
    "use strict";

    Interact.DefaultParameters['Command Display'] = JSON.parse(Interact.DefaultParameters['Command Display']);
    Interact.DefaultParameters['Character Input'] = JSON.parse(Interact.DefaultParameters['Character Input']);
    Interact.DefaultParameters['Keyword Bank'] = JSON.parse(Interact.DefaultParameters['Keyword Bank']);
    Interact.DefaultParameters['Portrait'] = JSON.parse(Interact.DefaultParameters['Portrait']);
    Interact.DefaultParameters['Dialogue'] = JSON.parse(Interact.DefaultParameters['Dialogue']);

    Interact.Parameters.variableId = parseInt(Interact.DefaultParameters['Variable ID']);

    //Load default parameters
    Interact.Parameters.CommandDisplay = {};
    Interact.Parameters.CommandDisplay.x = parseInt(Interact.DefaultParameters['Command Display']['Position X']) || 0;
    Interact.Parameters.CommandDisplay.y = parseInt(Interact.DefaultParameters['Command Display']['Position Y']) || 0;
    Interact.Parameters.CommandDisplay.maxLength = parseInt(Interact.DefaultParameters['Command Display']['Max Length']) || 0;
    Interact.Parameters.CommandDisplay.defaultString = Interact.DefaultParameters['Command Display']['Default String'] || "";

    Interact.Parameters.CharInput = {};
    Interact.Parameters.CharInput.x = parseInt(Interact.DefaultParameters['Character Input']['Position X']) || 0;
    Interact.Parameters.CharInput.y = parseInt(Interact.DefaultParameters['Character Input']['Position Y']) || 0;
    Interact.Parameters.CharInput.rowSize = parseInt(Interact.DefaultParameters['Character Input']['Row Size']) || 0;
    Interact.Parameters.CharInput.columnSize = parseInt(Interact.DefaultParameters['Character Input']['Column Size']) || 0;

    Interact.Parameters.KeywordBank = {};
    Interact.Parameters.KeywordBank.x = parseInt(Interact.DefaultParameters['Keyword Bank']['Position X']) || 0;
    Interact.Parameters.KeywordBank.y = parseInt(Interact.DefaultParameters['Keyword Bank']['Position Y']) || 0;
    Interact.Parameters.KeywordBank.maxKeywordLength = parseInt(Interact.DefaultParameters['Keyword Bank']['Max Keyword Length']) || 0;
    Interact.Parameters.KeywordBank.maxKeywords = parseInt(Interact.DefaultParameters['Keyword Bank']['Max Keywords Displayed']) || 0;

    Interact.Parameters.Portrait = {};
    Interact.Parameters.Portrait.x = parseInt(Interact.DefaultParameters.Portrait['Position X']) || 0;
    Interact.Parameters.Portrait.y = parseInt(Interact.DefaultParameters.Portrait['Position Y']) || 0;
    Interact.Parameters.Portrait.width = parseInt(Interact.DefaultParameters.Portrait['Width']) || 0;
    Interact.Parameters.Portrait.height  = parseInt(Interact.DefaultParameters.Portrait['Height']) || 0;
    Interact.Parameters.Portrait.imageName  = Interact.DefaultParameters.Portrait['Portait Image'] || "";

    Interact.Parameters.Dialogue = {};
    Interact.Parameters.Dialogue.x = parseInt(Interact.DefaultParameters.Dialogue['Position X']) || 0;
    Interact.Parameters.Dialogue.y = parseInt(Interact.DefaultParameters.Dialogue['Position Y']) || 0;
    Interact.Parameters.Dialogue.lineLength = parseInt(Interact.DefaultParameters.Dialogue['Max Line Characters']) || 0;

    Interact.interact = function(keywordGroup, imageName, dialogue){
        Interact.Parameters.KeywordBank.keywordGroup = keywordGroup;
        Interact.Parameters.Portrait.imageName = imageName;
        Interact.Parameters.Dialogue.dialogue = dialogue;
        SceneManager.push(SceneInteract);
    };

    Interact.configureCommandDisplay = function(length, defaultString){
        Interact.Parameters.CommandDisplay.length = length;
        Interact.Parameters.CommandDisplay.defaultString = defaultString;
    };

    Interact.configurePortrait = function(x, y, width, height){
        Interact.Parameters.Portrait.x = x;
        Interact.Parameters.Portrait.y = y;
        Interact.Parameters.Portrait.width = width;
        Interact.Parameters.Portrait.height = height;
    };

    Interact.configureDialogue = function(x, y, lineLength){
        Interact.Parameters.Dialogue.x = x;
        Interact.Parameters.Dialogue.y = y;
        Interact.Parameters.Dialogue.lineLength = lineLength;
    };

    var old_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(pluginCommand, args) {
        old_pluginCommand.call(this, pluginCommand, args);

        switch(pluginCommand)
        {
            case 'interact':
                Interact.interact(args[0], args[1], args[2]);
                break;

            case 'interact_configure_display':
                Interact.configureCommandDisplay(args[0], args[1]);
                break;

            case 'interact_configure_portrait':
                Interact.configurePortrait(args[0], args[1], args[2], args[3]);
                break;

            case 'interact_configure_dialogue':
                Interact.configureDialogue(args[0], args[1], args[2]);
                break;
        }
    };


    //------------------------------------------------------------------------
    //SceneInteract
    // Creates the Command Input Scene
    //------------------------------------------------------------------------

    function SceneInteract(){
        this.initialize.apply(this, arguments);
    }

    //Constructors
    SceneInteract.prototype = Object.create(Scene_MenuBase.prototype);
    SceneInteract.prototype.constructor = SceneInteract;

    SceneInteract.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    SceneInteract.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createKeywordBankWindow();
        this.createCommandDisplayWindow();
        this.createCommandInputWindow();
        this.createObjectPortraitWindow();
        this.createObjectDialogueWindow();
        this.remappedKeys = [];
        if (Imported.QInput)
        {
            this.remapWASD();
        }
    };

    SceneInteract.prototype.remapWASD = function () {
        if (QInput.removeKeyFromMapping('#w', 'up'))
            this.remappedKeys.push(['#w', 'up']);
        if (QInput.removeKeyFromMapping('#a', 'left'))
            this.remappedKeys.push(['#a', 'left']);
        if (QInput.removeKeyFromMapping('#s', 'down'))
            this.remappedKeys.push(['#s', 'down']);
        if (QInput.removeKeyFromMapping('#d', 'right'))
            this.remappedKeys.push(['#d', 'right']);
    };

    SceneInteract.prototype.undoRemapWASD = function () {
        for(var index = 0; index < this.remappedKeys.length; index++) {
            QInput.addKeyToMapping(this.remappedKeys[index][0], this.remappedKeys[index][1]);
        }
        this.remappedKeys = [];
    };

    SceneInteract.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this.m_commandDisplayWindow.refresh();
        this.m_commandInputWindow.activate();
    };

    SceneInteract.prototype.createKeywordBankWindow = function() {
        this.m_keywordBankWindow = new WindowKeywordBank(Interact.Parameters.KeywordBank.x, Interact.Parameters.KeywordBank.y,
            Interact.Parameters.KeywordBank.maxKeywordLength, Interact.Parameters.KeywordBank.maxKeywords, Interact.Parameters.KeywordBank.keywordGroup);
        this.addWindow(this.m_keywordBankWindow);
    };

    SceneInteract.prototype.createCommandDisplayWindow = function() {
        this.m_commandDisplayWindow = new WindowCommandDisplay(Interact.Parameters.CommandDisplay.x, Interact.Parameters.CommandDisplay.y, 
            Interact.Parameters.CommandDisplay.maxLength, Interact.Parameters.CommandDisplay.defaultString, this.m_keywordBankWindow);
        this.addWindow(this.m_commandDisplayWindow);
        this.m_keywordBankWindow.registerCommandDisplayWindow(this.m_commandDisplayWindow);
    };

    SceneInteract.prototype.createCommandInputWindow = function() {
        this.m_commandInputWindow = new WindowCommandInput(Interact.Parameters.CharInput.x, Interact.Parameters.CharInput.y,
            Interact.Parameters.CharInput.rowSize, Interact.Parameters.CharInput.columnSize, this.m_commandDisplayWindow, this.m_keywordBankWindow);
        this.m_commandInputWindow.setHandler('ok', this.commandInputComplete.bind(this));
        this.addWindow(this.m_commandInputWindow);
        this.m_keywordBankWindow.registerCommandInputWindow(this.m_commandInputWindow);
    };

    SceneInteract.prototype.createObjectPortraitWindow = function() {
        this.m_objectPortraitWindow = new WindowObjectPortrait(Interact.Parameters.Portrait.x, Interact.Parameters.Portrait.y,
            Interact.Parameters.Portrait.width, Interact.Parameters.Portrait.height, Interact.Parameters.Portrait.imageName);
        this.addWindow(this.m_objectPortraitWindow);
    };

    SceneInteract.prototype.createObjectDialogueWindow = function() {
        this.m_objectDialogueWindow = new WindowObjectDialogue(Interact.Parameters.Dialogue.x, Interact.Parameters.Dialogue.y,
            Interact.Parameters.Dialogue.lineLength, Interact.Parameters.Dialogue.dialogue);
        this.addWindow(this.m_objectDialogueWindow);
    };

    SceneInteract.prototype.commandInputComplete = function() {
        var str = this.m_commandDisplayWindow.finaltext();
        if (!KeywordBank.exists(str, Interact.Parameters.KeywordBank.keywordGroup) || KeywordBank.locked(str, Interact.Parameters.KeywordBank.keywordGroup))
        {
            SoundManager.playBuzzer();
            return;
        }

        this.undoRemapWASD();
        $gameVariables.setValue(Interact.Parameters.variableId, str);
        this.popScene();
    };

    //-----------------------------------------------------------------------------
    // KeywordBankWindow
    //
    // The window for showing available keywords

    function WindowKeywordBank(x, y, maxKeywordLength, maxKeywords, keywordGroup) {
        this.initialize.call(this, x, y, maxKeywordLength, maxKeywords, keywordGroup);
    }

    WindowKeywordBank.prototype = Object.create(Window_Selectable.prototype);
    WindowKeywordBank.prototype.constructor = WindowKeywordBank;

    WindowKeywordBank.prototype.initialize = function(x, y, maxKeywordLength, maxKeywords, keywordGroup) {
        this.m_maxKeywordLength = maxKeywordLength;
        this.m_maxKeywords = maxKeywords;
        this.m_keywordGroup = keywordGroup;
        this.m_commandInputWindow = null;
        this.m_commandDisplayWindow = null;
        this.m_topKeywordIndex = 0;
        this.m_keywordList = KeywordBank.getUnlockedKeywords(keywordGroup);
        this._tabTriggered = false;
        this._spaceOrEnterTriggered = false;
        Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
    };

    WindowKeywordBank.prototype.getKeywordListLength = function() {
        return this.m_keywordList.length;
    };

    WindowKeywordBank.prototype.registerCommandInputWindow = function(commandInputWindow){
        this.m_commandInputWindow = commandInputWindow;
    };

    WindowKeywordBank.prototype.registerCommandDisplayWindow = function(commandDisplayWindow){
        this.m_commandDisplayWindow = commandDisplayWindow;
    };

    WindowKeywordBank.prototype.windowWidth = function() {
        return this.m_maxKeywordLength * 12;
    };

    WindowKeywordBank.prototype.windowHeight = function() {
        return this.fittingHeight(this.m_maxKeywords);
    };

    WindowKeywordBank.prototype.drawItem = function(index){
        var rect = this.itemRect(index);
        this.drawText(this.m_keywordList[index], rect.x, rect.y, rect.width); 
    };

    WindowKeywordBank.prototype.setKeywordListFilter = function(filter) {
        this.m_keywordList = KeywordBank.getUnlockedKeywordsFiltered(this.m_keywordGroup, filter);
        this.select(0);
        this.refresh();
    };

    WindowKeywordBank.prototype.maxItems = function() {
        return this.m_keywordList.length;
    };

    WindowKeywordBank.prototype.applyWord = function() {
        if (this.m_commandDisplayWindow)
            this.m_commandDisplayWindow.displayString(this.m_keywordList[this._index]);
        if (this.m_commandInputWindow) {
            this.m_commandInputWindow.activate();
            this.m_commandInputWindow.onTextOk();
        }
        this.deactivate();
    };

    WindowKeywordBank.prototype.processCursorMove = function() {
        if (this.isCursorMovable()) {
            var lastIndex = this.index();
            if (Input.isRepeated('down')||Input.isRepeated('#s')) {
                this.cursorDown(Input.isTriggered('down')||Input.isTriggered('#s'));
            }
            if (Input.isRepeated('up')||Input.isRepeated('#w')) {
                this.cursorUp(Input.isTriggered('up')||Input.isTriggered('#w'));
            }
            if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
                this.cursorPagedown();
            }
            if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
                this.cursorPageup();
            }
            if (this.index() !== lastIndex) {
                SoundManager.playCursor();
            }
        }
    };

    WindowKeywordBank.prototype.processHandling = function () {
        if (this.isOpenAndActive()) {
            if (Imported.Quasi_Input || Imported.QInput) {
                if (Input.isTriggered('#space') || Input.isTriggered('#enter')){
                    this._spaceOrEnterTriggered = true;
                }
                if (Input.isTriggered('#tab')) {
                    this._tabTriggered = true;
                }
                if (this._spaceOrEnterTriggered && !Input.isTriggered('#space') && !Input.isTriggered('#enter')){
                    this._spaceOrEnterTriggered = false;
                    this.applyWord();
                    return;
                }
                if (this._tabTriggered && !Input.isTriggered('#tab')){
                    this._tabTriggered = false;
                    this.deactivate();
                    if (this.m_commandInputWindow)
                        this.m_commandInputWindow.activate();
                    return;
                }
            } else {
                if (Input.isTriggered('shift')) {
                    this.processJump();
                }
                if (Input.isRepeated('cancel')) {
                    this.processBack();
                }
                if (Input.isRepeated('ok')) {
                    this.processOk();
                }
            }
        }
    };

    WindowKeywordBank.prototype.processWheel = function() {
        if (this.isOpen()) {
            var threshold = 20;
            if (TouchInput.wheelY >= threshold)
                this.scrollDown();
            if (TouchInput.wheelY <= -threshold)
                this.scrollUp();
        }
    };
    
    WindowKeywordBank.prototype.processTouch = function() {
        if (this.isOpen()) {
            if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                this._touching = true;
                this.onTouch(true);
            } else if (TouchInput.isCancelled()) {
                if (this.isCancelEnabled())
                    this.processCancel();
            }
            if (this._touching) {
                if (TouchInput.isPressed())
                    this.onTouch(false);
                else
                    this._touching = false;
            }
        } else {
            this._touching = false;
        }
    };

    WindowKeywordBank.prototype.onTouch = function(triggered) {
        if (!this.active) {
            if (this.m_commandInputWindow)
                this.m_commandInputWindow.deactivate();
            Window_Base.prototype.activate.call(this);
        }

        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0 && (triggered || hitIndex !== this.index())) {
            this.select(hitIndex);

            if (triggered && this.index() === lastIndex)
                this.applyWord();
                
            SoundManager.playCursor();
        }
    };

    //-----------------------------------------------------------------------------
    // WindowCommandDisplay
    //
    // The window for editing the Text on the input screen.

    function WindowCommandDisplay(x, y, maxLength, defaultCommandString, keywordBankWindow) {
        this.initialize.call(this, x, y, maxLength, defaultCommandString, keywordBankWindow);
    }

    WindowCommandDisplay.prototype = Object.create(Window_Base.prototype);
    WindowCommandDisplay.prototype.constructor = WindowCommandDisplay;

    WindowCommandDisplay.prototype.initialize = function(x, y, maxLength, defaultText, keywordBankWindow) {
        this.m_x = x;
        this.m_y = y;
        this.m_maxLength = maxLength;
        this.m_defaultText = defaultText;
        this.m_keywordBankWindow = keywordBankWindow;
        this.m_text = this.m_defaultText.slice(0, maxLength);

        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        
        this.activate();
        this.refresh();
    };

    WindowCommandDisplay.prototype.windowWidth = function() {
        return this.m_maxLength * 20 + 9;
    };

    WindowCommandDisplay.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    WindowCommandDisplay.prototype.finaltext = function() {
        return this.m_text;
    };

    WindowCommandDisplay.prototype.index = function() {
        return this.m_text.length;
    };

    WindowCommandDisplay.prototype.displayString = function(string){
        this.m_text = string;
        this.refresh();
    };

    WindowCommandDisplay.prototype.pushBack = function(ch) {
        if (this.index() < this.m_maxLength) {
            this.m_text += ch;
            this.refresh();
            return true;
        } 
        else {
            return false;
        }
    };

    WindowCommandDisplay.prototype.popBack = function() {
        if (this.index() > 0) {
            this.m_text = this.m_text.slice(0, this.index() - 1);
            this.refresh();
            return true;
        } 
        else {
            return false;
        }
    };

    WindowCommandDisplay.prototype.charWidth = function() {
        var text = $gameSystem.isJapanese() ? '\uff21' : 'A';
       return this.textWidth(text);
    };

    WindowCommandDisplay.prototype.left = function() {
        var textCenter = (this.contentsWidth() + this.DefaultTextWidth()) / 2;
        var textWidth = (this.m_maxLength + 2) * this.charWidth();
        return Math.min(textCenter - textWidth / 2, this.contentsWidth() - textWidth);
    };

    WindowCommandDisplay.prototype.DefaultTextWidth = function(){
        return (this.m_maxLength + 40);
    };

    WindowCommandDisplay.prototype.itemRect = function(index) {
        return {
            x: index * this.charWidth() + (index * 4),
            y: 0,
            width: this.charWidth(),
            height: this.lineHeight()
        };
    };

    WindowCommandDisplay.prototype.underlineRect = function(index) {
        var rect = this.itemRect(index);
        rect.y += rect.height - 4;
        rect.height = 2;
        rect.width += 2;
        rect.x -= 1;
        return rect;
    };

    WindowCommandDisplay.prototype.underlineColor = function() {
        return this.normalColor();
    };
    
    WindowCommandDisplay.prototype.drawUnderline = function(index) {
        var rect = this.underlineRect(index);
        var color = this.underlineColor();
        this.contents.paintOpacity = 48;
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.contents.paintOpacity = 255;
    };
    
    WindowCommandDisplay.prototype.drawChar = function(index) {
        var rect = this.itemRect(index);
        this.resetTextColor();
        this.drawText(this.m_text[index] || '', rect.x, rect.y);
    };

    WindowCommandDisplay.prototype.refresh = function() {
        this.contents.clear();
        for (var i = 0; i < this.m_maxLength; i++) {
            this.drawUnderline(i);
        }
        for (var j = 0; j < this.index(); j++) {
            this.drawChar(j);
        }
        var rect = this.itemRect(this.index());
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        this.m_keywordBankWindow.setKeywordListFilter(this.m_text);
    };

    //-----------------------------------------------------------------------------
    // WindowCommandInput
    //
    // The window for selecting text characters on the input screen.

    function WindowCommandInput(x, y, rowSize, columnSize, displayWindow, keywordBankWindow) {
        this.initialize.call(this, x, y, rowSize, columnSize, displayWindow, keywordBankWindow);
    }

    WindowCommandInput.prototype = Object.create(Window_Selectable.prototype);
    WindowCommandInput.prototype.constructor = WindowCommandInput;

    WindowCommandInput.LATIN =
        [ 'a','b','c','d','e',
            'f','g','h','i','j',
            'k','l','m','n','o',
            'p','q','r','s','t',
            'u','v','w','x','y',
            'z','0','1','2','3',
            '4','5','6','7','8',
            '9',' ',' ',' ','Ok'];

    WindowCommandInput.prototype.initialize = function(x, y, rowSize, columnSize, displayWindow, keywordBankWindow) {
        this.m_rowSize = rowSize;
        this.m_colSize = columnSize;
        this._tabTriggered = false;

        var width = this.m_rowSize * 48;
        var height = this.windowHeight();
        
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.m_displayWindow = displayWindow;
        this.m_keywordBankWindow = keywordBankWindow;
        this.select(0);
        this.refresh();
        this.updateCursor();
        this.activate();
    };

    WindowCommandInput.prototype.windowHeight = function() {
        return this.fittingHeight(this.m_colSize);
    };
    
    WindowCommandInput.prototype.table = function() {
        return WindowCommandInput.LATIN;
    };

    WindowCommandInput.prototype.maxCols = function() {
        return this.m_rowSize;
    };

    WindowCommandInput.prototype.maxItems = function() {
        return this.m_rowSize * this.m_colSize;
    };

    WindowCommandInput.prototype.character = function() {
        return this.index() < this.maxItems() - 1 ? this.table()[this.index()] : '';
    };

    WindowCommandInput.prototype.itemRect = function(index) {
        return {
            x: index % this.m_rowSize * 42 + Math.floor(index % this.m_rowSize / 5) * 24,
            y: Math.floor(index / this.m_rowSize) * this.lineHeight(),
            width: 36,
            height: this.lineHeight()
        };
    };

    WindowCommandInput.prototype.activate = function(){
        this.select(0);
        Window_Selectable.prototype.activate.call(this);
    };

    WindowCommandInput.prototype.deactivate = function(){
        this.select(-1);
        Window_Selectable.prototype.deactivate.call(this);
    };

    WindowCommandInput.prototype.refresh = function() {
        var table = this.table();
        this.contents.clear();
        this.resetTextColor();
        for (var i = 0; i < this.maxItems(); i++) {
            var rect = this.itemRect(i);
            rect.x += 3;
            rect.width -= 6;
            this.drawText(table[i], rect.x, rect.y, rect.width, 'center');
        }
    };

    WindowCommandInput.prototype.updateCursor = function() {
        var rect = this.itemRect(this._index);
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };

    WindowCommandInput.prototype.cursorDown = function(wrap) {
        if (this.index() < this.maxItems() - this.m_rowSize + 1 || wrap) {
            this._index = (this._index + this.m_rowSize) % this.maxItems();
        }
    };

    WindowCommandInput.prototype.cursorUp = function(wrap) {
        if (this.index() >= this.m_rowSize)
            this._index -= this.m_rowSize;
        else
            this._index += this.maxItems() - this.m_rowSize;
    };

    WindowCommandInput.prototype.cursorRight = function(wrap) {
        if (this.index() % this.m_rowSize < this.m_rowSize - 1) {
            this._index++;
        } 
        else if (wrap) {
            this._index -= this.m_rowSize - 1;
        }
    };
    
    WindowCommandInput.prototype.cursorLeft = function(wrap) {
        if (this.index() % this.m_rowSize > 0) {
            this._index--;
        } 
        else if (wrap) {
            this._index += this.m_rowSize - 1;
        }
    };

    WindowCommandInput.prototype.processCursorMove = function() {
        Window_Selectable.prototype.processCursorMove.call(this);
        this.updateCursor();
    };

    WindowCommandInput.prototype.processHandling = function () {
        if (this.isOpenAndActive()) {
            if (Imported.Quasi_Input || Imported.QInput) {
                if (Input.isTriggered('#enter')) {
                    this.onTextOk();
                    return;
                }
                if (Input.isTriggered('#space')) {
                    this.processOk();
                    return;
                }
                if (Input.isTriggered('#tab')){
                    this._tabTriggered = true;
                }
                if (Input.anyTriggered("a-z0-9")) {
                    this.m_displayWindow.pushBack(Input._lastPressed);
                }
                if (Input.isRepeated('#backspace')) {
                    this.processBack();
                }
                if (this._tabTriggered && !Input.isTriggered('#tab')){
                    this._tabTriggered = false;
                    if (this.m_keywordBankWindow.getKeywordListLength() > 0){
                        this.deactivate();
                        this.m_keywordBankWindow.activate();
                    }
                }
            } else {
                if (Input.isTriggered('shift')) {
                    this.processJump();
                }
                if (Input.isRepeated('cancel')) {
                    this.processBack();
                }
                if (Input.isRepeated('ok')) {
                    this.processOk();
                }
            }
        }
    };

    WindowCommandInput.prototype.processWheel = function() {
    };
    
    WindowCommandInput.prototype.processTouch = function() {
        if (this.isOpen()) {
            if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                this._touching = true;
                this.onTouch(true);
            } else if (TouchInput.isCancelled()) {
                if (this.isCancelEnabled())
                    this.processCancel();
            }
            if (this._touching) {
                if (TouchInput.isPressed())
                    this.onTouch(false);
                else
                    this._touching = false;
            }
        } else {
            this._touching = false;
        }
    };

    WindowCommandInput.prototype.onTouch = function(triggered) {
        if (!this.active) {
            if (this.m_keywordBankWindow)
                this.m_keywordBankWindow.deactivate();
            this.activate();
        }

        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex !== this.index())
                this.select(hitIndex);
            if (triggered)
                this.processOk();
        }
    };

    WindowCommandInput.prototype.isCancelEnabled = function() {
        return true;
    };

    WindowCommandInput.prototype.processCancel = function() {
        this.processBack();
    };

    WindowCommandInput.prototype.processBack = function() {
        if (this.m_displayWindow.popBack()) {
            SoundManager.playCancel();
        }
    };

    WindowCommandInput.prototype.processJump = function() {
        if (this.index() !== 39) {
            this._index = 39;
            SoundManager.playCursor();
        }
    };

    WindowCommandInput.prototype.processOk = function() {
        if (this.character())
            this.onTextAdd();
        else
            this.onTextOk();
    };

    WindowCommandInput.prototype.onTextAdd = function() {
        if (this.m_displayWindow.pushBack(this.character())) {
            SoundManager.playOk();
        } else {
            SoundManager.playBuzzer();
        }
    };
    
    WindowCommandInput.prototype.onTextOk = function() {
        if (this.m_displayWindow.finaltext() === '') {
            SoundManager.playBuzzer();
        } else {
            SoundManager.playOk();
        }
        this.callOkHandler();
    };


    //-----------------------------------------------------------------------------
    // WindowInteractablePortrait
    //
    // The window for displaying a portrait of what you are interacting with.

    function WindowObjectPortrait(x, y, width, height, imageName) {
        this.initialize.call(this, x, y, width, height, imageName);
    }

    WindowObjectPortrait.prototype = Object.create(Window_Base.prototype);
    WindowObjectPortrait.prototype.constructor = WindowObjectPortrait;

    WindowObjectPortrait.prototype.initialize = function(x, y, width, height, imageName) {
        this.m_imageWidth = width;
        this.m_imageHeight = height;
        Window_Base.prototype.initialize.call(this, x, y, width + 36, height + 36);
        this.m_imageName = imageName;
        this.activate();
        this.refresh();
    };


    WindowObjectPortrait.prototype.refresh = function (){
        this.contents.clear();
        var bitmap = ImageManager.loadPicture(this.m_imageName);

        bitmap.addLoadListener(function() {
            this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, 0, 0, this.m_imageWidth, this.m_imageHeight);  
        }.bind(this));
        
        
    };

    //-----------------------------------------------------------------------------
    // WindowObjectDialogue
    //
    // The window for displaying dialogue.

    function WindowObjectDialogue(x, y, lineLength, dialogue) {
        this.initialize.call(this, x, y, lineLength, dialogue);
    }

    WindowObjectDialogue.prototype = Object.create(Window_Base.prototype);
    WindowObjectDialogue.prototype.constructor = WindowObjectDialogue;

    WindowObjectDialogue.prototype.initialize = function(x, y, lineLength, dialogue) {
        this.m_lineLength = lineLength;
        this.m_lineAmount = Math.ceil(dialogue.length / lineLength);
        this.m_dialogue = dialogue;
        Window_Base.prototype.initialize.call(this, x, y, this.getWindowWidth(), this.getWindowHeight());
        this.activate();
        this.refresh();
    };

    WindowObjectDialogue.prototype.refresh = function (){
        this.contents.clear();
        this.drawText(this.m_dialogue, 0, 0, this.getWindowWidth());
    };

    WindowObjectDialogue.prototype.getWindowWidth = function() {
        return this.m_lineLength * 20 + 4;
    };

    WindowObjectDialogue.prototype.getWindowHeight = function() {
        return this.fittingHeight(this.m_lineAmount);
    };

    WindowObjectDialogue.prototype.charWidth = function() {
        var text = $gameSystem.isJapanese() ? '\uff21' : 'A';
        return this.textWidth(text);
    };
})();