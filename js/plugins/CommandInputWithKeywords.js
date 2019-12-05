//=============================================================================
// CommandInputWithKeywords.js
//=============================================================================

/*:
 * @plugindesc v0.0.1 Command input system with keyword filtering/applying.
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
 * @param Default Header
 * @desc The Default name of the Input Window. 
   Place "" around the text.
 * default "Input a command"
 * @default "Input a command"
 * 
 * @param Default InputText
 * @desc The Default text for the Input Bar.
 * Place "" around the text.
 * default ""
 * @default ""
 * 
 * @help Use Plugin Command: input_command <VariableNumber> <MaxCharacters> <InputCommandHeader> <CommandDefaultText>
 * Example: input_command 1 16 This_is_an_Input_Window Test
 * or input_command 1
 *
 */

var Imported = Imported || {};
var AtlasMods = AtlasMods || {};

(function($) {
    "use strict";

    $.Parameters = PluginManager.parameters('CommandInputWithKeywords');
    $.Param = $.Param || {};

})();


AtlasMods.Parameters = PluginManager.parameters('CommandInputWithKeywords');
AtlasMods.Param = AtlasMods.Param || {};


Imported.CommandInputWithKeywords = 0.1;