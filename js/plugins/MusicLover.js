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
 * <MusicLover Song(##)Tip:##>
 * Sets the tip multiplier for a given song. More than 1 is considered favorite, less than 1 is annoyed.
 * 
 * <MusicLover Unique:##>
 * Sets the listener to activate the specified unique script after the performance finishes.
 * Only one unique listener can activate at a time.
 *
 * ============================================================================
 * Script Functions
 *
 * MusicLover.forEachListener(function(evData, evMap, args) { ... });
 * 
 * tipMult = MusicLover.songTipMult(song, args);
 * 
 * uniqueId = MusicLover.unique(args);
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
                var args;
                if (match[1]) {
                    args = match[1].split(/\s+/);
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

MusicLover.songTipMult = function(song, args) {
    if (song && args) {
        var match;
        for (a in args) {
            match = String(args[a]).match(/^Song\(([0-9]+)\)Tip:([0-9]+(?:.[0-9]+)?)$/i);
            if (match && song == match[1])
                return Number(match[2]);
        }
    }
    return 1;
};

MusicLover.unique = function(args) {
    if (args) {
        var match;
        for (a in args) {
            match = String(args[a]).match(/^Unique:([0-9]+)$/i);
            if (match)
                return Number(match[1]);
        }
    }
    return null;
};