
exports.data = {
  Spooky: {
    class: "The Spooky",
    flavorText: "I can do things, things that normal people can’t. But there’s a price—I haven’t paid it in full, yet, but the bill’s gonna come due soon. It’s best I don’t tell you any more. You get too close, you’ll get hurt.",
    look: {
      _label: "Choose Your Look",
      options:  {
        gender: {
          _label: "Choose Your Gender",
          _type: 'radio',
          options: ["man", "woman", "boy", "girl", "concealed", "androgynous"]
        },
        eyes: {
          _label: "Choose Your Eyes",
          _type: 'radio',
          options: ["burning eyes", "dark eyes", "blank eyes", "unblinking eyes", "piercing eyes", "shadowed eyes", "creepy eyes"]
        },
        clothes: {
          _label: "Choose Your Clothes",
          _type: 'radio',          
          options:  ["ratty clothes", "casual clothes", "goth clothes", "neat clothes", "nerdy clothes"]
        }
      }
    },
    ratings: {
      _label: "Ratings",
      _type: 'radio',
      options: [
          ["Charm + 1", "Cool = 0", "Sharp + 1", "Tough - 1", "Weird + 2"],
          ["Charm - 1", "Cool + 1", "Sharp = 0", "Tough + 1", "Weird + 2"],
          ["Charm + 2", "Cool = 0", "Sharp - 1", "Tough - 1", "Weird + 2"],
          ["Charm = 0", "Cool - 0", "Sharp + 1", "Tough + 1", "Weird + 2"],
          ["Charm - 1", "Cool - 1", "Sharp + 2", "Tough = 1", "Weird + 2"]
      ]
    },
    moves: {
      _label: "Choose 3 Moves",
      _type: 'checkbox',
      _choose: 3,
        
      options: [
        {
          name: "Telepathy",
          description: "You can read people’s thoughts and put words in their mind. This can allow you to investigate a mystery or read a bad situation without needing to actually talk. You can also manipulate someone without speaking. You still roll moves as normal, except people will not expect the weirdness of your mental communication."
        },
        {
          name: "Hex",
          description: "When you cast a spell (with use magic), as wellas the normal effects, you may pick from the following: 1. The target contracts a disease. 2.  The target immediately suffers harm (2-harm magic ignore-armour). 3. The target breaks something precious or important."
        },
        {
          name: "The Sight",
          description: "You can see the invisible, especially spirits and magical influences. You may communicate with (maybe even make deals with) the spirits you see, and they give you more opportunities to spot clues when you investigate a mystery."
        }
      ]
    },
    classSpecific: {
      _label: "The Dark Side",
      _description: "Your powers have an unsavory source, and sometimes you get tempted to do things you shouldn’t. These could be orders from whatever granted your power, or urges that bubble up from your subconscious. Something like that. Whatever it is, it’s unsettling. The Keeper can ask you to do nasty things (in accordance with the tags), when your powers need you to. If you do whatever is asked, mark experience. If you don’t do it, then your powers are unavailable until the end of the mystery (or until you cave). As you mark off Luck boxes, these requests will get bigger and nastier.",
      _type: 'checkbox',
      _choose: 3,
      options: ["violence", "depression", "secrets", "lust", "dark bargain", "guilt", "soulless", "addiction", "mood swings", "rage", "self destruction", "greed for power", "poor impulse control", "hallucinations", "pain", "paranoia"]      
    },
    gear: {
      _label: "Choose 2 Pieces of Gear",
      options: [
        {
          name: "Spooky Weapons",
          type: 'checkbox',
          choose: 2,
          options: [
            ".38 revolver (2-harm close reload loud)",
            "9mm (2-harm close loud)",
            "Hunting rifle (2-harm far loud)",
            "Shotgun (3-harm close messy)",
            "Big knife (1-harm hand)"
          ]
        }
      ]
    },
    history: {
      _label: 'History',
      _type: 'checkbox',
      options: ["They taught you to control your powers, to the extent that you can control them at all.", 
        "You are blood-kin. Decide together exactly what.", 
        "You are married, or romantically involved. Decide between you the exact relationship.", 
        "You’re old friends, and trust each other completely.",
        "You used your powers on them one time. Decide if it was for selfish reasons or not, and tell them if they found out about it.",
        "You’ve known each other some time, but since your powers manifested, you keep them at a distance emotionally.",
        "You hope they can help you control your powers.",
        "They saw you use your powers for selfish or vindictive reasons. Ask them who the victim was, and then tell them what you did."
      ]
    },
    improvements: {
      _label: "Choose Your Improvements",
      _type: 'checkbox',
      options: ["Get +1 Weird, max +3", 
        "Get +1 Charm, max +2",
        "Get +1 Cool, max +2",
        "Get +1 Sharp, max +2",
        "Take another Spooky move",
        "Take another Spooky move",
        "Change some, or all, your dark side tags",
        "Get a mystical library, like the Expert’s haven option",
        "Take a move from another playbook",
        "Take a move from another playbook"
      ]
    },
    advancedImprovements: {
      _label: "Choose Advanced Improvements",
      _type: 'checkbox',
      options: [
        "Get +1 to any rating, max +3.",
        "Change this hunter to a new type.",
        "Create a second hunter to play as well as this one.",
        "Mark two of the basic moves as advanced.",
        "Mark another two of the basic moves as advanced.",
        "Retire this hunter to safety.",
        "You discover how to use your powers at a lower price.",
        "Delete one dark side tag permanently."
      ]
    }
  },



   Professional: {
    class: "The Professional",
    flavorText: 'It’s kind of strange when your regular 9-to-5 job is to hunt down monsters. Still, that’s the job I took on when I joined this outfit. It pays well, and the benefits are good. Like they say “You don’t have to be crazy to work here, but it sure helps!”',
    look: {
      _label: "Choose Your Look",
      options:  {
        gender: {
          _label: "Choose Your Gender",
          _type: 'radio',
          options: ["man", "woman", "concealed"]
        },
        face: {
          _label: "Choose Your Eyes",
          _type: 'radio',
          options: ["chiseled face", "scarred face", "unshaven face", "soft face", "young face", "old face", "determined face"]
        },
        clothes: {
          _label: "Choose Your Clothes",
          _type: 'radio',          
          options:  ["tailored suit", "shabby suit", "perfect suit", "utility overalls", "battle-dress", "paramilitary uniform", "lab coat"]
        }
      }
    },
    ratings: {
      _label: "Ratings",
      _type: 'radio',
      options: [
          ["Charm = 0", "Cool + 2", "Sharp - 1", "Tough + 2", "Weird - 1"],
          ["Charm - 1", "Cool + 2", "Sharp + 1", "Tough + 1", "Weird = 0"],
          ["Charm + 1", "Cool + 2", "Sharp + 1", "Tough - 1", "Weird = 0"],
          ["Charm - 1", "Cool + 2", "Sharp + 1", "Tough = 0", "Weird + 1"],
          ["Charm = 0", "Cool + 2", "Sharp + 2", "Tough - 1", "Weird - 1"]
      ]
    },
    classSpecific: {
      _label: "Agency",
      _description: "Decide who it is you work for. Are they a black-budget government department, a secret military unit, a clandestine police team, a private individual’s crusade, a corporation, a scientific team, or what? Is the Agency’s goal to: destroy monsters, study the supernatural, protect people, gain power, or something else? Pick two resource tags for the Agency, and two red tape tags:",
      options: [
        {
          name: 'Resources',
          choose: 2,
          type: "checkbox",
          options:["Well-armed", "Well-financed", "Rigorous training", "Official Pull", "Cover identities", "Offices all over the place", "Good Intel", "Recognised authority", "Weird tech gadgets", "Support teams"]
        },
        {
          name: 'Red Tape',
          choose: 2,
          type: "checkbox",
          options: ["Dubious motives", "Bureaucratic", "Secretive hierarchy", "Cryptic missions", "Hostile superiors", "Interdepartmental rivalry", "Budget cuts", "Take no prisoners policy", "Live capture policy"]
        }
      ]      
    },
    moves: {
      _label: "Choose 4 Moves",
      _type: 'checkbox',
      _choose: 4,
        
      options: [
        {
          name: "Deal with the Agency",
          type: "mandatory",
          description: "When you deal with the Agency, requesting help or gear, or making excuses for a failure, roll +Sharp. On a 10+, you’re good— your request for gear or personnel is okayed, or your slip-up goes unnoticed. On a 7-9, things aren’t so great. You might get chewed out by your superiors and there’ll be fallout, but you get what you need for the job. On a miss, you screwed up: you might be suspended or under investigation, or just in the doghouse. You certainly aren’t going to get any help until you sort it all out."
        },
        {
          name: "Bottle It Up",
          description: "If you want, you can take up to +3 bonus when you act under pressure. For each +1 you use, the Keeper holds 1. That hold can be spent later—one for one—to give you -1 on any move except act under pressure."
        },
        {
          name: "Unfazeable",
          description: "Take +1 Cool (max +3)."
        },
        {
          name: "Battlefield Awareness",
          description: "You always know what’s happening around you, and what to watch out for. Take +1 armour (max 2-armour) on top of whatever you get from your gear."
        },
        {
          name: "Leave No One Behind",
          description: "In combat, when you help someone escape, roll +Sharp. On a 10+ you get them out clean. On a 7-9, you can either get them out or suffer no harm, you choose. On a miss, you fail to get them out and you’ve attracted hostile attention."
        },
        {
          name: "Tactical Genius",
          description: "When you read a bad situation you may roll +Cool instead of +Sharp"
        },
        {
          name: "Medic",
          description: "You have a full first aid kit, and the training to heal people. When you do first aid, roll +Cool. On a 10+ the patient is stabilized and healed of 2 harm. On a 7-9 choose one: heal 2 harm or stabilize the injury. On a miss, you cause an extra 1 harm. This move takes the place of regular first aid."
        }
      ]
    },
    gear: {
      _label: "Choose One serious weapon and two normal weapons. You get either a flak vest (1-armour hidden) or combat armour (2-armour heavy) for protection.",
      options: [
        {
          name: "Serious weapons (pick one)",
          type: "radio",
          options: [
            "Assault rifle (3-harm far area loud reload)",
            "Grenade launcher (4-harm far area messy loud reload)",
            "Sniper rifle (4-harm far)",
            "Grenades (4-harm close area messy loud)",
            "Submachine gun (3-harm close area loud reload)"
          ]
        },
        {
          name: "Normal weapons (pick two)",
          type: "checkbox",
          choose: 2,
          options: [
            ".38 revolver (2-harm close reload loud)",
            "9mm (2-harm close loud)",
            "Hunting rifle (2-harm far loud)",
            "Shotgun (3-harm close messy)",
            "Big knife (1-harm hand)"
          ]
        }
      ]
    },
    history: {
      _label: 'History',
      _type: 'checkbox',
      options: [
      "Your relationship with them has romantic potential. So far it hasn’t gone further.",
      "They’re on the Agency’s watch list, and you’ve been keeping an eye on them.",
      "You are related. Tell them how close.",
      "You met on a mission and worked together unofficially. And successfully.",
      "They’ve worked with the Agency before, and they’re well regarded.",
      //"You were friends back in training, before the Agency recruited you. This could be military, law enforcement, or some weirder school: decide the details between you.",
      //"They pulled you (and maybe your team) out of a terrible FUBARed mission.",
      "You got sent to “deal with them” as a hazard to the Agency’s policies one time. Tell them how you resolved this."
      ]
    },
    improvements: {
      _label: "Choose Your Improvements",
      _type: 'checkbox',
      options: [
        "Get +1 Cool, max +3", 
        "Get +1 Charm, max +2",
        "Get +1 Sharp, max +2",
        "Get +1 Tough, max +2",
        "Take another Professional move",
        "Take another Professional move",
        "Add a new resource tag for your Agency or change a red tape tag",
        "Get command of an Agency team of monster hunters",
        "Take a move from another playbook",
        "Take a move from another playbook"
      ]
    },
    advancedImprovements: {
      _label: "Choose Advanced Improvements",
      _type: 'checkbox',
      options: [
        "Get +1 to any rating, max +3.",
        "Change this hunter to a new type.",
        "Create a second hunter to play as well as this one.",
        "Mark two of the basic moves as advanced.",
        "Mark another two of the basic moves as advanced.",
        "Retire this hunter to safety.",
        "Get some or all of the other players' hunters hired by your agency. They get the 'Deal with the Agency' move, as well as salary and benefits."
      ]
    }

  },



  Divine: {
    class: "The Divine",
    flavorText: "I am the Light, the Sword. I am sent to defend the meek from Darkness. All Evil fears me, for I am its end.",
    look: {
      _label: "Choose Your Look",
      options:  {
        gender: {
          _label: "Choose Your Gender",
          _type: 'radio',
          options: ["man", "woman", "androgynous", "asexual"]
        },
        eyes: {
          _label: "Choose Your Eyes",
          _type: 'radio',
          options: ["blazing eyes", "terrifying eyes", "placid eyes", "sparkling eyes", "perceptive eyes", "starry eyes", "glowing eyes"]
        },
        clothes: {
          _label: "Choose Your Clothes",
          _type: 'radio',          
          options:  ["dirty clothes", "perfect suit", "rumpled suit", "casual clothes", "practical clothes"]
        }
      }
    },
    ratings: {
      _label: "Ratings",
      _type: 'radio',
      options: [
          ["Charm + 1", "Cool + 1", "Sharp - 1", "Tough + 2", "Weird = 0"],
          ["Charm - 1", "Cool + 2", "Sharp - 0", "Tough + 2", "Weird = 0"],
          ["Charm - 1", "Cool = 0", "Sharp + 1", "Tough + 2", "Weird + 1"],
          ["Charm + 1", "Cool + 1", "Sharp = 0", "Tough + 2", "Weird - 1"],
          ["Charm - 1", "Cool + 1", "Sharp = 0", "Tough + 2", "Weird + 1"]
      ]
    },
    classSpecific: {
      _label: "Mission",
      _description: "You have been put on Earth for a purpose. Pick one:",
      _type: 'radio',
      options: ["You are here to fight the schemes of an Adversary.", "The End of Days approaches. Your role is to guide these hunters and prevent it from coming to pass.", "The End of Days approaches. Your role is to guide these hunters and ensure it comes to pass.", "You have been exiled. You must work for the cause of Good without drawing attention from your brothers and sisters, as they are bound to execute you for your crimes", "One of the other hunters has a crucial role to play in events to come. You must prepare them for their role, and protect them at any cost"]      
    },
    moves: {
      _label: "Choose 3 Moves",
      _type: 'checkbox',
      _choose: 3,
      options: [
        {
          name: "Boss from Beyond",
          description: "At the beginning of each mystery, roll +Weird. On a 10+, your Superiors ask you to do something simple. On a 7-9, they ask you to do something complicated or difficult. In either case, you get to ask them one of the questions from the investigate a mystery move right now. On a miss, you are required to do something terrible. If you do not accomplish what they’ve ordered, you cannot use this move again until you have made up for your failure."
        },
        {
          name: "Angel Wings",
          description: "You can go instantly to anywhere you’ve visited before, or to a person you know well. When you carry one or two people with you, roll +Weird. On a 10+ you all go where you wanted. On a 7-9, you don’t quite manage it. Either you are all separated, or you all appear in the wrong place."
        },
        {
          name: "What I Need, When I Need It",
          description: "You may store any small object you own, putting it into a magical space nobody can get to. You may retrieve anything you stored at any time; it appears in your hand."
        }
      ]
    },
    gear: {
      _label: "Pick one divine weapon",
      options: [
        {
          name: "Divine Weapon",
          type: "radio",
          options:  [
            "Flaming sword (3-harm hand fire holy)",
            "Thunder hammer (3-harm hand stun holy)",
            "Razor whip (3-harm hand area messy holy)",
            "Five demon bag (3-harm close magic holy)",
            "Silver trident (3-harm hand silver holy)"
            ]
        }
       
      ]
    },
    history: {
      _label: 'History',
      _type: 'checkbox',
      options: ["If you are protecting another hunter as your mission, tell them this: You have a crucial role in what is to come. I am here to guide and defend you.", 
        "They should not be involved in this situation: the prophecies didn’t mention them at all. This gets your attention but you don’t know what it means yet.", 
        "They are, at heart, a good and righteous person. You must help them stay that way.", 
        "They are an abomination, and should be destroyed. Except you can’t–work out with them why not.",
        "Their prayer (perhaps an informal or even unconscious prayer) summoned you.",
        "They fill you with feelings of sexual infatuation. You are confused by the associated mortal emotions.",
        "They saved your life, and you understand (intellectually at least) that you owe them for it.",
        "They’re the person you go to for advice on mortal stuff (e.g sex, food, drugs, television, etc)."
      ]
    },
    improvements: {
      _label: "Choose Your Improvements",
      _type: 'checkbox',
      options: ["Get +1 Tough, max +3", 
        "Get +1 Cool, max +2",
        "Get +1 Charm, max +2",
        "Get +1 Sharp, max +2",
        "Get +1 Weird, max +2",
        "Take another Divine move",
        "Take another Divine move",
        "Gain a lesser divine being as an ally, sent from above to help with your mission",
        "Take a move from another playbook",
        "Take a move from another playbook"
      ]
    },
    advancedImprovements: {
      _label: "Choose Advanced Improvements",
      _type: 'checkbox',
      options: [
        "Get +1 to any rating, max +3.",
        "Change this hunter to a new type.",
        "Create a second hunter to play as well as this one.",
        "Mark two of the basic moves as advanced.",
        "Mark another two of the basic moves as advanced.",
        "Retire this hunter to safety.",
        "Erase one used Luck mark from your playbook",
        "Change your mission.  Select a different mission from the normal options, or (with the Keeper's agreement) a new mission o f your creation."
      ]
    },
  },


};
