//=============================================================================
// ActionKeywords.js
//=============================================================================

/*:
 * @plugindesc v0.0.1 Command input system with keyword filtering/applying.
 * @author Atlas
 *
 * @param Action Keywords
 * @parent Settings
 * @type struct<actionKeywordStruct>[]
 * @desc Add action keywords to your game.
 * @default ["{\"Name\":\"Talk\",\"Description\":\"\\\"Avoid pits, traps, damage from long falls, balance on a\\\\nslippery surface or squeeze in tight spaces.\\\"\",\"Abbreviation\":\"acro\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Arcana\",\"Description\":\"\\\"Knowledge of the arcane, identify magical effects and \\\\ndecipher magical runes, tomes and scrolls.\\\"\",\"Abbreviation\":\"arca\",\"Class Proficiencies\":\"[\\\"3\\\"]\",\"Class Signatures\":\"[\\\"3\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Climb\",\"Description\":\"\\\"Your ability to climb ropes, vines, cliffs, city walls\\\\nor run up or down stairs without losing speed.\\\"\",\"Abbreviation\":\"clim\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[\\\"2\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Deception\",\"Description\":\"\\\"Fast-talk a guard, con a merchant, make money gambling, \\\\ndisguise yourself or convincingly tell a blatent lie.\\\"\",\"Abbreviation\":\"dece\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"3\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Disable Trap\",\"Description\":\"\\\"Disable traps on doors and treasure chest.\\\"\",\"Abbreviation\":\"disa\",\"Class Proficiencies\":\"[\\\"1\\\"]\",\"Class Signatures\":\"[\\\"1\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\"}","{\"Name\":\"History\",\"Description\":\"\\\"Recall lore about families, events, places and heraldry.\\\\nIdentify the cultural origins of people or objects.\\\"\",\"Abbreviation\":\"hist\",\"Class Proficiencies\":\"[\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Insight\",\"Description\":\"\\\"Identify when someone is being deceitful, notice when\\\\nbeing followed or understanding coded speech.\\\\n\\\"\",\"Abbreviation\":\"insi\",\"Class Proficiencies\":\"[\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Investigation\",\"Description\":\"\\\"Search for clues, gather information at a local tavern\\\\nor read someone's lips from across the room.\\\"\",\"Abbreviation\":\"inve\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"3\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Jump\",\"Description\":\"\\\"Jump across a wide chasm or high up to grab a window \\\\nsill.\\\"\",\"Abbreviation\":\"jump\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[\\\"2\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Lockpicking\",\"Description\":\"\\\"The ability to open locked doors and treasure chests.\\\"\",\"Abbreviation\":\"lock\",\"Class Proficiencies\":\"[\\\"1\\\"]\",\"Class Signatures\":\"[\\\"1\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Medicine\",\"Description\":\"\\\"Stablize a dying person, know how to utilze advanced\\\\nmedicine or diagnose a rare illness.\\\"\",\"Abbreviation\":\"medi\",\"Class Proficiencies\":\"[\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Nature\",\"Description\":\"\\\"Knowledge of animals, plants, terrain, weather, poisons\\\\nor survive in the wild.\\\"\",\"Abbreviation\":\"natu\",\"Class Proficiencies\":\"[\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Perception\",\"Description\":\"\\\"See or hear hidden threats, recognize someone far away,\\\\nfind minute details or identify a noise's source.\\\"\",\"Abbreviation\":\"perc\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Performance\",\"Description\":\"\\\"Sing, dance, tell a compelling story or deliver a good\\\\nspeech.\\\"\",\"Abbreviation\":\"perf\",\"Class Proficiencies\":\"[]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Persuasion\",\"Description\":\"\\\"Convince someone to do what you want, effectively \\\\ndebate, flatter or seduce another.\\\"\",\"Abbreviation\":\"pers\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"4\\\"]\",\"Class Signatures\":\"[\\\"4\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Religion\",\"Description\":\"\\\"Knowledge of lore/beliefs of faiths, deities and their\\\\nfollowers. Perform a ritual according to specification.\\\"\",\"Abbreviation\":\"reli\",\"Class Proficiencies\":\"[\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[\\\"4\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Sleight of Hand\",\"Description\":\"\\\"Pick somone's pocket, conceal belongings, make a coin\\\\nseem to disappear or gesture messages inconspicuously.\\\"\",\"Abbreviation\":\"slei\",\"Class Proficiencies\":\"[\\\"1\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Stealth\",\"Description\":\"\\\"Hide, move silently, blend in with a crowd or follow\\\\nsomeone without being noticed.\\\"\",\"Abbreviation\":\"stea\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Swim\",\"Description\":\"\\\"Swim through rough waters, hold your breath for a long\\\\ntime or possibly even keep pace with a marine creature.\\\"\",\"Abbreviation\":\"swim\",\"Class Proficiencies\":\"[\\\"2\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Alignment\",\"Description\":\"\\\"Actor's alignment on a scale of evil to good where 0 is \\\\ncompletely evil and 100 is a pinnacle of righteousness.\\\"\",\"Abbreviation\":\"alignment\",\"Class Proficiencies\":\"[]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"NONE\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"50\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}"]
 * 
 * @help Use Plugin Command: input_command <VariableNumber> <MaxCharacters> <InputCommandHeader> <CommandDefaultText>
 * Example: input_command 1 16 This_is_an_Input_Window Test
 * or input_command 1
 *
 */
/*~struct~actionKeywordStruct:
 * @param name
 * @type string
 * @desc the actual keyword
 * @param display
 * @type string
 * @desc How the keyword is displayed in a list
 * @param Description
 * @type string
 * @desc Description of this talent.
 * @param locked
 * @type boolean
 * @desc Does the keyword need to be unlocked?
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