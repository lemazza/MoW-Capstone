
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { DATABASE_URL, PORT } = require('./config');

const usersRouter = require('./usersRouter');
const campaignsRouter = require('./campaignsRouter');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use('/api/campaigns', campaignsRouter);
app.use('/api/users', usersRouter);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
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
