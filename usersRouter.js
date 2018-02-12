const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');

mongoose.Promise = global.Promise;

const router = express.Router();

const {User, Character} = require('./models');

const jwtAuth = passport.authenticate('jwt', { session: false });


router.use(morgan('common'));
router.use(bodyParser.json());


/*
router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.json({
        users: users.map(user => user.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
});
*/


router.get('/:username', jwtAuth, (req, res) => {
  User
    .findOne({'userName' : req.params.username})
    .then(user => res.json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
});

















router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['email', 'userName', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['userName', 'password', 'email','firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  // If the username and password aren't trimmed we give an error.  Users might
  // expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // explicitly so the users know what's happening, rather than silently
  // trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // to log in, so it's less of a problem.
  const explicityTrimmedFields = ['userName', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    userName: {
      min: 1
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {userName, password, firstName = '', lastName = ''} = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({userName})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same userName
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'userName already taken',
          location: 'userName'
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        userName,
        password: hash,
        firstName,
        lastName
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});














/*

router.post('/', (req, res) => {
  const requiredFields = ['email', 'password', 'userName'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
*/


  User
    .create({
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      name: req.body.name,
      characters: req.body.characters,
    })
    .then(users => res.status(201).json(users.serialize()))
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
  const updateableFields = ['email', 'userName', 'password', 'name', 'characters'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updateduser => res.status(200).json(updateduser.serialize()))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});



router.delete('/:id', jwtAuth, (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted blog user with id \`${req.params.id}\``);
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
