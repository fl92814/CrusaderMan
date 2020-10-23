//=============================================================================
// LWP_RestrictedSelling.js
//=============================================================================

/*:
 * @plugindesc Conversations in battles.
 * @author Logan Pickup
 *
 * @help
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * BUY_ONLY a b c ...
 *      The next shop command will create a shop menu that only buys the listed
 *      items. The items to buy are specified as follows:
 *      wX, e.g. w1: buy only weapon 1.
 *      wtX, e.g. wt1: buy only weapon *type* 1.
 *      iX, e.g. i1: buy only item 1.
 *      itX, e.g. it1: buy only item *type* 1. Normal items=1, key items=2.
 *      aX, e.g. a1: buy only armour 1.
 *      atX, e.g. at1: buy only armour *type* 1.
 *      etX, e.g. et1: buy only equipment type 1 (only applies to armour and weapons).
 * 
 * This plugin command only works once to affect the next shop menu called from the
 * same script. Multiple BUY_ONLY commands do not stack; only the last one takes effect.
 * 
 * Example:
 * 
 * BUY_ONLY i1 it2 w1 w2 wt3 e5
 *      The next shop will only purchase from the player:
 *      - items with ID 1 (Potion in default data)
 *      - key items
 *      - weapons with ids 1 and 2 (Sword and Axe in default data)
 *      - weapon type 3 (flail in the default data - there are no weapons of this type in the default data)
 *      - equipment type 5 (accessory in the default data - the Ring qualifies)
 */

(function() {

    ///////////////////////////////////////////////////////////////////////////////
    // Window_ShopSell
    // This is the window that contains the player's items (it's a Window_ItemList)
    // and already contains a method letting us check if an item can be sold or not
    ///////////////////////////////////////////////////////////////////////////////

    Window_ShopSell.prototype.setRestrictions = function(restrictions) {
        this._restrictions = restrictions;
        console.log("sell window restrictions", this._restrictions);
    };

    const oldWindow_ShopSellIncludes = Window_ShopSell.prototype.includes;
    Window_ShopSell.prototype.includes = function(item) {
        return oldWindow_ShopSellIncludes.call(this, item) && this.isAllowed(item);
    };

    Window_ShopSell.prototype.isAllowed = function(item) {
        if (this._restrictions && this._restrictions.buy) {
            console.log("checking ", item, this._restrictions);
            if (item.wtypeId) {
                if (this._restrictions.buy.weaponId.indexOf(item.id) !== -1) return true;
                if (this._restrictions.buy.wType.indexOf(item.wtypeId) !== -1) return true;
                if (this._restrictions.buy.eType.indexOf(item.etypeId) !== -1) return true;
            }
            if (item.atypeId) {
                if (this._restrictions.buy.armourId.indexOf(item.id) !== -1) return true;
                if (this._restrictions.buy.aType.indexOf(item.atypeId) !== -1) return true;
                if (this._restrictions.buy.eType.indexOf(item.etypeId) !== -1) return true;
            }
            if (item.itypeId) {
                if (this._restrictions.buy.itemId.indexOf(item.id) !== -1) return true;
                if (this._restrictions.buy.iType.indexOf(item.itypeId) !== -1) return true;
            }
            return false;
        } else {
            return true;
        }
    }
    
    const oldWindow_ShopSellIsEnabled = Window_ShopSell.prototype.isEnabled;
    Window_ShopSell.prototype.isEnabled = function(item) {
        return oldWindow_ShopSellIsEnabled.call(this, item) && this.isAllowed(item);
    };
    
    ///////////////////////////////////////////////////////////////////////////////
    // Scene_Shop
    // Just handles passing the data through to Window_ShopSell
    ///////////////////////////////////////////////////////////////////////////////

    const oldScene_ShopPrepare = Scene_Shop.prototype.prepare;
    Scene_Shop.prototype.prepare = function(goods, purchaseOnly, restrictions) {
        oldScene_ShopPrepare.call(this, goods, purchaseOnly);
        this._restrictions = restrictions;
    };

    const oldScene_ShopCreateSellWindow = Scene_Shop.prototype.createSellWindow;
    Scene_Shop.prototype.createSellWindow = function() {
        oldScene_ShopCreateSellWindow.call(this);
        this._sellWindow.setRestrictions(this._restrictions);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Game_Interpreter
    // Performs the plugin command, saves the data until the next shop command, and
    // passes the data (via SceneManager) to Scene_Shop
    ///////////////////////////////////////////////////////////////////////////////

    const oldGame_InterpreterSetup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        oldGame_InterpreterSetup.call(this, list, eventId);
        this._nextShopRestrictions = {};
    }

    function filterPrefix(prefix) {
        return function(x) {
            return x.startsWith(prefix) && x.length > prefix.length && /[0-9]/.test(x[prefix.length]);
        }
    }

    function getId(x) {
        return Number.parseInt(/[0-9]+/.exec(x)[0]);
    }

    const oldGame_InterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (/buy_only/i.test(command)) {
            this._nextShopRestrictions.buy = {
                itemId: args.filter(filterPrefix('i')).map(getId),
                armourId: args.filter(filterPrefix('a')).map(getId),
                weaponId: args.filter(filterPrefix('w')).map(getId),
                iType: args.filter(filterPrefix('it')).map(getId),
                aType: args.filter(filterPrefix('at')).map(getId),
                wType: args.filter(filterPrefix('wt')).map(getId),
                eType: args.filter(filterPrefix('et')).map(getId),
            };
            return;
        }
        oldGame_InterpreterPluginCommand.call(this, command, args);
    };
    
    const oldGame_InterpreterCommand302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function() {
        if (this._nextShopRestrictions.buy) {
            // straight replacement, no fallback
            if (!$gameParty.inBattle()) {
                var goods = [this._params];
                while (this.nextEventCode() === 605) {
                    this._index++;
                    goods.push(this.currentCommand().parameters);
                }
                SceneManager.push(Scene_Shop);
                SceneManager.prepareNextScene(goods, this._params[4], this._nextShopRestrictions);
                this._nextShopRestrictions = {};
            }
            return true;
        } else {
            // fallback so if something changes original shop creation, it will only
            // break restricted shops, not all shops
            return oldGame_InterpreterCommand302.call(this);
        }
    };
    
})();