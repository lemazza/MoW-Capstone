
exports.data = {
  Spooky: {
    class: "The Spooky",
    flavorText: "I can do things, things that normal people can’t. But there’s a price—I haven’t paid it in full, yet, but the bill’s gonna come due soon. It’s best I don’t tell you any more. You get too close, you’ll get hurt.",
    look: {
      gender: ["man", "woman", "boy", "girl", "concealed", "androgynous"],
      eyes: ["burning eyes", "dark eyes", "blank eyes", "unblinking eyes", "piercing eyes", "shadowed eyes", "creepy eyes"],
      clothes: ["ratty clothes", "casual clothes", "goth clothes", "neat clothes", "nerdy clothes"]
    },
    ratings: [
      ["Charm + 1", "Cool = 0", "Sharp + 1", "Tough - 1", "Weird + 2"],
      ["Charm - 1", "Cool + 1", "Sharp = 0", "Tough + 1", "Weird + 2"],
      ["Charm + 2", "Cool = 0", "Sharp - 1", "Tough - 1", "Weird + 2"],
      ["Charm = 0", "Cool - 0", "Sharp + 1", "Tough + 1", "Weird + 2"],
      ["Charm - 1", "Cool - 1", "Sharp + 2", "Tough = 1", "Weird + 2"]
    ],
    classSpecific: {
      darkSide: {
            name: "The Dark Side",
            description: "Your powers have an unsavory source, and sometimes you get tempted to do things you shouldn’t. These could be orders from whatever granted your power, or urges that bubble up from your subconscious. Something like that. Whatever it is, it’s unsettling.",
            choose: 3,
            options: ["violence", "depression", "secrets", "lust", "dark bargain", "guilt", "soulless", "addiction", "mood swings", "rage", "self destruction", "greed for power", "poor impulse control", "hallucinations", "pain", "paranoia"]
          }
    },
    history: ["They taught you to control your powers, to the extent that you can control them at all.", 
      "You are blood-kin. Decide together exactly what.", 
      "You are married, or romantically involved. Decide between you the exact relationship.", 
      "You’re old friends, and trust each other completely.",
      "You used your powers on them one time. Decide if it was for selfish reasons or not, and tell them if they found out about it.",
      "You’ve known each other some time, but since your powers manifested, you keep them at a distance emotionally.",
      "You hope they can help you control your powers.",
      "They saw you use your powers for selfish or vindictive reasons. Ask them who the victim was, and then tell them what you did."
    ],
    improvements: ["Get +1 Weird, max +3", 
      "Get +1 Charm, max +2",
      "Get +1 Cool, max +2",
      "Get +1 Sharp, max +2",
      "Take another Spooky move",
      "Take another Spooky move",
      "Change some, or all, your dark side tags",
      "Get a mystical library, like the Expert’s haven option",
      "Take a move from another playbook",
      "Take a move from another playbook"
    ],
    advancedImprovements: [
      "Get +1 to any rating, max +3.",
      "Change this hunter to a new type.",
      "Create a second hunter to play as well as this one.",
      "Mark two of the basic moves as advanced.",
      "Mark another two of the basic moves as advanced.",
      "Retire this hunter to safety.",
      "You discover how to use your powers at a lower price.",
      "Delete one dark side tag permanently."],
    moves: {
      choose: 3,
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
    gear: {
      choose: 2,
      options: [
        ".38 revolver (2-harm close reload loud)",
        "9mm (2-harm close loud)",
        "Hunting rifle (2-harm far loud)",
        "Shotgun (3-harm close messy)",
        "Big knife (1-harm hand)"
      ]
    },
  },



 Wronged: {
  class: "The Wronged",
  flavorText: "They took my loved ones. Back then I wasn’t strong enough to fight, but I studied, trained, and now I’m ready to cleanse the world of their taint. I’ll kill them all. That’s all I have left.",
 },



 Divine: {
  class: "The Divine",
  description: "I am the Light, the Sword. I am sent to defend the meek from Darkness. All Evil fears me, for I am its end."
 },


};

console.log("data is wire");

exports.Wronged = "Its working";