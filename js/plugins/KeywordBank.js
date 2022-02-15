//=============================================================================
// KeywordBank.js
//=============================================================================

/*:
 * @plugindesc v0.0.2 KeywordBank that allows searching, locking, unlocking, filtering, etc.
 * @author Atlas
 *
 * @param Database
 * @parent Settings
 * @type struct<KeywordGroup>[]
 * @desc Add groups 
 * @help Use Plugin Command: keywordbank <command> <arg1> <arg2>
 * Example: keywordbank unlock action talk
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
 * @desc Description of this keyword.
 * @param locked
 * @type boolean
 * @desc Does the keyword need to be unlocked?
 * @param alias
 * @type string[]
 * @desc Words that can be used in place of
 */

var Imported = Imported || {};
var KeywordBank = KeywordBank || {};
KeywordBank.Alias = KeywordBank.Alias || {};

(function() {
    "use strict";
    KeywordBank.KeywordGroups = KeywordBank.KeywordGroups || {};
    KeywordBank.Params = KeywordBank.Params || {}; 

    KeywordBank.Params = PluginManager.parameters('KeywordBank');

    KeywordBank.resetToDefault = function (){
        KeywordBank.KeywordGroups = {};
        if ((KeywordBank.Params['Database'])){
            var groups = JSON.parse(KeywordBank.Params['Database']);
            for (var i=0; i<groups.length; i++) {
                var group = JSON.parse(groups[i]);
                var realGroup = JSON.parse(group.group);
                KeywordBank.KeywordGroups[group.name] = {};
                for(var j = 0; j < realGroup.length; ++j){
                    var keyword = JSON.parse(realGroup[j]);
                    keyword.locked = keyword.locked === "true";
                    if (keyword.alias != "")
                        keyword.alias = JSON.parse(keyword.alias);
                    KeywordBank.KeywordGroups[group.name][keyword.name.toLowerCase()] = keyword;
                }
            }
        }
    };

    KeywordBank.exists = function (keyword, group){
        if (KeywordBank.KeywordGroups.hasOwnProperty(group))
            return KeywordBank.KeywordGroups[group].hasOwnProperty(keyword.toLowerCase());
        return false;
    }

    KeywordBank.unlock = function (keyword, group){
        if (KeywordBank.exists(keyword, group)){
            KeywordBank.KeywordGroups[group][keyword.toLowerCase()].locked = false;
            return true;
        }
        return false;
    };

    KeywordBank.lock = function (keyword, group){
        if (KeywordBank.exists(keyword, group)){
            KeywordBank.KeywordGroups[group][keyword.toLowerCase()].locked = true;
            return true;
        }
        return false;
    };

    KeywordBank.locked = function (keyword, group){
        if (KeywordBank.exists(keyword, group)){
            return KeywordBank.KeywordGroups[group][keyword.toLowerCase()].locked;
        }
        return true;
    }

    KeywordBank.getUnlockedKeywords = function (group){
        var unlockedKeywords = [];
        var keywordGroup = KeywordBank.KeywordGroups[group];
        if (keywordGroup){
            for(const keywordKey in keywordGroup){
                var keyword = keywordGroup[keywordKey];
                if (!keyword.locked)
                    unlockedKeywords.push(keyword.display);
            }
        }
        return unlockedKeywords;
    };

    KeywordBank.getUnlockedKeywordsFiltered = function (group, filter){
        var unlockedKeywords = [];
        filter = filter.toLowerCase();
        var keywordGroup = KeywordBank.KeywordGroups[group];
        if (keywordGroup){
            for(const keywordKey in keywordGroup){
                var keyword = keywordGroup[keywordKey]
                if (!keyword.locked){
                    if (keyword.name.startsWith(filter))
                        unlockedKeywords.push(keyword.display);
                    else{
                        for(const alias of keyword.alias){
                            if (alias.startsWith(filter)){
                                unlockedKeywords.push(keyword.display);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return unlockedKeywords;
    };

    KeywordBank.Alias.setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        KeywordBank.Alias.setupNewGame.call(this);
        KeywordBank.resetToDefault();
    };

    KeywordBank.Alias.pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(pluginCommand, args) {
        KeywordBank.Alias.pluginCommand.call(this, pluginCommand, args);
        if (pluginCommand === "keywordbank") {
            var command = args[0];
            switch(command)
            {
                case 'unlock': KeywordBank.unlock(args[1], args[2]); break;
                case 'lock': KeywordBank.lock(args[1], args[2]); break;
                case 'exists': KeywordBank.exists(args[1], args[2]); break;
                case 'locked': KeywordBank.locked(args[1], args[2]); break;
            }
        }
    };

    
    KeywordBank.save = function() {
        var savedata = {};
        
        // save just the locked status of each keyword
        for (var group in KeywordBank.KeywordGroups) {
            savedata[group] = {}
            for (var keyword in KeywordBank.KeywordGroups[group]) {
                savedata[group][keyword] = KeywordBank.KeywordGroups[group][keyword].locked;
            }
        }
        
        return savedata;
    }
    
    KeywordBank.load = function(savedata) {
        if (!KeywordBank.KeywordGroups)
            KeywordBank.resetToDefault();
        
        // update keyword bank from saved contents
        for (var group in KeywordBank.KeywordGroups) {
            if (savedata.hasOwnProperty(group)) {
                for (var keyword in KeywordBank.KeywordGroups[group]) {
                    if (savedata[group].hasOwnProperty(keyword)) {
                        var kwInfo = savedata[group][keyword];
                        if (typeof kwInfo === "boolean")
                            KeywordBank.KeywordGroups[group][keyword].locked = kwInfo;
                        else
                            KeywordBank.KeywordGroups[group][keyword].locked = kwInfo.locked;
                    }
                }
            }
        }
    }
    

    KeywordBank.Alias.makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = KeywordBank.Alias.makeSaveContents();
        contents.KeywordGroups = KeywordBank.save();
        return contents;
    };

    KeywordBank.Alias.extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        KeywordBank.Alias.extractSaveContents(contents);
        KeywordBank.load(contents.KeywordGroups);
    };
    
    
    KeywordBank.Alias.prepareNewGamePlusData = DataManager.prepareNewGamePlusData;
    DataManager.prepareNewGamePlusData = function() {
        KeywordBank.Alias.prepareNewGamePlusData();
        this._ngpData.KeywordGroups = KeywordBank.save();
    };
    
    KeywordBank.Alias.carryOverNewGamePlusPartyData = DataManager.carryOverNewGamePlusPartyData;
    DataManager.carryOverNewGamePlusPartyData = function() {
        KeywordBank.Alias.carryOverNewGamePlusPartyData();
        KeywordBank.load(this._ngpData.KeywordGroups);
    };
})();

Imported.KeywordBank = '0.0.2';