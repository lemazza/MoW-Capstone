const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

const router = express.Router();

const {Character, User} = require('./models');



router.use(morgan('common'));
router.use(bodyParser.json());



router.get('/', (req, res) => {
  Character
    .find()
    .then(characters => {
      res.json({
        characters: characters.map(character => character.serialize())
      });
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



router.post('/', (req, res) => {
  const requiredFields = ['creator', 'name', 'class'];
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
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      class: req.body.class,
      charm: req.body.charm,
      cool: req.body.cool,
      sharp: req.body.sharp,
      tough: req.body.tough,
      weird: req.body.weird,
      luck: req.body.luck,
      harm: req.body.harm,
      experience: req.body.experience,
      gear: req.body.gear,
      moves: req.body.moves
    })
    .then(characters => res.status(201).json(characters.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });

});


router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['name', 'description', 'image', 'class', 'charm', 'cool', 'sharp', 'tough', 'weird', 'luck', 'harm', 'experience', 'gear', 'moves'];
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



router.delete('/:id', (req, res) => {
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
