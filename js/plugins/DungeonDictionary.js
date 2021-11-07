//=============================================================================
// DungeonDictionary.js
//=============================================================================

var Imported = Imported || {};
Imported.DungeonDictionary = '0.0.2';

/*:
 * @plugindesc v0.0.2 DungeonDictionary
 * @author Rhaokiel
 * 
 * @help
 * DungeonDictionary.createProfile();
 * DungeonDictionary.playerChoose(dialogueType, choice);
 * DungeonDictionary.successRate();
 */
 
if (Imported.CodexUtil < '0.0.2')
    console.error("DungeonDictionary requires CodexUtil v0.0.2");
 
/*:
 * PARAMETERS ARE DISABLED BECAUSE EDITOR IS DUMB, USE SPACE IN CODE BELOW FOR DICTIONARY
 * @ param names
 * @ parent Dictionary
 * @ type struct<NameEntry>[]
 * @ desc Potential names for prisoner
 *   
 * @ param jobs
 * @ parent Dictionary
 * @ type struct<JobEntry>[]
 * @ desc Potential jobs for prisoner
 *   
 * @ param crimes
 * @ parent Dictionary
 * @ type struct<NameEntry>[]
 * @ desc Potential crimes for prisoner
 *   
 * @ param wheres
 * @ parent Dictionary
 * @ type struct<NameEntry>[]
 * @ desc Potential scenes of crime for prisoner
 */

 /*~struct~NameEntry:
 * @param name
 * @type string
 * @default null
 * @desc A potential name for prisoner
 
 * @param gender
 * @type string
 * @default null
 * @desc Whether the name is (M)ale or (F)emale, or null for indifferent
 * 
 * @param dialogue
 * @type string
 * @default null
 * @desc What a prisoner might say when asked about their name
 */
 
 /*~struct~JobEntry:
 * @param job
 * @type string
 * @default null
 * @desc A potential job for prisoner
 *
 * @param maleFace
 * @type string
 * @default null
 * @desc The name of the image which depicts the male face of this trade
 *
 * @param femaleFace
 * @type string
 * @default null
 * @desc The name of the image which depicts the female face of this trade
 * 
 * @param dialogue
 * @type string
 * @default null
 * @desc What a prisoner might say when asked about their job
 */
 
 /*~struct~CrimeEntry:
 * @param crime
 * @type string
 * @default null
 * @desc A potential crime for prisoner
 * 
 * @param preposition
 * @type string
 * @default null
 * @desc The word used to connect the crime and its location in a sentence
 * 
 * @param dialogue
 * @type string
 * @default null
 * @desc What a prisoner might say when asked about their crime
 */
 
 /*~struct~WhereEntry:
 * @param where
 * @type string
 * @default null
 * @desc A potential scene of crime for prisoner
 * 
 * @param dialogue
 * @type string
 * @default null
 * @desc What a prisoner might say when asked about the scene of their crime
 */

