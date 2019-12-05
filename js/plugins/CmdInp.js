//=============================================================================
// CmdInp.js
//=============================================================================

/*:
 * @plugindesc v1.1.2 CmdInp Enables a Command Input system.
 * @author Darkkitten
 *
 * @param Text Variable
 * @desc Variable that the Text is saved to.
 * Default 1
 * @default 1
 *
 * @param Max Characters
 * @desc Maximum number of Characters you can input.
 * Default 12
 * @default 12
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
 * @help Use Plugin Command: enter_text <VariableNumber> <MaxCharacters> <useimg> [ImageName] <InputWindowName> <InputDefaultext>
 * Example: enter_text 1 12 true ClipComputer This_is_an_Input_Window Test
 * or enter_text 1 12 false This_is_an_Input_Window test  
 *
 */

var Darkkitten = Darkkitten || {};
Darkkitten.Parameters = PluginManager.parameters('CmdInp');
Darkkitten.Param = Darkkitten.Param || {};

var Imported = Imported || {};
Imported.CmdInp = true;

//Darkkitten.Param.UseImage = Darkkitten.Parameters['Use Image'];

//Get Plugin Command Variables if not default.
var getInformation_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    getInformation_pluginCommand.call(this, command, args);
    if (command === "enter_text") {
        if(args.length == 1){
        	//This uses command arguments.
			Darkkitten.Param.varId = 1;
			Darkkitten.Param.maxLength = 12;
			Darkkitten.Param.Def = "false";
            Darkkitten.Param.UseImage = Number(0);
			//Check if you have the script to enable images and if true then set it.
			if (Darkkitten.Param.UseImage === "true")
			{
                for (i=3,j=4,k=5; i < args.length, j < args.length, k < args.length; i++, j++, k++){
                    Darkkitten.Param.defImage = args[i].toString(); + " ";
                    Darkkitten.Param.defaultPromptText = args[j].toString()+ " ";
                    Darkkitten.Param.defaultInputText = args[k].toString()+ " ";
                }
			}
			//this is when Use Image is false.
			else {	
                for (i=3,j=4; i < args.length, j < args.length; i++, j++) {
                    Darkkitten.Param.defaultPromptText = args[i].toString()+ " ";
                    Darkkitten.Param.defaultInputText = args[j].toString()+ " ";

                }
			}
				SceneManager.push(Scene_Input);
			}
			else{
				Darkkitten.Param.varId = Number(Darkkitten.Parameters['Text Variable']);
				Darkkitten.Param.maxLength = Number(Darkkitten.Parameters['Max Characters']);
				Darkkitten.Param.defaultPromptText = String(Darkkitten.Parameters['Default Header']);
                //Darkkitten.Param.defaultInputText = String(Darkkitten.Parameters['Default InputText']);
                Darkkitten.Param.defaultInputText = String($dataActionKeywords[1].display);
				if (Darkkitten.Param.UseImage === "true")
				{
					Darkkitten.Param.defImage = Darkkitten.Parameters['Image Name'];
				} 
				Darkkitten.Param.Def = "true";
				SceneManager.push(Scene_Input);
			}
      }
};

//------------------------------------------------------------------------
//Scene_Input
// Creates the Input Scene..
//------------------------------------------------------------------------

function Scene_Input(){
    this.initialize.apply(this, arguments);
}

var varId = Darkkitten.Param.varId;
var maxLength = Darkkitten.Param.maxLength;
var defaultPromptText = Darkkitten.Param.defaultPromptText;

//Constructors
Scene_Input.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Input.prototype.constructor = Scene_Input;

Scene_Input.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Input.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.CEW();
    this.CIW();
};

Scene_Input.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._editTextWindow.refresh();
};

Scene_Input.prototype.CEW = function() {
	  this._editTextWindow = new Window_TextEdit();
	  this.addWindow(this._editTextWindow);
};

Scene_Input.prototype.CIW = function() {
	  this._inputTextWindow = new Window_TextInput(this._editTextWindow);
	  this._inputTextWindow.setHandler('ok', this.onThatsJustFine.bind(this));
	  this.addWindow(this._inputTextWindow);
};

Scene_Input.prototype.onThatsJustFine = function() {
	var str = this._editTextWindow.finaltext();
	var re = new RegExp(str, "i");
	$gameVariables.setValue(Darkkitten.Param.varId, re.source);	
	Darkkitten.Param.defaultPromptText = '';
	this.popScene();
};

//-----------------------------------------------------------------------------
// Window_TextEdit
//
// The window for editing the Text on the input screen.

function Window_TextEdit() {
    this.initialize.apply(this, arguments);
}

Window_TextEdit.prototype = Object.create(Window_Base.prototype);
Window_TextEdit.prototype.constructor = Window_TextEdit;

