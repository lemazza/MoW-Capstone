const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

const router = express.Router();

const {User, Campaign} = require('./models');



router.use(morgan('common'));
router.use(bodyParser.json());



router.get('/', (req, res) => {
  Campaign
    .find()
    .then(campaigns => {
      res.json({
        campaigns: campaigns.map(campaign => campaign.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
});

router.get('/:id', (req, res) => {
  Campaign
    .findById(req.params.id)
    .then(campaign => res.json(campaign.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
});



router.post('/', (req, res) => {
  const requiredFields = ['keeper', 'campaignName'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Campaign
    .create({
      title: req.body.title,
      campaignName: req.body.campaignName,
      keeper: req.body.keeper,
      players: req.body.players,
      characters: req.body.characters,
      description: req.body.description,
      image: req.body.image,
      public: req.body.public,
      image: req.body.image,
      public: req.body.public
    })
    .then(campaigns => res.status(201).json(campaigns.serialize()))
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
  const updateableFields = ['title', 'campaignName', 'keeper', 'players', 'characters', 'description', 'image', 'public'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Campaign
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedcampaign => res.status(200).json(updatedcampaign.serialize()))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});



router.delete('/:id', (req, res) => {
  Campaign
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted blog campaign with id \`${req.params.id}\``);
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
