//=============================================================================
// CodexUtil.js
//=============================================================================

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
        var wrapX = scn._messageWindow.newLineX()
        if (wrapX > 0) {
            var x = wrapX;
            while (text.length > x) {
                var i = text.lastIndexOf(' ', x);
                if (i <= 0)
                    i = text.indexOf(' ', x);
                if (i <= 0)
                    return text;
                text = text.slice(0, i) + '\n' + text.slice(i+1);
                x = i + wrapX;
            }   
        }
    }
    return text;
};