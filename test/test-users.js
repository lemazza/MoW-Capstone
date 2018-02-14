'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

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

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Users API resource', function() {
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
  let testUserId = ""
  let testAuthToken = "";

  describe('User Authentication', function() {
    //expect 201 status, json object with username, id, first and last,
    //check db for extra person
    describe('POST Endpoint', function() {
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

    describe('LOGIN endpoint', function() {
      it('should return a jwt', function() {
        let newUserLogin = {
          userName: newUser.username,
          password: newUser.password
        };

        return chai.request(app)
          .get('/api/auth/login')
          .send(newUserLogin)
          .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('authToken');
            expect(res.body.authToken).to.not.be.null;
            testAuthToken = res.body.authToken
          });
      });
    });


  });


  //edit new user

  //create character

  //edit character

  //delete character

  //delete user
});