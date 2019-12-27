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
 * default "This is a Imput Window"
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
Imported.CommandInput = true;

(function() {
    "use strict";

    var old_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(pluginCommand, args) {
        old_pluginCommand.call(this, pluginCommand, args);
        if (pluginCommand === 'input_command') {
            if (args.length === 1){

            }
            else{

            }
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
    };

    SceneCommandInput.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this.m_commandDisplayWindow.refresh();
    };

    SceneCommandInput.prototype.createCommandDisplayWindow = function() {
        this.m_commandDisplayWindow = new WindowCommandDisplay();
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

    SceneCommandInput.prototype.commandInputComplete = function() {
        var str = this.m_commandDisplayWindow.finaltext();
        var re = new RegExp(str, "i");
        $gameVariables.setValue(Darkkitten.Param.varId, re.source);	
        Darkkitten.Param.defaultPromptText = '';
        this.popScene();
    };

    //-----------------------------------------------------------------------------
    // Window_TextEdit
    //
    // The window for editing the Text on the input screen.

    function WindowCommandDisplay(maxLength, defaultText) {
        this.initialize.apply(this, [maxLength, defaultText]);
    }

    WindowCommandDisplay.prototype = Object.create(Window_Base.prototype);
    WindowCommandDisplay.prototype.constructor = WindowCommandDisplay;

    WindowCommandDisplay.prototype.initialize = function(arguments) {
        this.m_maxLength = arguments[0];
        this.m_defaultText = arguments[1];
        this.m_text = this.m_defaultText.slice(0, arguments[0]);
        this.m_index = this.m_text.length;

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

    WindowCommandDisplay.prototype.add = function(ch) {
        if (this.m_index < this.m_maxLength) {
            this.m_text += ch;
            this.m_index++;
            this.refresh();
            return true;
        } 
        else {
            return false;
        }
    };

    WindowCommandDisplay.prototype.back = function() {
        if (this.m_index > 0) {
            this.m_index--;
            this.m_text = this.m_text.slice(0, this.m_index);
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

    Window_TextEdit.prototype.refresh = function() {
        this.contents.clear();
        switch(CommandInput.Param.Def.toLowerCase())
        {
            case "true":
                if (CommandInput.Param.UseImage === "true"){
                    var bitmap = ImageManager.loadPicture(CommandInput.Param.defImage);
                    this.contents.blt(bitmap, 0 , 0, bitmap._canvas.width, bitmap._canvas.height, 10, 0, 144, 144);
                    console.log(m_text);
                    this.drawTextEx(CommandInput.Param.defaultPromptText.slice(9), (this.left() + 10), this.lineHeight() - 25);
                    for (var i = 0; i < CommandInput.Param.maxLength; i++) {
                    this.drawUnderline(i);
                       }
                    for (var j = 0; j < this._text.length; j++) {
                           this.drawChar(j);
                      }
                           var rect = this.itemRect(this._index);
                        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);	
                }
                else
                {
                    //this.drawTextEx(CommandInput.Param.defaultPromptText.slice(9), 0, this.lineHeight() - 25);
                    this.drawTextEx(CommandInput.Param.defaultPromptText, 0, this.lineHeight() - 25)
                    for (var i = 0; i < CommandInput.Param.maxLength; i++) {
                    this.drawUnderline(i);
                       }
                    for (var j = 0; j < this._text.length; j++) {
                           this.drawChar(j);
                      }
                           var rect = this.itemRect(this._index);
                        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
                }
            break;
            case "false":
                if (CommandInput.Param.UseImage === "true")
                {
                    var bitmap = ImageManager.loadPicture(CommandInput.Param.defImage);
                    this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, 10, 0, 144, 144);
                    this.drawTextEx(CommandInput.Param.defaultPromptText.slice(9), (this.left() + 10), this.lineHeight() - 25);
                        for (var i = 0; i < CommandInput.Param.maxLength; i++) {
                         this.drawUnderline(i);
                     }
                        for (var j = 0; j < this._text.length; j++) {
                        this.drawChar(j);
                        }
                    var rect = this.itemRect(this._index);
                    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
                }
                else 
            {
            //this.drawTextEx(CommandInput.Param.defaultPromptText.slice(9), 0, this.lineHeight() - 25);
            this.drawTextEx(CommandInput.Param.defaultPromptText, 0, this.lineHeight() - 25)
                        for (var i = 0; i < CommandInput.Param.maxLength; i++) {
                         this.drawUnderline(i);
                     }
                        for (var j = 0; j < this._text.length; j++) {
                        this.drawChar(j);
                        }
                    var rect = this.itemRect(this._index);
                    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
            }
            break;
                }
    };
})();









//-----------------------------------------------------------------------------
// Window_TextInput
//
// The window for selecting text characters on the input screen.

function Window_TextInput() {
    this.initialize.apply(this, arguments);
}

Window_TextInput.prototype = Object.create(Window_Selectable.prototype);
Window_TextInput.prototype.constructor = Window_TextInput;
Window_TextInput.LATIN1 =
        [ 'A','B','C','D','E',
          'F','G','H','I','J',
          'K','L','M','N','O',
          'P','Q','R','S','T',
          'U','V','W','X','Y',
          'Z','0','1','2','3',
          '4','5','6','7','8',
          '9',' ',' ',' ','Ok'];

Window_TextInput.prototype.initialize = function(editWindow) {
    this._rowsize = 5;
    this._colsize = 8;

    var width = this._rowsize * 48;
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2;
    var y = editWindow.y + editWindow.height + 8;
    
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._editWindow = editWindow;
    this._page = 0;
    this._index = 0;
    this.refresh();
    this.updateCursor();
    this.activate();
};

Window_TextInput.prototype.windowHeight = function() {
    return this.fittingHeight(this._colsize);
};

Window_TextInput.prototype.table = function() {
    return [Window_TextInput.LATIN1];
};

Window_TextInput.prototype.maxCols = function() {
    return this._rowsize;
};

Window_TextInput.prototype.maxItems = function() {
    return this._rowsize * this._colsize;
};

Window_TextInput.prototype.character = function() {
    return this._index < this.maxItems() - 1 ? this.table()[this._page][this._index] : '';
};

Window_TextInput.prototype.isPageChange = function() {
    false;
};

Window_TextInput.prototype.isOk = function() {
    return this._index === this.maxItems() - 1;
};

Window_TextInput.prototype.itemRect = function(index) {
    return {
        x: index % this._rowsize * 42 + Math.floor(index % this._rowsize / 5) * 24,
        y: Math.floor(index / this._rowsize) * this.lineHeight(),
        width: 36,
        height: this.lineHeight()
    };
};

Window_TextInput.prototype.refresh = function() {
    var table = this.table();
    this.contents.clear();
    this.resetTextColor();
    for (var i = 0; i < this.maxItems(); i++) {
        var rect = this.itemRect(i);
        rect.x += 3;
        rect.width -= 6;
        this.drawText(table[this._page][i], rect.x, rect.y, rect.width, 'center');
    }
};

Window_TextInput.prototype.updateCursor = function() {
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_TextInput.prototype.isCursorMovable = function() {
    return this.active;
};

Window_TextInput.prototype.cursorDown = function(wrap) {
    if (this._index < this.maxItems() - this._rowsize + 1 || wrap) {
        this._index = (this._index + this._rowsize) % this.maxItems();
    }
};

Window_TextInput.prototype.cursorUp = function(wrap) {
    if (this._index >= this._rowsize)
        this._index -= this._rowsize;
    else
        this._index += this.maxItems() - this._rowsize;
};

Window_TextInput.prototype.cursorRight = function(wrap) {
    if (this._index % this._rowsize < this._rowsize - 1) {
        this._index++;
    } else if (wrap) {
        this._index -= this._rowsize - 1;
    }
};

Window_TextInput.prototype.cursorLeft = function(wrap) {
    if (this._index % this._rowsize > 0) {
        this._index--;
    } else if (wrap) {
        this._index += this._rowsize - 1;
    }
};

Window_TextInput.prototype.cursorPagedown = function() {
    this._page = (this._page + 1) % this.table().length;
    this.refresh();
};

Window_TextInput.prototype.cursorPageup = function() {
    this._page = (this._page + this.table().length - 1) % this.table().length;
    this.refresh();
};

Window_TextInput.prototype.processCursorMove = function() {
    var lastPage = this._page;
    Window_Selectable.prototype.processCursorMove.call(this);
    this.updateCursor();
    if (this._page !== lastPage) {
        SoundManager.playCursor();
    }
};

Window_TextInput.prototype.processHandling = function () {
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
                this._editWindow.add(Input._lastPressed);
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

Window_TextInput.prototype.isCancelEnabled = function() {
    return true;
};

Window_TextInput.prototype.processCancel = function() {
    this.processBack();
};

Window_TextInput.prototype.processJump = function() {
    if (this._index !== 89) {
        this._index = 89;
        SoundManager.playCursor();
    }
};

Window_TextInput.prototype.processBack = function() {
    if (this._editWindow.back()) {
        SoundManager.playCancel();
    }
};

Window_TextInput.prototype.processOk = function() {
    if (this.character()) {
        this.onTextAdd();
    } else if (this.isPageChange()) {
        SoundManager.playOk();
        this.cursorPagedown();
    } else if (this.isOk()) {
        this.onTextOk();
    }
};

Window_TextInput.prototype.onTextAdd = function() {
    if (this._editWindow.add(this.character())) {
        SoundManager.playOk();
    } else {
        SoundManager.playBuzzer();
    }
};

Window_TextInput.prototype.onTextOk = function() {
    if (this._editWindow.finaltext() === '') {
        SoundManager.playBuzzer();
    } else {
        SoundManager.playOk();
    }
    this.callOkHandler();
};