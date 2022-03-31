//=============================================================================
// MusicLover.js
//=============================================================================

var Imported = Imported || {};
Imported.MusicLover = '0.0.1';

/*:
 * @plugindesc v0.0.1 MusicLover performance scripts
 * @author Rhaokiel
 * 
 * @help
 * ============================================================================
 * Event Notetags
 *
 * Add <MusicLover> tag to event to include them in the potential listener pool.
 *
 * <MusicLover Pages:#,#,#,..>
 * Sets only the specified pages as possible listeners.
 * 
 * <MusicLover Unique:##>
 * Sets the listener to activate the specified unique script after the performance finishes.
 * 
 * <MusicLover Song(##)Tip:##>
 * Sets the tip multiplier for a given song. More than 1 is considered favorite, less than 1 is annoyed.
 *
 * ============================================================================
 * Script Functions
 *
 * MusicLover.forEachListener(function(evData, evMap, args) { ... });
 * 
 */
 
var MusicLover = MusicLover || {};

MusicLover.forEachListener = function(action) {
  thisEvent:
    for (ei in $dataMap.events) {
        var evData = $dataMap.events[ei];
        if (evData && evData.note) {
            var match = evData.note.match(/<MusicLover(?:\s(.+))?>/i);
            var evMap = $gameMap.event(evData.id);
            if (match && Math.abs(evMap.x - $gamePlayer.x) <= 3 && Math.abs(evMap.y - $gamePlayer.y) <= 3) {
                if (match[1]) {
                    var args = match[1].split(/\s+/);
                  procArgs:
                    for (a in args) {
                        match = args[a].match(/^Pages?:([0-9]+)((?:,[0-9]+)+)?$/i);
                        if (match) { // has required pages defined
                            var pg = evMap._pageIndex + 1;
                            if (pg == match[1])
                                break procArgs;
                            if (match[2]) {
                                var morePgs = match[2].split(",");
                                for (p in morePgs)
                                    if (pg == morePgs[p])
                                        break procArgs;
                            }
                            break thisEvent;
                        }
                    }
                }
                action(evData, evMap, args);
            }
        }
    }
};
