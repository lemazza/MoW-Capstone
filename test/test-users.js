'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;
const assert = chai.assert;

const {app, runServer, closeServer} = require('../server');
const {User, Character} = require('../models');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


function seedUsersCollection () {
  console.log('seeding user collection')
  const seedData = [];

  for (let i=1; i<= 10; i++) {
    seedData.push(generateFakeUser());
  }

  return User.insertMany(seedData);
}

function generateFakeUser () {
  return {
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password()
  };
}

function randomClass() {
  let classArray = ['Divine', 'Spooky', 'Professional'];
  let randIndex = Math.floor(Math.random()* classArray.length);
  return classArray[randIndex];
}

function randomNum (max) {
  return Math.floor(Math.random() * max)
}

let harmNum = randomNum(7)
let unst = (harmNum > 5)? true : false;

function generateFakeCharacter () {
  
  return {
    name: faker.name.firstName() + faker.name.lastName(),
    image: faker.image.avatar(),
    class: randomClass(),
    luck: randomNum(5),
    harm: {
      number: harmNum,
      unstable: unst
    },
    experience: randomNum(5),
    Spooky: {
      look: faker.random.objectElement(),
      ratings: faker.random.words(),
      history: faker.random.objectElement(),
      gear: faker.random.objectElement(),
      moves: faker.random.objectElement(),
      improvements: faker.random.objectElement(),
      advancedImprovements: faker.random.objectElement(),
      classSpecific: faker.random.objectElement(),
    },
    Divine: {
      look: faker.random.objectElement(),
      ratings: faker.random.words(),
      history: faker.random.objectElement(),
      gear: faker.random.objectElement(),
      moves: faker.random.objectElement(),
      improvements: faker.random.objectElement(),
      advancedImprovements: faker.random.objectElement(),
      classSpecific: faker.random.objectElement(),
    },
    Professional: {
      look: faker.random.objectElement(),
      ratings: faker.random.words(),
      history: faker.random.objectElement(),
      gear: faker.random.objectElement(),
      moves: faker.random.objectElement(),
      improvements: faker.random.objectElement(),
      advancedImprovements: faker.random.objectElement(),
      classSpecific: faker.random.objectElement()
    }
  }
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('MoW API resources', function() {
  before(function(){
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function(){
    return seedUsersCollection();
  });
  afterEach(function(){
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });


  const newUser = generateFakeUser();
  const newChar = generateFakeCharacter();
  let testUserId = ""
  let testAuthToken = "";
  let newUserLogin = {
    userName: newUser.username,
    password: newUser.password
  };

  describe('User Experience', function() {
    //expect 201 status, json object with username, id, first and last,
    //check db for extra person
    describe('Create new User at POST Endpoint', function() {
      it('should add a new user', function() {
        return chai.request(app)
          .post('/api/users')
          .send(newUser)
          .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('id', 'userName', 'name', 'characters');
            expect(res.body.id).to.not.be.null;
            expect(res.body.userName).to.equal(newUser.userName);
            expect(res.body.name).to.equal(newUser.firstName + " " + newUser.lastName);
            testUserId = res.body.id;
            return User.findById(res.body.id);
          })
          .then(function(user){
            expect(user.userName).to.equal(newUser.userName);
            expect(user.firstName).to.equal(newUser.firstName);
            expect(user.email).to.equal(newUser.email);
          });
      });      
    });

    describe('User LOGIN endpoint', function() {
      it('should return a jwt', function() {
        
        return chai.request(app)
          .post('/api/users')
          .send(newUser)
          .then(
            chai.request(app)
            .post('/api/auth/login')
            .send(newUserLogin)
            .then(function(res){
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.a('object');
              expect(res.body).to.include.keys('authToken');
              expect(res.body.authToken).to.not.be.null;
              testAuthToken = res.body.authToken
            })
          )
      });
    });

    describe('Update User', function() {
      it('should change user info', function() {
        
        let updateInfo = {
          email: faker.internet.email(),
          lastName: faker.name.firstName(),
          firstName: faker.name.lastName()
        }
        return chai.request(app)
          .post ('/api/users')
          .send(newUser)
          .then(
            chai.request(app)
            .post('api/auth/login')
            .send(newUserLogin)
            .then(res => {
              newUser.userId = res.body.userId;
              newUser.authToken = res.body.authToken;
            })
            .then(
              chai.request(app)
              .put(`api/users/${newUser.userId}`)
              .set('Authorization', "Bearer" + newUser.authToken)
              .send(updateInfo)
              .then(res => {
                assert.isEqual(res.status, 200);
                assert.typeOf(res.body, "object");
                assert.containsAllKeys(res.body, ['id', 'name', 'email', 'userName', 'characters']);
                assert.isEqual(res.body.email, updateInfo.email);
                assert.isEqual(updateInfo.firstName + " " + updateInfo.lastName, res.body.name);
              })
            )
          )
      })
    })


    describe('Character', function() {
      it('User can create a character', function() {

        return chai.request(app)
          .post ('/api/users')
          .send(newUser)
          .then(
            chai.request(app)
            .post('/api/auth/login')
            .send(newUserLogin)
            .then(res => {
              newUser.userId = res.body.userId;
              newUser.authToken = res.body.authToken;
              newChar.creator = res.body.userId;
            })
            .then(
              chai.request(app)
              .post(`/api/characters/`)
              .send(newChar)
              .then(res => {
                assert.isEqual(res.status, 201);
                assert.typeOf(res.body, "object");
                assert.containsAllKeys(res.body, ['id', 'name', 'image', 'creator', 'class', 'luck', 'harm', 'experience', 'Spooky', 'Divine', 'Professional']);
                assert.isEqual(res.body.name, newChar.name);
                assert.isEqual(res.body.class, newChar.class);
                newChar.id = res.body.id;
              })
            )
          )
      })
    })

    describe('Character Update', function() {
      it('character can be updated', function() {

        let updateChar = {
          id: newChar.id,
          image: faker.image.avatar(),
          class: randomClass(),
          luck: randomNum(5),
          harm: {
            number: harmNum,
            unstable: unst
          },
          experience: randomNum(5),
          Spooky: {
            look: faker.random.objectElement(),
            ratings: faker.random.words(),
            history: faker.random.objectElement(),
            gear: faker.random.objectElement(),
            moves: faker.random.objectElement(),
            improvements: faker.random.objectElement(),
            advancedImprovements: faker.random.objectElement(),
            classSpecific: faker.random.objectElement(),
          },
          Divine: {
            look: faker.random.objectElement(),
            ratings: faker.random.words(),
            history: faker.random.objectElement(),
            gear: faker.random.objectElement(),
            moves: faker.random.objectElement(),
            improvements: faker.random.objectElement(),
            advancedImprovements: faker.random.objectElement(),
            classSpecific: faker.random.objectElement(),
          },
          Professional: {
            look: faker.random.objectElement(),
            ratings: faker.random.words(),
            history: faker.random.objectElement(),
            gear: faker.random.objectElement(),
            moves: faker.random.objectElement(),
            improvements: faker.random.objectElement(),
            advancedImprovements: faker.random.objectElement(),
            classSpecific: faker.random.objectElement()
          }
        }

        return chai.request(app)
          .post ('/api/users')
          .send(newUser)  //CREATE USER
          .then(
            chai.request(app)
            .post('/api/auth/login')
            .send(newUserLogin) //login USER to get authToken
            .then(res => {
              newUser.userId = res.body.userId;
              newUser.authToken = res.body.authToken;
              newChar.creator = res.body.userId;
              updateChar.creator = res.body.userId;
            })
            .then(
              chai.request(app)
              .post(`/api/characters/`)
              .send(newChar)  //create new CHAR
              .then(res=>{
                updateChar.id = res.body.id;
              })
              .then(
                chai.request(app)
                .put(`api/characters/${newChar.id}`)
                .set('Authorization', "Bearer" + newUser.authToken)
                .send(updateChar)
                .then(res => {
                  console.log("RES", res);
                  assert.isEqual(res.status, 200);
                  assert.typeOf(res.body, "object");
                  assert.containsAllKeys(res.body, ['id', 'name', 'image', 'creator', 'class', 'luck', 'harm', 'experience', 'Spooky', 'Divine', 'Professional']);
                  assert.isEqual(res.body.name, updateChar.name);
                  assert.isEqual(res.body.class, updateChar.class);
                })
              )
            )
          )
      })
    })


    describe('delete Character', function() {
      it('character can be deleted', function() {

        return chai.request(app)
        .post ('/api/users')
        .send(newUser)  //CREATE USER
        .then(
          chai.request(app)
          .post('/api/auth/login')
          .send(newUserLogin) //login USER to get authToken
          .then(res => {
            newUser.userId = res.body.userId;
            newUser.authToken = res.body.authToken;
            newChar.creator = res.body.userId;
            updateChar.creator = res.body.userId;
          })
          .then(
            chai.request(app)
            .post(`/api/characters/`)
            .send(newChar)  //create new CHAR
            .then(
              chai.request(app)
              .delete(`api/characters/${newChar.id}`) //delete character
              .then(
                Character
                .findById(newChar.id)
                .then(res=>{
                  assert.isNull(res);
                })
              )
            )
          )
        )
      })
    })
    

    describe('Delete User', function() {
      it('should delete user info', function() {
        
        return chai.request(app)
          .post ('/api/users')
          .send(newUser)
          .then(
            chai.request(app)
            .post('api/auth/login')
            .send(newUserLogin)
            .then(res => {
              newUser.userId = res.body.userId;
              newUser.authToken = res.body.authToken;
            })
            .then(
              chai.request(app)
              .delete(`api/users/${newUser.userId}`)
              .then(
                User
                .findById(newUser.userId)
                .then(res=>{
                  assert.isNull(res);
                })
              )
            )
          )
      })
    })
      
    

  });

});