var DungeonDictionary = DungeonDictionary || {};
DungeonDictionary.Alias = DungeonDictionary.Alias || {};
DungeonDictionary.Param = DungeonDictionary.Param || {};
DungeonDictionary.Param.defaultFace = "Faces2_4";
DungeonDictionary.Param.names = [
    {name:"Timothy", gender:"M"},
    {name:"Phil", gender:"M"},
    {name:"Simon", gender:"M"},
    {name:"Zack", gender:"M"},
    {name:"Ashley"},
    {name:"Paul", gender:"M"},
    {name:"Mark", gender:"M"},
    {name:"Pete", gender:"M"},
    {name:"Jill", gender:"F"},
    {name:"Pat"},
    {name:"Matilda", gender:"F"},
    {name:"Vinessa", gender:"F"},
    {name:"Tessa", gender:"F"},
    {name:"Meghan", gender:"F"},
    {name:"Creg", gender:"M"},
    {name:"Nunya", dialogue:"Name's Nunya.\|.. Nunya Business"},
    {name:"Tom", gender:"M"},
    {name:"Mike", gender:"M"},
    {name:"Dave", gender:"M"},
    {name:"Jerry", gender:"M"},
    {name:"Taylor"},
    
    // generic if {name} appears in the dialogue
    {dialogue:"Name's {name} and don't you forget it!!"},
    {dialogue:"I'm {name} the {job}! Why have I been detained?"} // having a second tag means that they both have to be the same validity
];
DungeonDictionary.Param.jobs = [
    {job:"sailor", maleFace:"FacesDung1_1", femaleFace:"FacesDung1_2"},
    {job:"farmer", maleFace:"FacesDung1_3", femaleFace:"FacesDung1_4", dialogue:"I'm a farmer! I grow crops!"},
    {job:"bandit", maleFace:"FacesDung1_5", femaleFace:"FacesDung1_6"},
    {job:"priest", maleFace:"FacesDung1_7", femaleFace:"FacesDung1_8"},
    {job:"guard", maleFace:"FacesDung2_1", femaleFace:"FacesDung2_2"},
    {job:"innkeeper", maleFace:"FacesDung2_3", femaleFace:"FacesDung2_4"},
    {job:"shopkeeper", maleFace:"FacesDung2_5", femaleFace:"FacesDung2_6"},
    {job:"blacksmith", maleFace:"FacesDung2_7", femaleFace:"FacesDung2_8"},
    {job:"traveler", maleFace:"FacesDung3_1", femaleFace:"FacesDung3_2"},
    {job:"trader", maleFace:"FacesDung3_3", femaleFace:"FacesDung3_4"},
    {job:"knight", maleFace:"FacesDung3_5", femaleFace:"FacesDung3_6"},
    {job:"seer", maleFace:"FacesDung3_7", femaleFace:"FacesDung3_8"},
    {job:"king", maleFace:"FacesDung4_1", femaleFace:"FacesDung4_2"},
    {job:"beggar", maleFace:"FacesDung4_3", femaleFace:"FacesDung4_4"},
    {job:"jester", maleFace:"FacesDung4_5", femaleFace:"FacesDung4_6"},
    {job:"dancer", maleFace:"FacesDung4_7", femaleFace:"FacesDung4_8"},
    {job:"singer", maleFace:"FacesDung5_1", femaleFace:"FacesDung5_2"},
    {job:"outlaw", maleFace:"FacesDung5_3", femaleFace:"FacesDung5_4"},
    {job:"pirate", maleFace:"FacesDung5_5", femaleFace:"FacesDung5_6"},
    {job:"fisherman", maleFace:"FacesDung5_7", femaleFace:"FacesDung5_8"},
    
    // generic if {job} appears in the dialogue
    {dialogue:"I'm... a {job}"},
    {dialogue:"I'm a {job}"},
    {dialogue:"I work as a {job}"}
];
DungeonDictionary.Param.crimes = [
    {crime:"stole a blessed candle", prp:"from", dialogue:"Blessed candles sell for a ton!"},
    {crime:"humming", prp:"at", dialogue:"I had just heard this lovely tune and I got it stuck in my head. The humming is just a bad habit of mine!"},
    {crime:"stole a chocolate bar", prp:"from", dialogue:"I stole a chocolate bar from my aunt. Wasn't even that sweet..."},
    {crime:"stole some money", prp:"from", dialogue:"I stole some gold from a guy. Wasn't even that much, I doubt he's missing it."},
    {crime:"stole a lot of money", prp:"from", dialogue:"I needed the money! I have medical bills to cover!"},
    {crime:"murdered a civilian", prp:"at", dialogue:"I killed a guy, big deal. He was a waste of skin anyways!"},
    {crime:"murdered a guard", prp:"at", dialogue:"I killed a guard, but I didn't mean to! I got spooked when he caught me shoplifting and tried to run away. He caught me by the bridge so I pushed him and he fell into the river!"},
    {crime:"practicing witchcraft", prp:"at", dialogue:"So I was practicing magic! What's wrong with expanding our knowledge?!"},
    {crime:"tresspassing", prp:"at", dialogue:"I tresspassed into the king's royal quarters, but I didn't take anything!... Yet."},
    {crime:"worshiping a false idol", prp:"at", dialogue:"I worship Harmega. Harmega will save her devote followers!"},
    {crime:"worshiping the devil", prp:"at", dialogue:"I worship Vevil. He will curse you if you punish me!"},
    {crime:"loitering", prp:"at", dialogue:"I was loitering in front of a store. Is it really that big of a deal?"},
    {crime:"treason", prp:"at", dialogue:"I conspired against my kingdom, by trading information"},
    {crime:"dine and dash", prp:"at", dialogue:"I ran out of the tavern without paying for my drink. I couldn't afford it!"},
    {crime:"fishing without a fishing pass", prp:"at", dialogue:"I didn\it realize I needed a permit to fish in the good spots!"},
    {crime:"public indecency", prp:"at", dialogue:"So I was streaking butt naked in the main square. Big whoop!"},
    {crime:"arson", prp:"at", dialogue:"I burned my neighbor's house down cause it had an ugly coat of paint. Seriously, who paints their house all grey?!"},
    {crime:"forgery", prp:"at", dialogue:"I forged some papers to get through the checkpoint."},
    {crime:"poaching", prp:"at", dialogue:"I poached some endangered animals. I would have made a killing off of them if I hadn't gotten caught"},
    {crime:"smuggling", prp:"at", dialogue:"I was smuggling contraband."},
    
    // without a {crime} tag these dialog are always lies
    {dialogue:"I'm not sure... I didn't do anything!"},
    {dialogue:"I got into a fight with a drunkard, it wasn't serious though!"},
    {dialogue:"I was jaywalking."},
    {dialogue:"I overslept and missed work."},
    {dialogue:"I'm innocent! I've done nothing wrong!."}
];
DungeonDictionary.Param.wheres = [
    {where:"the grand cathedral"}, 
    {where:"the bank", dialogue:"I went to the bank and then as I was leaving I got arrested!"},
    {where:"home"},
    {where:"the shop"},
    {where:"the blacksmith"},
    {where:"Verllia"},
    {where:"Corlstan"},
    {where:"Garishburg"},
    {where:"Wantoli"},
    {where:"Gebston"},
    {where:"the arena"},
    {where:"the tavern"},
    {where:"church"},
    {where:"the market"},
    {where:"the prison"},
    {where:"the arena"},
    
    // generic if {where} appears in the dialogue
    {dialogue:"I was at {where}."},
    {dialogue:"It happened at {where}."},
    {dialogue:"They arrested me at {where}."},
    {dialogue:"I was at {where}?"}
];

