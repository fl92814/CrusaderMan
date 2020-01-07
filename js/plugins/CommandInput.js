//=============================================================================
// CommandInput.js
//=============================================================================

/*:
 * @plugindesc v0.0.1 CommandInput Enables a Command Input system.
 * @author Atlas
 *
 * @param Text Variable
 * @desc Variable that the Text is saved to.
 * Default 1
 * @default 1
 *
 * @param Max Characters
 * @desc Maximum number of Characters you can input.
 * Default 16
 * @default 16
 * 
 * @param Use Image
 * @desc to use image or not.
 * Default false
 * @default false
 *
 * @param Image Name
 * @desc The Name of the image in /img/pictures  without the .png
 * Default ClipComputer
 * @default ClipComputer
 *
 * @param Default Header
 * @desc The Default name of the Input Window. 
   Place "" around the text.
 * default "This is a Input Window"
 * @default "This is a Input Window"
 * 
 * @param Default InputText
 * @desc The Default text for the Input Bar.
 * Place "" around the text.
 * default "InputText"
 * @default "InputText"
 * @help Use Plugin Command: input_command <VariableNumber> <MaxCharacters> <useimg> [ImageName] <InputWindowName> <InputDefaultext>
 * Example: input_command 1 12 true ClipComputer This_is_an_Input_Window Test
 * or input_command 1 12 false This_is_an_Input_Window test  
 *
 */

var CommandInput = CommandInput || {};
CommandInput.DefaultParameters = PluginManager.parameters('CommandInput');
CommandInput.Parameters = CommandInput.Parameters || {};

var Imported = Imported || {};
Imported.CommandInput = '0.0.2';

