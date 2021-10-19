//=============================================================================
// DungeonDictionary.js
//=============================================================================

/*:
 * @plugindesc v0.0.1 DungeonDictionary
 * @author Rhaokiel
 * 
 * @help
 * DungeonDictionary.createProfile();
 * DungeonDictionary.playerChoose(dialogType, choice);
 * DungeonDictionary.successRate();
 */
 
var Imported = Imported || {};
Imported.DungeonDictionary = '0.0.1';

var DungeonDictionary = DungeonDictionary || {};
DungeonDictionary.Alias = DungeonDictionary.Alias || {};
DungeonDictionary.Param = DungeonDictionary.Param || {};
DungeonDictionary.Param.names = [
    {name:'Timothy'},
    {name:'Phil'},
    {name:'Simon'},
    {name:'Zack'},
    {name:'Ashley'},
    {name:'Paul'},
    {name:'Mark'},
    {name:'Pete'},
    {name:'Jill'},
    {name:'Pat'},
    {name:'Matilda'},
    {name:'Vinessa'},
    {name:'Tessa'},
    {name:'Meghan'},
    {name:'Creg'},
    {name:'Nunya'},
    {name:'Tom'},
    {name:'Mike'},
    {name:'Dave'},
    {name:'Jerry'},
    
    // generic if {name} appears in the dialog
    {dialog:'Name\'s {name} and don\'t you forget it!!'},
    {dialog:'I\'m {name} the {job}! Why have I been detained?'} // having a second tag means that they both have to be the same validity
];
DungeonDictionary.Param.jobs = [
    {job:'sailor'},
    {job:'farmer',dialog:'I\'m a farmer! I grow crops!'},
    {job:'bandit'},
    {job:'priest'},
    {job:'guard'},
    {job:'innkeeper'},
    {job:'shopkeeper'},
    {job:'blacksmith'},
    {job:'traveler'},
    {job:'trader'},
    {job:'knight'},
    {job:'seer'},
    {job:'king'},
    {job:'beggar'},
    {job:'jester'},
    {job:'dancer'},
    {job:'singer'},
    {job:'outlaw'},
    {job:'pirate'},
    {job:'fisherman'},
    
    // generic if {job} appears in the dialog
    {dialog:'I\'m... a {job}'}
];
DungeonDictionary.Param.crimes = [
    {crime:'stole a blessed candle', prp:'from', dialog:'Blessed candles sell for a ton!'},
    {crime:'humming', prp:'at', dialog:'I had just heard this lovely tune and I got it stuck in my head. The humming is just a bad habit of mine!', research:'Annoy people around him at {where} by humming tunes loudly.'},
    {crime:'stole a chocolate bar', prp:'from', dialog:'I stole a chocolate bar from my aunt. Wasn\'t even that sweet...'},
    {crime:'stole some money', prp:'from', dialog:'I stole some gold from a guy. Wasn\'t even that much, I doubt he\'s missing it.'},
    {crime:'stole a lot of money', prp:'from', dialog:'I needed the money! I have medical bills to cover!'},
    {crime:'murdered a civilian', prp:'at', dialog:'I killed a guy, big deal. He was a waste of skin anyways!'},
    {crime:'murdered a guard', prp:'at', dialog:'I killed a guard, but I didn\'t mean to! I got spooked when he caught me shoplifting and tried to run away. He caught me by the bridge so I pushed him and he fell into the river!'},
    {crime:'practicing witchcraft', prp:'at', dialog:'So I was practicing magic! What\'s wrong with expanding our knowledge?!'},
    {crime:'tresspassing', prp:'at', dialog:'I tresspassed into the king\'s royal quarters, but I didn\'t take anything!... Yet.'},
    {crime:'worshiping a false idol', prp:'at', dialog:'I worship Harmega. Harmega will save her devote followers!'},
    {crime:'worshiping the devil', prp:'at', dialog:'I worship Vevil. He will curse you if you punish me!'},
    {crime:'loitering', prp:'at', dialog:'I was loitering in front of a store. Is it really that big of a deal?'},
    {crime:'treason', prp:'at', dialog:'I conspired against my kingdom, by trading information'},
    {crime:'dine and dash', prp:'at', dialog:'I ran out of the tavern without paying for my drink. I couldn\'t afford it!'},
    {crime:'fishing without a fishing pass', prp:'at', dialog:'I didn\it realize I needed a permit to fish in the good spots!'},
    {crime:'public indecency', prp:'at', dialog:'So I was streaking butt naked in the main square. Big whoop!'},
    {crime:'arson', prp:'at', dialog:'I burned my neighbor\'s house down cause it had an ugly coat of paint. Seriously, who paints their house all grey?!'},
    {crime:'forgery', prp:'at', dialog:'I forged some papers to get through the checkpoint.'},
    {crime:'poaching', prp:'at', dialog:'I poached some endangered animals. I would have made a killing off of them if I hadn\'t gotten caught'},
    {crime:'smuggling', prp:'at', dialog:'I was smuggling contraband.'},
    
    // always wrong, so we don't need a crime key or research
    {dialog:'I\'m not sure... I didn\'t do anything!'},
    {dialog:'I got into a fight with a drunkard, it wasn\'t serious though!'},
    {dialog:'I was jaywalking.'},
    {dialog:'I overslept and missed work.'},
    {dialog:'I\'m innocent! I\'ve done nothing wrong!.'}
];
DungeonDictionary.Param.wheres = [
    {where:'the grand cathedral'}, 
    {where:'the bank', dialog:'I went to the bank and then as I was leaving I got arrested!'},
    {where:'home'},
    {where:'the shop'},
    {where:'the blacksmith'},
    {where:'Verllia'},
    {where:'Corlstan'},
    {where:'Garishburg'},
    {where:'Wantoli'},
    {where:'Gebston'},
    {where:'the arena'},
    {where:'the tavern'},
    {where:'church'},
    {where:'the market'},
    {where:'the prison'},
    {where:'the arena'},
    
    // generic if {where} appears in the dialog
    {dialog:'I was at {where}.'},
    {dialog:'I was at {where}?'}
];
DungeonDictionary.Param.research = [
    '{crime} from {where}.',
];