DungeonDictionary.completed = 0;

DungeonDictionary.init = function() {
    if (DungeonDictionary.Param.namesRaw == null) {
        DungeonDictionary.Param.namesRaw = DungeonDictionary.Param.names.filter((o) => o.name != null);
        DungeonDictionary.Param.jobsRaw = DungeonDictionary.Param.jobs.filter((o) => o.job != null);
        DungeonDictionary.Param.crimesRaw = DungeonDictionary.Param.crimes.filter((o) => o.crime != null);
        DungeonDictionary.Param.wheresRaw = DungeonDictionary.Param.wheres.filter((o) => o.where != null);
        
        DungeonDictionary.Param.namesdialogue = DungeonDictionary.Param.names.filter((o) => o.name == null && o.dialogue != null);
        DungeonDictionary.Param.jobsdialogue = DungeonDictionary.Param.jobs.filter((o) => o.job == null && o.dialogue != null);
        DungeonDictionary.Param.crimesdialogue = DungeonDictionary.Param.crimes.filter((o) => o.crime == null && o.dialogue != null);
        DungeonDictionary.Param.wheresdialogue = DungeonDictionary.Param.wheres.filter((o) => o.where == null && o.dialogue != null);
    }
};

DungeonDictionary.replaceDialogueTags = function(dlg, profile, match) {
    if (match) {
        return dlg.replace('{name}', profile.name)
                  .replace('{job}', profile.job)
                  .replace('{crime}', profile.crime)
                  .replace('{preposition}', profile.preposition)
                  .replace('{where}', profile.where);
    }
    else {
        if (dlg.includes('{name}')) {
            var n;
            do n = DungeonDictionary.Param.namesRaw.getRandom().name;
            while(profile.name == n);
            dlg = dlg.replace('{name}', n);
        }
        if (dlg.includes('{job}')) {
            var j;
            do j = DungeonDictionary.Param.jobsRaw.getRandom().job;
            while(profile.job == j);
            dlg = dlg.replace('{job}', j);
        }
        if (dlg.includes('{crime}')) {
            var c;
            do c = DungeonDictionary.Param.crimesRaw.getRandom();
            while(profile.crime == c.crime);
            dlg = dlg.replace('{crime}', c.crime);
            if (dlg.includes('{preposition}')) {
                dlg = dlg.replace('{preposition}', c.preposition);
            }
        }
        if (dlg.includes('{where}')) {
            var w;
            do w = DungeonDictionary.Param.wheresRaw.getRandom().where;
            while(profile.where == w);
            dlg = dlg.replace('{where}', w);
        }
        return dlg;
    }
}

