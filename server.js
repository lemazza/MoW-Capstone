
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const ejs = require('ejs');
const fs = require('fs');
const request = require('request');
const {Character, User} = require('./models');
require('dotenv').config();


const { router: authRouter, localStrategy, jwtStrategy} = require('./auth');

const { DATABASE_URL, PORT } = require('./config');
const {data} = require('./data');

const usersRouter = require('./usersRouter');
const charactersRouter = require('./charactersRouter');
//const campaignsRouter = require('./campaignsRouter');

const app = express();


app.get('/character-creator.js', (req, res)=>{
  fs.readFile(__dirname + '/public/character-creator.js', (err, contents) =>{
    if (err) throw err;
    let content = `const DATA = ${JSON.stringify(data)};\n
    ${contents}`;
    res.set('Content-Type', 'text/javascript');
    res.send(content);
  })
})


//test
app.use(morgan('common'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.use(express.static('public'));
//app.use('/api/campaigns', campaignsRouter);
app.use('/api/users', usersRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/auth', authRouter);

function renderCharacterCreator(req, res){
  res.render('character-creator', {
      data: data, 
      fileExists: require('fs').existsSync, 
      __dirname: __dirname
  });  
}

app.get('/character-maker', renderCharacterCreator);


app.get('/character/:id*', function(req, res, next){
  Character
    .findById(req.params.id)
    .populate('creator')
    .then(character => {
      console.log('Setting res.locals.character:', character);
      res.locals.character = character || false;
      next();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
});

app.get('/character/:id/edit', renderCharacterCreator);

app.get('/character/:id', (req, res)=>{  
    res.render('character', {data: data})
  
 /* let charRequest = __dirname+ '/api/characters/' + req.params.id;
  request.get(charRequest, function(err, response, body) {
    if (!err && response.statusCode == 200) {
        var locals = JSON.parse(body);
        res.render('character', {character: locals, data: data});
    } else {
      console.log('err is', err);
      console.log('body is', body);
    }
  })*/
})


app.get('/user/edit', jwtAuth, (req, res)=>{
  console.log("req.user is :", req);
  User
    .findOne({userName: req.user.userName})
    .then(user=>{
      res.render('user-edit', {data: data, user: user, UserSchema: User.schema.paths})
    })
  //.catch(err => {
   //console.error(err);
    //res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
  //});
})

app.put('/user/edit', jwtAuth, (req, res)=>{
  res.render('user-edit', {data: data, user: req.user.serialize()})
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
  });
})



app.get('/user/:id', (req, res)=>{
  User
    .findById(req.params.id)
    .populate('characters')
    .then(user => {
      res.render('user', {data: data, user: user.serialize()})
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.  Be sure your request is properly formatted.' });
    });
})



app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});


// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});


let server;


function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}


function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}


module.exports = { runServer, app, closeServer };
