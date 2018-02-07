'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;


/*=================================================
  CAMPAIGNS
==================================================*/

const campaignSchema = mongoose.Schema({
  campaignName: {type: String, required: true},
  keeper: {type: ObjectId, ref: 'User', required: true},
  players: [{type: ObjectId, ref: 'User'}],
  characters: [{type: hunter, ref:'User'}],
  description: {
    backstory: String,
    episodes: [{
      title: String,
      story: String,
      epImage: String
    }]
  }
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




/*=================================================
  USERS
==================================================*/

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  userName: {type: String, required: true},
  name: {
    firstName: String,
    lastName: String
  },
  campaigns: [{type: ObjectId, ref: 'Campaign'}],
  hunters: [{
    hunter: {
      name: String,
      type: String,
      charm: Number,
      cool: Number,
      sharp: Number,
      tough: Number,
      weird: Number,
      luck: Number,
      harm: Number,
      experience: Number
    }
  }]
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    userName: this.userName,
    name: this.name,
    campaigns: this.campaigns
    hunters: this.hunters
  };
};



/*=================================================
  EXPORTS
==================================================*/

const Campaign = mongoose.model('Campaign', campaignSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Campaign, User};