DungeonDictionary.createProfile = function() {
    if (DungeonDictionary.profile != null)
        return DungeonDictionary.profile;
    
    var DEF = DungeonDictionary.Param;
    var profile = {
        dialogue: {},
        truth: {},
        lie: {},
        innocent: "Thanks, sucker! seeya!",
        guilty: "Dangit! I was so close!",
        noEvidence: "With what evidence? I think you owe me for\nemotional damages!",
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
    
    // get face based on gender
    switch (profile.name.gender)
    {
        case "M":
            profile.face = profile.job.maleFace || DEF.defaultFace;
            profile.pronounSub = "he";
            break;
        default:
            if (Math.floor(Math.random()*2) == 0) {
                profile.face = profile.job.maleFace || DEF.defaultFace;
                profile.pronounSub = "he";
                break;
            }
        case "F":
            profile.face = profile.job.femaleFace || DEF.defaultFace; 
            profile.pronounSub = "she";
            break;
    }
    
    // create dialogue name, job, crime, and where based on status if match
    // TODO: create responses truth or lie for name, job, crime, and where
    if (profile.status.name == 1)
    {
        if (Math.floor(Math.random()*2) == 0)
            profile.dialogue.name = profile.name.dialogue || profile.name.name;
        else
        {
            var dlg;
            do {
                dlg = DEF.namesdialogue.getRandom();
                dlg = dlg.dialogue;
            } while(!dlg.includes('{name}')
                 || (dlg.includes('{job}') && profile.status.job == 0)
                 || (dlg.includes('{crime}') && profile.status.crime == 0)
                 || (dlg.includes('{where}') && profile.status.where == 0));
            profile.dialogue.name = dlg;
        }

        profile.truth.name = "That's It!";
        profile.lie.name = "What!?";
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.namesdialogue.getRandom()
                : DEF.names.getRandom();
            dlg = dlg.dialogue || dlg.name;
        } while((dlg.includes('{job}') && profile.status.job == 0)
             || (dlg.includes('{crime}') && profile.status.crime == 0)
             || (dlg.includes('{where}') && profile.status.where == 0));
        profile.dialogue.name = dlg;
        
        profile.truth.name = "Haha got ya!";
        profile.lie.name = "How did you know?";
    }
    if (profile.status.job == 1)
    {
        if (Math.floor(Math.random()*2) == 0)
            profile.dialogue.job = profile.job.dialogue || profile.job.job.capitalize();
        else
        {
            var dlg;
            do {
                dlg = DEF.jobsdialogue.getRandom();
                dlg = dlg.dialogue;
            } while(!dlg.includes('{job}')
                 || (dlg.includes('{name}') && profile.status.name == 0)
                 || (dlg.includes('{crime}') && profile.status.crime == 0)
                 || (dlg.includes('{where}') && profile.status.where == 0));
            profile.dialogue.job = dlg;
        }
        
        profile.truth.job = "That's It!";
        profile.lie.job = "What!?";
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.jobsdialogue.getRandom()
                : DEF.jobs.getRandom();
            dlg = dlg.dialogue || dlg.job.capitalize();
        } while((dlg.includes('{name}') && profile.status.name == 0)
             || (dlg.includes('{crime}') && profile.status.crime == 0)
             || (dlg.includes('{where}') && profile.status.where == 0));
        profile.dialogue.job = dlg;
        
        profile.truth.job = "Haha got ya!";
        profile.lie.job = "How did you know?";
    }
    if (profile.status.crime == 1)
    {
        // TODO: need to limit to only tags that contain {crime} and use profile if result is empty
        //if (Math.floor(Math.random()*2) == 0)
            profile.dialogue.crime = profile.crime.dialogue || profile.crime.crime.capitalize();
        //else
        //{
        //    var dlg;
        //    do {
        //        dlg = DEF.crimesdialogue.getRandom();
        //        dlg = dlg.dialogue;
        //    } while(!dlg.includes('{crime}')
        //         || (dlg.includes('{name}') && profile.status.name == 0)
        //         || (dlg.includes('{job}') && profile.status.job == 0)
        //         || (dlg.includes('{where}') && profile.status.where == 0));
        //    profile.dialogue.crime = dlg;
        //}
        
        profile.truth.crime = "That's It!";
        profile.lie.crime = "What!?";
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.crimesdialogue.getRandom()
                : DEF.crimes.getRandom();
            dlg = dlg.dialogue || dlg.crime.capitalize();
        } while((dlg.includes('{name}') && profile.status.name == 0)
             || (dlg.includes('{job}') && profile.status.job == 0)
             || (dlg.includes('{where}') && profile.status.where == 0));
        profile.dialogue.crime = dlg;
        
        profile.truth.crime = "Haha got ya!";
        profile.lie.crime = "How did you know?";
    }
    if (profile.status.where == 1)
    {
        if (Math.floor(Math.random()*2) == 0)
            profile.dialogue.where = profile.where.dialogue || profile.where.where.capitalize();
        else
        {
            var dlg;
            do {
                dlg = DEF.wheresdialogue.getRandom();
                dlg = dlg.dialogue;
            } while(!dlg.includes('{where}')
                 || (dlg.includes('{name}') && profile.status.name == 0)
                 || (dlg.includes('{job}') && profile.status.job == 0)
                 || (dlg.includes('{crime}') && profile.status.crime == 0));
            profile.dialogue.where = dlg;
        }
        
        profile.truth.where = "That's It!";
        profile.lie.where = "What!?";
    }
    else
    {
        var dlg;
        do {
            dlg = Math.floor(Math.random()*2) == 0
                ? DEF.wheresdialogue.getRandom()
                : DEF.wheres.getRandom();
            dlg = dlg.dialogue || dlg.where.capitalize();
        } while((dlg.includes('{name}') && profile.status.name == 0)
             || (dlg.includes('{job}') && profile.status.job == 0)
             || (dlg.includes('{crime}') && profile.status.crime == 0));
        profile.dialogue.where = dlg;
        
        profile.truth.where = "Haha got ya!";
        profile.lie.where = "How did you know?";
    }
    
    // collapse structures
    profile.name  = profile.name.name;
    profile.job   = profile.job.job;
    profile.crime = profile.crime.crime;
    profile.where = profile.where.where;
    
    // replace tags in dialogues
    profile.dialogue.name  = DungeonDictionary.replaceDialogueTags(profile.dialogue.name, profile, profile.status.name == 1);
    profile.dialogue.job   = DungeonDictionary.replaceDialogueTags(profile.dialogue.job, profile, profile.status.job == 1);
    profile.dialogue.crime = DungeonDictionary.replaceDialogueTags(profile.dialogue.crime, profile, profile.status.crime == 1);
    profile.dialogue.where = DungeonDictionary.replaceDialogueTags(profile.dialogue.where, profile, profile.status.where == 1);
    
    return DungeonDictionary.profile = profile;
};

DungeonDictionary.playerChoose = function(dialogueType, choice) {
    var p = DungeonDictionary.profile;
    if (p != null)
        switch (dialogueType) {
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