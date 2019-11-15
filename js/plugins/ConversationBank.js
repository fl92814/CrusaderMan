


var WordBank = WordBank | {};

var Imported = Imported || {};
Imported.WordBank = true;

var ConvoTable = {};        

ConvoTable[0, 0] = {
    text : "Oh! Hello there stranger! What brings you to these parts?",
    options : ["work", "job", "secret"],
    actions : [1, 1, 3]
};

ConvoTable[0, 1] = {
    text : "I know how that is! What sort of work do you do",
    options : ["crusade", "crusader", "knight", "paladin"],
    actions : [2, 2, 2, 2]
};

ConvoTable[0, 2] = {
    text : "Oh! Well good luck heretic hunting! \nMake the world a better place for all of us!",
    options : [],
    actions : []
};

ConvoTable[0, 3] = {
    text : "Oh! A mystery is it? I love mysteries! Let me guess. \nHmmm...\| I bet you're a Juggler!",
    options : ["no", "nah", "nope", "yes", "yeah", "yup"],
    actions : [4, 4, 4, 5, 5, 5]
};

ConvoTable[0, 4] = {
    text : "oh...",
    options : [],
    actions : []
};

ConvoTable[0, 5] = {
    text : "I knew it!",
    options : [],
    actions : []
};

ConvoTable[0, 99] = {
    text : "Ok then..",
    options : [],
    actions : []
};

ConvoTable[1, 0] = {
    text : "I'm on duty.",
    options : [],
    actions : []

};