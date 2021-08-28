let names = [
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

let jobs = [
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

let crimes = [
    {crime:'stole a blessed candle', dialog:'Blessed candles sell for a ton!'},
    {crime:'humming', dialog:'I had just heard this lovely tune and I got it stuck in my head. The humming is just a bad habit of mine!', research:'Annoy people around him at {where} by humming tunes loudly.'},
    {crime:'stole a chocolate bar', dialog:'I stole a chocolate bar from my aunt. Wasn\'t even that sweet...'},
    {crime:'stole some money', dialog:'I stole some gold from a guy. Wasn\'t even that much, I doubt he\'s missing it.'},
    {crime:'stole a lot of money', dialog:'I needed the money! I have medical bills to cover!'},
    {crime:'murdered a civilian', dialog:'I killed a guy, big deal. He was a waste of skin anyways!'},
    {crime:'murdered a guard', dialog:'I killed a guard, but I didn\'t mean to! I got spooked when he caught me shoplifting and tried to run away. He caught me by the bridge so I pushed him and he fell into the river!'},
    {crime:'practicing witchcraft', dialog:'So I was practicing magic! What\'s wrong with expanding our knowledge?!'},
    {crime:'tresspassing', dialog:'I tresspassed into the king\'s royal quarters, but I didn\'t take anything!... Yet.'},
    {crime:'worshiping a false idol', dialog:'I worship Harmega. Harmega will save her devote followers!'},
    {crime:'worshiping the devil', dialog:'I worship Vevil. He will curse you if you punish me!'},
    {crime:'loitering', dialog:'I was loitering in front of a store. Is it really that big of a deal?'},
    {crime:'treason', dialog:'I conspired against my kingdom, by trading information'},
    {crime:'dine and dash', dialog:'I ran out of the tavern without paying for my drink. I couldn\'t afford it!'},
    {crime:'fishing without a fishing pass', dialog:'I didn\it realize I needed a permit to fish in the good spots!'},
    {crime:'public indecency', dialog:'So I was streaking butt naked in the main square. Big whoop!'},
    {crime:'arson', dialog:'I burned my neighbor\'s house down cause it had an ugly coat of paint. Seriously, who paints their house all grey?!'},
    {crime:'Forgery', dialog:'I forged some papers to get through the checkpoint.'},
    {crime:'poaching', dialog:'I poached some endangered animals. I would have made a killing off of them if I hadn\'t gotten caught'},
    {crime:'smuggling', dialog:'I was smuggling contraband.'},
    
    // always wrong, so we don't need a crime key or research
    {dialog:'I\'m not sure... I didn\'t do anything!'}
    {dialog:'I got into a fight with a drunkard, it wasn\'t serious though!'}
    {dialog:'I was jaywalking.'}
    {dialog:'I overslept and missed work.'}
    {dialog:'I\'m innocent! I\'ve done nothing wrong!.'}
];
							
let wheres = [
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
    {dialog:'I was at {where}?'}
];

let research = [
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