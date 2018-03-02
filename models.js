'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;


/*=================================================
  CAMPAIGNS
==================================================


const campaignSchema = mongoose.Schema({
  campaignName: {type: String, required: true},
  keeper: {type: ObjectId, ref: 'User', required: true},
  players: [{type: ObjectId, ref: 'User'}],
  characters: [{type: ObjectId, ref:'User'}],
  description: {
    backstory: String,
    episodes: [{
      title: String,
      story: String,
      epImage: String
    }]
  },
  image: String,
  public: Boolean
});

campaignSchema.methods.serialize = function() {
  return {
    id: this._id,
    campaignName: this.campaignName,
    keeper: this.keeper,
    players: this.players,
    characters: this.characters,
    description: this.description,
    image: this.image
  };
};




=================================================
  USERS
==================================================*/

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  userName: {type: String, required: true, unique: true},
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  //campaigns: [{type: ObjectId, ref: 'Campaign'}],
  characters: [{type: ObjectId, ref: 'Character'}]
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    userName: this.userName,
    characters: this.characters,
    name: this.fullName
  };
};



userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};



/*=================================================
  CHARACTERS
==================================================*/

const characterSchema = mongoose.Schema({
  name: {type: String, required: true},
  creator: {type: ObjectId, ref: 'User', required: true},
  image: String,
  class: {type: String, required: true},
  luck: Number,
  harm: {
    number: Number,
    unstable: Boolean
  },
  experience: Number,
  Spooky: {
    look: Object,
    ratings: String,
    history: Object,
    gear: Object,
    moves: Object,
    improvements: Object,
    advancedImprovements: Object,
    classSpecific: Object,
  },
  Divine: {
    look: Object,
    ratings: String,
    history: Object,
    gear: Object,
    moves: Object,
    improvements: Object,
    advancedImprovements: Object,
    classSpecific: Object,
  },
  Professional: {
    look: Object,
    ratings: String,
    history: Object,
    gear: Object,
    moves: Object,
    improvements: Object,
    advancedImprovements: Object,
    classSpecific: Object,
  }
})
     
characterSchema.methods.serialize = function() {
  return {
    id: this._id,
    creator: this.creator,
    name: this.name,
    image: this.image,
    class: this.class,
    luck: this.luck,
    harm: this.harm,
    experience: this.experience,
    Spooky: this.Spooky,
    Professional: this.Professional,
    Divine: this.Divine
  };
};


characterSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

characterSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};


/*=================================================
  EXPORTS
==================================================*/

//const Campaign = mongoose.model('Campaign', campaignSchema);
const User = mongoose.model('User', userSchema);
const Character = mongoose.model('Character', characterSchema);


module.exports = {Character, User};