(function() {
    "use strict";

    var old_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(pluginCommand, args) {
        old_pluginCommand.call(this, pluginCommand, args);
        if (pluginCommand === 'interact') {
            CommandInput.Parameters.CommandDisplay.length = args[0];
            CommandInput.Parameters.CommandDisplay.defaultString = args[1];
            CommandInput.Parameters.Portrait.x = args[2];
            CommandInput.Parameters.Portrait.y = args[3];
            CommandInput.Parameters.Portrait.width = args[4];
            CommandInput.Parameters.Portrait.height = args[5];
            CommandInput.Parameters.Portrait.path = args[6];
            CommandInput.Parameters.Dialogue.x = args[7];
            CommandInput.Parameters.Dialogue.y = args[8];
            CommandInput.Parameters.Dialogue.lineLength = args[9];
            CommandInput.Parameters.Dialogue.dialogue = args[10];

            SceneManager.push(SceneCommandInput);
        }
    };


    //------------------------------------------------------------------------
    //SceneCommandInput
    // Creates the Command Input Scene
    //------------------------------------------------------------------------

    function SceneCommandInput(){
        this.initialize.apply(this, arguments);
    }

    //Constructors
    SceneCommandInput.prototype = Object.create(Scene_MenuBase.prototype);
    SceneCommandInput.prototype.constructor = SceneCommandInput;

    SceneCommandInput.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    SceneCommandInput.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandDisplayWindow();
        this.createKeywordBankWindow();
        this.createCommandInputWindow();
        this.createObjectPortraitWindow();
        this.createObjectDialogueWindow();
    };

    SceneCommandInput.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this.m_commandDisplayWindow.refresh();
    };

    SceneCommandInput.prototype.createCommandDisplayWindow = function() {
        this.m_commandDisplayWindow = new WindowCommandDisplay(CommandInput.Parameters.CommandDisplay.length, CommandInput.Parameters.CommandDisplay.defaultString);
        this.addWindow(this.m_commandDisplayWindow);
    };

    SceneCommandInput.prototype.createKeywordBankWindow = function() {
        this.m_keywordBankWindow = new KeywordBankWindow();
        this.addWindow(this.m_keywordBankWindow);
    };

    SceneCommandInput.prototype.createCommandInputWindow = function() {
        this.m_commandInputWindow = new WindowCommandInput(this.m_commandDisplayWindow, this.m_keywordBankWindow);
        this.m_commandInputWindow.setHandler('ok', this.commandInputComplete.bind(this));
        this.addWindow(this.m_commandInputWindow);
    };

    SceneCommandInput.prototype.createObjectPortraitWindow = function() {
        this.m_objectPortraitWindow = new WindowObjectPortrait(CommandInput.Parameters.Portrait.x, CommandInput.Parameters.Portrait.y,
            CommandInput.Parameters.Portrait.width, CommandInput.Parameters.Portrait.height, CommandInput.Parameters.Portrait.path);
        this.addWindow(this.m_objectPortraitWindow);
    };

    SceneCommandInput.prototype.createObjectDialogueWindow = function() {
        this.m_objectDialogueWindow = new WindowObjectDialogue(CommandInput.Parameters.Dialogue.x, CommandInput.Parameters.Dialogue.y,
            CommandInput.Parameters.Dialogue.lineLength, CommandInput.Parameters.Dialogue.dialogue);
        this.addWindow(this.m_objectDialogueWindow);
    };

    SceneCommandInput.prototype.commandInputComplete = function() {
        var str = this.m_commandDisplayWindow.finaltext();
        var re = new RegExp(str, "i");
        $gameVariables.setValue(CommandInput.Parameters.varId, re.source);
        this.popScene();
    };

    //-----------------------------------------------------------------------------
    // WindowCommandDisplay
    //
    // The window for editing the Text on the input screen.

    function WindowCommandDisplay(maxLength, defaultCommandString) {
        this.initialize.apply(this, maxLength, defaultCommandString);
    }

    WindowCommandDisplay.prototype = Object.create(Window_Base.prototype);
    WindowCommandDisplay.prototype.constructor = WindowCommandDisplay;

    WindowCommandDisplay.prototype.initialize = function(maxLength, defaultText) {
        this.m_maxLength = maxLength;
        this.m_defaultText = defaultText;
        this.m_text = this.m_defaultText.slice(0, maxLength);

        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = (Graphics.boxWidth - width) / 2;
        var y = (Graphics.boxHeight - (height + this.fittingHeight(8) + 8)) / 2;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        
        console.log(this.m_text);
        this.activate();
        this.refresh();
    };

    WindowCommandDisplay.prototype.windowWidth = function() {
        return this.m_maxLength * 20 + 4;
    };

    WindowCommandDisplay.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    WindowCommandDisplay.prototype.finaltext = function() {
        console.log(this.m_text);
        return this.m_text;
    };

    WindowCommandDisplay.prototype.index = function() {
        return this.m_text.length;
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
        this.drawText(this._text[index] || '', rect.x, rect.y);
    };

    WindowCommandDisplay.prototype.refresh = function() {
        this.contents.clear();
        console.log(m_text);
        this.drawTextEx(CommandInput.Param.defaultPromptText.slice(9), (this.left() + 10), this.lineHeight() - 25);
        for (var i = 0; i < this.m_maxLength; i++) {
            this.drawUnderline(i);
        }
        for (var j = 0; j < this.index(); j++) {
            this.drawChar(j);
        }
        var rect = this.itemRect(this.index());
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };

    //-----------------------------------------------------------------------------
    // WindowCommandInput
    //
    // The window for selecting text characters on the input screen.

    function WindowCommandInput() {
        this.initialize.apply(this, arguments);
    }

    WindowCommandInput.prototype = Object.create(Window_Selectable.prototype);
    WindowCommandInput.prototype.constructor = WindowCommandInput;
    WindowCommandInput.LATIN =
        [ 'A','B','C','D','E',
            'F','G','H','I','J',
            'K','L','M','N','O',
            'P','Q','R','S','T',
            'U','V','W','X','Y',
            'Z','0','1','2','3',
            '4','5','6','7','8',
            '9',' ',' ',' ','Ok'];

    WindowCommandInput.prototype.initialize = function(displayWindow, rowSize, colSize) {
        this.m_rowsize = rowSize;
        this.m_colsize = colSize;
    
        var width = this.m_rowsize * 48;
        var height = this.windowHeight();
        var x = (Graphics.boxWidth - width) / 2;
        var y = displayWindow.y + displayWindow.height + 8;
        
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.m_displayWindow = displayWindow;
        this.m_index = 0;
        this.refresh();
        this.updateCursor();
        this.activate();
    };

    WindowCommandInput.prototype.windowHeight = function() {
        return this.fittingHeight(this.m_colsize);
    };
    
    WindowCommandInput.prototype.table = function() {
        return [WindowCommandInput.LATIN];
    };

    WindowCommandInput.prototype.maxCols = function() {
        return this.m_rowsize;
    };

    WindowCommandInput.prototype.maxItems = function() {
        return this.m_rowsize * this.m_colsize;
    };

    WindowCommandInput.prototype.character = function() {
        return this.m_index < this.maxItems() - 1 ? this.table()[this.m_index] : '';
    };

    WindowCommandInput.prototype.itemRect = function(index) {
        return {
            x: index % this.m_rowsize * 42 + Math.floor(index % this.m_rowsize / 5) * 24,
            y: Math.floor(index / this.m_rowsize) * this.lineHeight(),
            width: 36,
            height: this.lineHeight()
        };
    };

    WindowCommandInput.prototype.refresh = function() {
        var table = this.table();
        this.contents.clear();
        this.resetTextColor();
        for (var i = 0; i < this.maxItems(); i++) {
            var rect = this.itemRect(i);
            rect.x += 3;
            rect.width -= 6;
            this.drawText(this.table()[i], rect.x, rect.y, rect.width, 'center');
        }
    };

    WindowCommandInput.prototype.updateCursor = function() {
        var rect = this.itemRect(this.m_index);
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };

    WindowCommandInput.prototype.cursorDown = function(wrap) {
        if (this.m_index < this.maxItems() - this.m_rowsize + 1 || wrap) {
            this.m_index = (this.m_index + this.m_rowsize) % this.maxItems();
        }
    };

    WindowCommandInput.prototype.cursorUp = function(wrap) {
        if (this.m_index >= this.m_rowsize)
            this.m_index -= this.m_rowsize;
        else
            this.m_index += this.maxItems() - this.m_rowsize;
    };

    WindowCommandInput.prototype.cursorRight = function(wrap) {
        if (this.m_index % this.m_rowsize < this.m_rowsize - 1) {
            this._index++;
        } 
        else if (wrap) {
            this.m_index -= this.m_rowsize - 1;
        }
    };
    
    WindowCommandInput.prototype.cursorLeft = function(wrap) {
        if (this.m_index % this.m_rowsize > 0) {
            this.m_index--;
        } 
        else if (wrap) {
            this.m_index += this.m_rowsize - 1;
        }
    };

    WindowCommandInput.prototype.processCursorMove = function() {
        Window_Selectable.prototype.processCursorMove.call(this);
        this.updateCursor();
    };

    WindowCommandInput.prototype.processHandling = function () {
        if (this.isOpen() && this.active) {
            if (Imported.Quasi_Input || Imported.QInput) {
                console.log("This is printed out!")
                if (Input.isTriggered('#enter')) {
                    this.onTextOk();
                    return;
                }
                if (Input.isTriggered('#space')) {
                    this.processOk();
                    return;
                }
                if (Input.anyTriggered("a-z0-9")) {
                    this.m_displayWindow.pushBack(Input._lastPressed);
                }
                if (Input.isRepeated('#backspace')) {
                    this.processBack();
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

    WindowCommandInput.prototype.isCancelEnabled = function() {
        return true;
    };

    WindowCommandInput.prototype.processCancel = function() {
        this.processBack();
    };

    WindowCommandInput.prototype.processJump = function() {
        if (this.m_index !== 89) {
            this.m_index = 89;
            SoundManager.playCursor();
        }
    };

    WindowCommandInput.prototype.processOk = function() {
        if (this.character()) {
            this.onTextAdd();
        } else if (this.isOk()) {
            this.onTextOk();
        }
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

    function WindowObjectPortrait() {
        this.initialize.apply(this, arguments);
    }

    WindowObjectPortrait.prototype = Object.create(Window_Base.prototype);
    WindowObjectPortrait.prototype.constructor = WindowObjectPortrait;

    WindowObjectPortrait.prototype.initialize = function(x, y, width, height, portraitPath) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.m_portraitPath = portraitPath;
        this.activate();
        this.refresh();
    };

    WindowObjectPortrait.prototype.refresh = function (){
        this.contents.clear();
        var bitmap = ImageManager.loadPicture(this.m_portraitPath);
        this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, 0, 0, this.width, this.height);
    };

    //-----------------------------------------------------------------------------
    // WindowObjectDialogue
    //
    // The window for displaying dialogue.

    function WindowObjectDialogue() {
        this.initialize.apply(this, arguments);
    }

    WindowObjectDialogue.prototype = Object.create(Window_Base.prototype);
    WindowObjectDialogue.prototype.constructor = WindowObjectDialogue;

    WindowObjectDialogue.prototype.initialize = function(x, y, lineLength, dialogue) {
        this.m_lineLength = lineLength;
        this.m_lineAmount = dialogue.length() / lineLength;
        this.m_dialogue = dialogue;
        Window_Base.prototype.initialize.call(this, x, y, this.getWindowWidth(), this.getWindowHeight());
        this.activate();
        this.refresh();
    };

    WindowObjectDialogue.prototype.refresh = function (){
        this.contents.clear();
        this.drawText(this.m_dialogue, this.x, this.y, this.getWindowWidth());
    };

    WindowObjectDialogue.prototype.getWindowWidth = function() {
        return this.m_lineLength * this.charWidth();
    };

    WindowObjectDialogue.prototype.getWindowHeight = function() {
        return this.fittingHeight(this.m_lineAmount);
    };

    WindowObjectDialogue.prototype.charWidth = function() {
        var text = $gameSystem.isJapanese() ? '\uff21' : 'A';
        return this.textWidth(text);
    };
})();