/* OBSOLETE?
let motives = [
    'They sell for a ton!',
    'I had just heard this lovely tune and I got it stuck in my head. The humming is just a bad habit of mine!'
];

let bodies = [
    'I didn\'t kill anyone!',
    'What?! Body? Where? There wasn\'t any body!'
];
//*/

DungeonDictionary.completed = 0;

DungeonDictionary.init = function() {
    if (DungeonDictionary.Param.namesRaw == null) {
        DungeonDictionary.Param.namesRaw = DungeonDictionary.Param.names.filter((o) => o.name != null);
        DungeonDictionary.Param.jobsRaw = DungeonDictionary.Param.jobs.filter((o) => o.job != null);
        DungeonDictionary.Param.crimesRaw = DungeonDictionary.Param.crimes.filter((o) => o.crime != null);
        DungeonDictionary.Param.wheresRaw = DungeonDictionary.Param.wheres.filter((o) => o.where != null);
        
        DungeonDictionary.Param.namesDialog = DungeonDictionary.Param.names.filter((o) => o.name == null && o.dialog != null);
        DungeonDictionary.Param.jobsDialog = DungeonDictionary.Param.jobs.filter((o) => o.job == null && o.dialog != null);
        DungeonDictionary.Param.crimesDialog = DungeonDictionary.Param.crimes.filter((o) => o.crime == null && o.dialog != null);
        DungeonDictionary.Param.wheresDialog = DungeonDictionary.Param.wheres.filter((o) => o.where == null && o.dialog != null);
    }
};

Array.prototype.getRandom = function() {
    return this[Math.floor(Math.random()*this.length)]
};
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
Game_Message.prototype.wrapText = function(text) {
    var scn = SceneManager._scene;
    if (scn instanceof Scene_Map || scn instanceof Scene_Battle)
    {
        var wrapX = scn._messageWindow.newLineX()
        if (wrapX > 0 && text.length > wrapX)
        {
            var i = text.lastIndexOf(' ', wrapX);
            if (i > 0)
                text = text.slice(0, i) + '\n' + text.slice(i+1);
        }
    }
    return text;
};

