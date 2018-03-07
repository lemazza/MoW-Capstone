const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');

mongoose.Promise = global.Promise;

const router = express.Router();

const {Character, User} = require('./models');

const jwtAuth = passport.authenticate('jwt', { session: false });


router.use(morgan('common'));
router.use(bodyParser.json());

//test text

router.get('/random', (req, res) => {
  let totalResults, randomNum;
  Character
    .find({image: {$exists: true}})
    .then(characters=> {
      totalResults = Object.keys(characters).length;
      randomNum = Math.floor(Math.random() * totalResults);
      return characters[randomNum];
    })
    .then(character => {
      res.json(character.serialize())
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
});

router.get('/:id', (req, res) => {
  Character
    .findById(req.params.id)
    .then(character => res.json(character.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
});



router.post('/', jwtAuth, (req, res) => {
  const requiredFields = ['creator', 'charName', 'classType'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Character
    .create({
      creator: req.body.creator,
      name: req.body.charName,
      image: req.body.characterImage,
      class: req.body.classType,
      luck: req.body.luck,
      harm: req.body.harm,
      experience: req.body.experience,
      Spooky: req.body.Spooky,
      Divine: req.body.Divine,
      Professional: req.body.Professional,
    })
    .then(character => {
      User
      .findByIdAndUpdate(req.body.creator, {$push: {characters: character.id} })
      .then(function(){
      res.status(201).json(character.serialize());
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });

});


router.put('/:id', jwtAuth, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['charName', 'description', 'image', 'classType', 'charm', 'cool', 'sharp', 'tough', 'weird', 'luck', 'harm', 'experience', 'gear', 'moves', 'public'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Character
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedcharacter => res.status(200).json(updatedcharacter.serialize()))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});



router.delete('/:id', jwtAuth, (req, res) => {
  Character
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted blog character with id \`${req.params.id}\``);
      res.status(204).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});



router.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});


module.exports = router;
