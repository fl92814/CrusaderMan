//=============================================================================
// CodexUtil.js
//=============================================================================

var Imported = Imported || {};
Imported.CodexUtil = '0.0.2';

/*:
 * @plugindesc v0.0.2 CodexUtil helper functions for scripting
 * @author Rhaokiel
 * 
 * @help
 * Array.getRandom()           | Gets a random item from the specified array
 * String.capitalize()         | Capitalizes the first let of the specified string
 * Game_Message.wrapText(text) | Returns text that is wrapped to the current message box extent
 */

Array.prototype.getRandom = function() {
    return this[Math.floor(Math.random()*this.length)]
};
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
Game_Message.prototype.wrapText = function(text) {
    var scn = SceneManager._scene;
    if (scn instanceof Scene_Map || scn instanceof Scene_Battle) {
        var wnd = scn._messageWindow;
        var wrapX = wnd.contents.width - wnd.newLineX();
        var from = 0;
        var to = text.indexOf(' ', 1);
        if (to > 0)
            while (1) {
                var nxt = text.indexOf(' ', to + 1)
                if (nxt < 0)
                    return text;
                if (wnd.textWidth(wnd.convertEscapeCharacters(text.slice(from, nxt))) < wrapX)
                    to = nxt;
                else {
                    text = text.slice(0, to) + '\n' + text.slice(to+1);
                    from = to + 1;
                    to = nxt;
                }
            }
    }
    return text;
};