DungeonDictionary.replaceDialogTags = function(dlg, profile, match) {
    if (match) {
        return dlg.replace('{name}', profile.name)
                  .replace('{job}', profile.job)
                  .replace('{crime}', profile.crime)
                  .replace('{where}', profile.where);
    }
    else {
        if (dlg.includes('{name}')) {
            var n;
            do n = DungeonDictionary.Param.namesRaw.getRandom();
            while(profile.name == n);
            dlg.replace('{name}', n);
        }
        if (dlg.includes('{job}')) {
            var j;
            do j = DungeonDictionary.Param.jobsRaw.getRandom();
            while(profile.job == j);
            dlg.replace('{job}', j);
        }
        if (dlg.includes('{crime}')) {
            var c;
            do c = DungeonDictionary.Param.crimesRaw.getRandom();
            while(profile.crime == c);
            dlg.replace('{crime}', c);
        }
        if (dlg.includes('{where}')) {
            var w;
            do w = DungeonDictionary.Param.wheresRaw.getRandom();
            while(profile.where == w);
            dlg.replace('{where}', w);
        }
        return dlg;
    }
}

DungeonDictionary.createProfile = function() {
    if (DungeonDictionary.profile != null)
        return DungeonDictionary.profile;
    
    var DEF = DungeonDictionary.Param;
    var profile = {
        dialog: {},
        status: { // 0 = expect wrong, 1 = expect right, 2 = player mismatch, 3 = player correct
            name:  Math.floor(Math.random()*2),
            job:   Math.floor(Math.random()*2),
            crime: Math.floor(Math.random()*2),
            where: Math.floor(Math.random()*2),
        }
    };
        
    // create correct name, job, crime, and where
    profile.name  = DEF.namesRaw.getRandom();
    profile.job   = DEF.jobsRaw.getRandom();
    profile.crime = DEF.crimesRaw.getRandom();
    profile.preposition = profile.crime.prp;
    profile.where = DEF.wheresRaw.getRandom();
    
    // create dialog name, job, crime, and where based on status if match
    if (profile.status.name == 1)
    {
        if (profile.name.dialog != null && Math.floor(Math.random()*2) == 0)
            profile.dialog.name = profile.name.dialog;
        else
        {
            var dlg;
            do {
                dlg = DEF.namesDialog.getRandom();
                dlg = dlg.dialog || dlg.name;
            } while((dlg.includes('{job}') && profile.status.job == 0)
               || (dlg.includes('{crime}') && profile.status.crime == 0)
               || (dlg.includes('{where}') && profile.status.where == 0));
            profile.dialog.name = dlg;
        }
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.namesDialog.getRandom()
                : DEF.names.getRandom();
            dlg = dlg.dialog || dlg.name;
        } while((dlg.includes('{job}') && profile.status.job == 0)
           || (dlg.includes('{crime}') && profile.status.crime == 0)
           || (dlg.includes('{where}') && profile.status.where == 0));
        profile.dialog.name = dlg;
    }
    if (profile.status.job == 1)
    {
        if (profile.job.dialog != null && Math.floor(Math.random()*2) == 0)
            profile.dialog.job = profile.job.dialog;
        else
        {
            var dlg;
            do {
                dlg = DEF.jobsDialog.getRandom();
                dlg = dlg.dialog || dlg.job;
            } while((dlg.includes('{name}') && profile.status.name == 0)
               || (dlg.includes('{crime}') && profile.status.crime == 0)
               || (dlg.includes('{where}') && profile.status.where == 0));
            profile.dialog.job = dlg;
        }
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.jobsDialog.getRandom()
                : DEF.jobs.getRandom();
            dlg = dlg.dialog || dlg.job;
        } while((dlg.includes('{name}') && profile.status.name == 0)
           || (dlg.includes('{crime}') && profile.status.crime == 0)
           || (dlg.includes('{where}') && profile.status.where == 0));
        profile.dialog.job = dlg;
    }
    if (profile.status.crime == 1)
    {
        if (profile.crime.dialog != null && Math.floor(Math.random()*2) == 0)
            profile.dialog.crime = profile.crime.dialog;
        else
        {
            var dlg;
            do {
                dlg = DEF.crimesDialog.getRandom();
                dlg = dlg.dialog || dlg.crime;
            } while((dlg.includes('{name}') && profile.status.name == 0)
               || (dlg.includes('{job}') && profile.status.job == 0)
               || (dlg.includes('{where}') && profile.status.where == 0));
            profile.dialog.crime = dlg;
        }
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.crimesDialog.getRandom()
                : DEF.crimes.getRandom();
            dlg = dlg.dialog || dlg.crime;
        } while((dlg.includes('{name}') && profile.status.name == 0)
           || (dlg.includes('{job}') && profile.status.job == 0)
           || (dlg.includes('{where}') && profile.status.where == 0));
        profile.dialog.crime = dlg;
    }
    if (profile.status.where == 1)
    {
        if (profile.where.dialog != null && Math.floor(Math.random()*2) == 0)
            profile.dialog.where = profile.where.dialog;
        else
        {
            var dlg;
            do {
                dlg = DEF.wheresDialog.getRandom();
                dlg = dlg.dialog || dlg.where;
            } while((dlg.includes('{name}') && profile.status.name == 0)
               || (dlg.includes('{job}') && profile.status.job == 0)
               || (dlg.includes('{crime}') && profile.status.crime == 0));
            profile.dialog.where = dlg;
        }
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.wheresDialog.getRandom()
                : DEF.wheres.getRandom();
            dlg = dlg.dialog || dlg.where;
        } while((dlg.includes('{name}') && profile.status.name == 0)
           || (dlg.includes('{job}') && profile.status.job == 0)
           || (dlg.includes('{crime}') && profile.status.crime == 0));
        profile.dialog.where = dlg;
    }
    
    // collapse structures
    profile.name  = profile.name.name;
    profile.job   = profile.job.job;
    profile.crime = profile.crime.crime;
    profile.where = profile.where.where;
    
    // replace tags in dialogs
    profile.dialog.name  = DungeonDictionary.replaceDialogTags(profile.dialog.name, profile, profile.status.name == 1);
    profile.dialog.job   = DungeonDictionary.replaceDialogTags(profile.dialog.job, profile, profile.status.job == 1);
    profile.dialog.crime = DungeonDictionary.replaceDialogTags(profile.dialog.crime, profile, profile.status.crime == 1);
    profile.dialog.where = DungeonDictionary.replaceDialogTags(profile.dialog.where, profile, profile.status.where == 1);
    
    return DungeonDictionary.profile = profile;
};