Window_TextEdit.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2;
    var y = (Graphics.boxHeight - (height + this.fittingHeight(8) + 8)) / 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.defaultText = Darkkitten.Param.defaultInputText;
    if (this.defaultText === null)
    {
		this.defaultText = $gameVariables[Darkkitten.Param.varId];
    }
    this._text = this.defaultText.slice(0, Darkkitten.Param.maxLength);
    console.log(this._text);
    this._index = this._text.length;
    this.activate();
    this.refresh();
};

Window_TextEdit.prototype.windowWidth = function() {
    return Darkkitten.Param.maxLength * 20 + 4;
};

Window_TextEdit.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_TextEdit.prototype.finaltext = function() {
      console.log(this._text);
    return this._text;
};

Window_TextEdit.prototype.restoreDefault = function() {
    var _text = this.defaultText;
    this._index = this._text.length;
    this.refresh();
    console.log(this._text +" "+this.defaultText);
    return this._text.length > 0;
};

Window_TextEdit.prototype.add = function(ch) {
	var maxLength = Darkkitten.Parameters.maxLength;
    if (this._index < Darkkitten.Param.maxLength) {
        this._text += ch;
        this._index++;
        this.refresh();
        return true;
    } else {
        return false;
    }
};

Window_TextEdit.prototype.back = function() {
    if (this._index > 0) {
        this._index--;
        this._text = this._text.slice(0, this._index);
        this.refresh();
        return true;
    } else {
        return false;
    }
};

 Window_TextEdit.prototype.charWidth = function() {
     var text = $gameSystem.isJapanese() ? '\uff21' : 'A';
    return this.textWidth(text);
 };


Window_TextEdit.prototype.left = function() {
	var  textCenter = (this.contentsWidth() + this.DefaultTextWidth()) / 2;
	var textWidth = (Darkkitten.Param.maxLength + 2) * this.charWidth();
     return Math.min(textCenter - textWidth / 2, this.contentsWidth() - textWidth);
};

Window_TextEdit.prototype.DefaultTextWidth = function(){
	return (Darkkitten.Param.maxLength + 40);
};

Window_TextEdit.prototype.itemRect = function(index) {
    return {
        x: index * this.charWidth() + (index * 4),
        y: 0,
        width: this.charWidth(),
        height: this.lineHeight()
    };
};

Window_TextEdit.prototype.underlineRect = function(index) {
    var rect = this.itemRect(index);
    rect.y += rect.height - 4;
    rect.height = 2;
    rect.width += 2;
    rect.x -= 1;
    return rect;
};

Window_TextEdit.prototype.underlineColor = function() {
    return this.normalColor();
};

Window_TextEdit.prototype.drawUnderline = function(index) {
    var rect = this.underlineRect(index);
    var color = this.underlineColor();
    this.contents.paintOpacity = 48;
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.contents.paintOpacity = 255;
};

Window_TextEdit.prototype.drawChar = function(index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.drawText(this._text[index] || '', rect.x, rect.y);
};

Window_TextEdit.prototype.refresh = function() {
  this.contents.clear();
    
    switch(Darkkitten.Param.Def.toLowerCase())
    {
		case "true":
			if (Darkkitten.Param.UseImage === "true")
			{
			
				var bitmap = ImageManager.loadPicture(Darkkitten.Param.defImage);
				this.contents.blt(bitmap, 0 , 0, bitmap._canvas.width, bitmap._canvas.height, 10, 0, 144, 144);
			  console.log(_text);
				this.drawTextEx(Darkkitten.Param.defaultPromptText.slice(9), (this.left() + 10), this.lineHeight() - 25);
    			for (var i = 0; i < Darkkitten.Param.maxLength; i++) {
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
				//this.drawTextEx(Darkkitten.Param.defaultPromptText.slice(9), 0, this.lineHeight() - 25);
                this.drawTextEx(Darkkitten.Param.defaultPromptText, 0, this.lineHeight() - 25)
    			for (var i = 0; i < Darkkitten.Param.maxLength; i++) {
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
			if (Darkkitten.Param.UseImage === "true")
			{
				var bitmap = ImageManager.loadPicture(Darkkitten.Param.defImage);
				this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, 10, 0, 144, 144);
				this.drawTextEx(Darkkitten.Param.defaultPromptText.slice(9), (this.left() + 10), this.lineHeight() - 25);
   			 	for (var i = 0; i < Darkkitten.Param.maxLength; i++) {
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
        //this.drawTextEx(Darkkitten.Param.defaultPromptText.slice(9), 0, this.lineHeight() - 25);
        this.drawTextEx(Darkkitten.Param.defaultPromptText, 0, this.lineHeight() - 25)
   			 	for (var i = 0; i < Darkkitten.Param.maxLength; i++) {
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