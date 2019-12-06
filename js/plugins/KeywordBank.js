//=============================================================================
// KeywordBank.js
//=============================================================================

/*:
 * @plugindesc v0.0.1 KeywordBank that allows searching, locking, unlocking, filtering, etc.
 * @author Atlas
 *
 * @param Database
 * @parent Settings
 * @type struct<KeywordGroup>[]
 * @desc Add groups 
 * @help Use Plugin Command: input_command <VariableNumber> <MaxCharacters> <InputCommandHeader> <CommandDefaultText>
 * Example: input_command 1 16 This_is_an_Input_Window Test
 * or input_command 1
 *
 */

/*~struct~KeywordGroup:
 * @param name
 * @type string
 * @param group
 * @type struct<Keyword>[]
 * @desc Group of keywords, with a name attached
 */

/*~struct~Keyword:
 * @param name
 * @type string
 * @desc the actual keyword
 * @param display
 * @type string
 * @desc How the keyword is displayed in a list
 * @param description
 * @type string
 * @desc Description of this talent.
 * @param locked
 * @type boolean
 * @desc Does the keyword need to be unlocked?
 * @param alias
 * @type string[]
 * @desc Words that can be used in place of
 */

var Imported = Imported || {};
var ActionKeywords = ActionKeywords || {};

var $keywordList = {};

(function($) {
    "use strict";
    
    $.Parameters = PluginManager.parameters('ActionKeywords');
    $.Param = $.Param || {};

    if ((PluginManager.parameters('ActionKeywords')['Action Keywords']))
    {
        var list = JSON.parse(PluginManager.parameters('ActionKeywords')['Action Keywords']);
        for (var i=0; i<list.length; i++) {
            var keyword = JSON.parse(list[i]);
            keyword.locked = keyword.locked === "true";
            $keywordList[i] = keyword;
        }
    }

    var Old_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = Old_DataManager_makeSaveContents();
        contents.actionKeywords = $.KeywordList;
        console.log($keywordList);
        return contents;
    };


    var Old_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        $.KeywordList = contents.actionKeywords;
        console.log($keywordList);
        Old_DataManager_extractSaveContents(contents);
    };
})(ActionKeywords);

Imported.ActionKeywords = 0.1;