DungeonDictionary.playerChoose = function(dialogType, choice) {
    var p = DungeonDictionary.profile;
    if (p != null)
        switch (dialogType) {
            case 'name':  p.status.name  = p.status.name  == choice ? 3 : 2; break;
            case 'job':   p.status.job   = p.status.job   == choice ? 3 : 2; break;
            case 'crime': p.status.crime = p.status.crime == choice ? 3 : 2; break;
            case 'where': p.status.where = p.status.where == choice ? 3 : 2; break;
        }
}

DungeonDictionary.successRate = function() {
    var p = DungeonDictionary.profile;
    if (p != null) {
        var s = 0;
        if (p.status.name == 3) s++;
        if (p.status.job == 3) s++;
        if (p.status.crime == 3) s++;
        if (p.status.where == 3) s++;
        return s;
    }
    return null;
}


DungeonDictionary.Alias.setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
    DungeonDictionary.Alias.setupNewGame.call(this);
    DungeonDictionary.init();
};
DungeonDictionary.Alias.makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = DungeonDictionary.Alias.makeSaveContents();
    
    contents.DungeonDictionary = {
        profile: DungeonDictionary.profile,
        completed: DungeonDictionary.completed
    };
    
    return contents;
};
DungeonDictionary.Alias.extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    DungeonDictionary.init();
    
    if (contents.DungeonDictionary != null) {
        DungeonDictionary.profile = contents.DungeonDictionary.profile;
        DungeonDictionary.completed = contents.DungeonDictionary.completed || 0;
    }
    else {
        DungeonDictionary.profile = null;
        DungeonDictionary.completed = 0;
    }
    
    DungeonDictionary.Alias.extractSaveContents(contents);
};