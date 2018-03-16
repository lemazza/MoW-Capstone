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


function generateFakeCharacter () {
  
  let harmNum = randomNum(7)
  let unst = (harmNum > 5)? true : false;

  return {
    charName: faker.name.firstName() + faker.name.lastName(),
    characterImage: faker.image.avatar(),
    classType: randomClass(),
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

function generateUpdateCharacter (origCharId) {
  let harmNum = randomNum(7)
  let unst = (harmNum > 5)? true : false;
  return {
    id: origCharId,
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
/*=====================================================================
  DEFINE USER API REQUESTS
=====================================================================*/
let userCreate = new Promise ((resolve, reject) => {
  let newUser = generateFakeUser();
  chai.request(app)
  .post('/api/users')
  .send(newUser)
  .then(function(res){
    let userObj = newUser;
    userObj.id = res.body.id;
    userObj.authToken = res.body.authToken;
    let resObj = {};
    resObj.user = userObj;
    resObj.res = res;
    //returns object with 2 keys.  'user' is the original user info, 'res' is the response
    resolve(resObj);
  })
})


function getAuthToken (resObj) {
  let userLogin = {userName: resObj.user.userName, password: resObj.user.password};

  return new Promise ((resolve, reject) => {
  //takes object with key 'user' and subkeys 'userName' & 'password' and returns response
  
  chai.request(app)
  .post('/api/auth/login')
  .send(userLogin)
  .then(function(res) {
    resObj.res = res;
    resolve(resObj);
  })
  .catch(err=>{
    console.log("something went wrong in getAuthToken", err.status, err.Error);
  })
 }) 
}


function editUserInfo (resObj){

  let updateInfo = {
    email: faker.internet.email(),
    lastName: faker.name.firstName(),
    firstName: faker.name.lastName(),
    id: resObj.user.id,
    headers: {'Content-Type': 'application/json'}
  };
  User.findById(resObj.user.id).then(user=> console.log("user in DB", user))
  updateInfo.headers.authorization = "Bearer " + resObj.user.authToken;
  console.log('resObj in editUserInfo', resObj.user);
  return chai.request(app)
  .put(`api/users/${resObj.user.id}`)
  .set('Authorization', `Bearer ${resObj.user.authToken}`)
  .send(updateInfo)
  .then(res=>{
    resObj.res = res;
    console.log("resObj.res in edit UserInfo", resObj.res);
    return resObj;
  })
  .catch(err=>{
    console.log("error in editUserInfo", err);
    return err.status;
  })
}

function createCharacter (resObj) {
  let newChar = generateFakeCharacter();
  newChar.creator = resObj.user.id;
  return chai.request(app)
  .post(`/api/characters/`)
  .set("Authorization", `Bearer ${resObj.user.authToken}`)
  .send(newChar)
  .then(newCharRes=>{
    resObj.postChar = newChar;
    resObj.res = newCharRes;
    return resObj
  })
}



function userPath() {
  userCreate()
  .then(getAuth)
}

/*===================================================================
  TESTS
=====================================================================*/


describe('MoW API resources', function() {
  before(function(){
    return runServer(TEST_DATABASE_URL);
  });
  /*beforeEach(function(){
    return seedUsersCollection();
  });*/
  //afterEach(function(){
  //  return tearDownDb();
  //});
  after(function() {
    return closeServer();
  });


  

  describe('User Experience', function() {
    //expect 201 status, json object with username, id, first and last,
    //check db for extra person
    describe('Create new User at POST Endpoint', function() {
      it('should add a new user', function() {
        let user
        return userCreate.then(function(res) {
          user = res.user
          expect(res.res).to.have.status(201);
          expect(res.res).to.be.json;
          expect(res.res.body).to.be.a('object');
          expect(res.res.body).to.not.be.null;
          expect(res.res.body).to.include.keys('id', 'userName', 'name', 'characters', 'authToken');
          expect(res.res.body.id).to.not.be.null;
          expect(res.res.body.userName).to.equal(user.userName);
          expect(res.res.body.name).to.equal(user.firstName + " " + user.lastName);
          let testUserId = res.res.body.id;
          User
          .findById(testUserId)
          .then(function(user){
            expect(user.userName).to.equal(user.userName);
            expect(user.firstName).to.equal(user.firstName);
            expect(user.email).to.equal(user.email);
          });
        });
      });      
    });

    describe('User LOGIN endpoint', function() {
      it('should return a jwt', function() {
        
        
        return userCreate
          .then(resObj=>{
            return getAuthToken(resObj)
          })
          .then(function(res){
            expect(res.res).to.have.status(200);
            expect(res.res).to.be.json;
            expect(res.res.body).to.be.a('object');
            expect(res.res.body).to.include.keys('authToken');
            expect(res.res.body.authToken).to.not.be.null;
          })    
      });
    });



    describe('Update User', function() {
      it('should change user info', function() {

        return userCreate
        .then(resObj=> {
          return editUserInfo(resObj);
        })  
        .then(res => {
          console.log("og user:", res.user, "res.body", res.res.body);
          assert.equal(res.res.status, 200);
          assert.typeOf(res.res.body, "object");
          assert.containsAllKeys(res.res.body, ['id', 'name', 'email', 'userName', 'characters']);
          assert.equal(res.res.body.email, updateInfo.email);
          assert.equal(updateInfo.firstName + " " + updateInfo.lastName, res.body.name);
        })
      })
    })


    describe('Character', function() {
      it('User can create a character', function() {

        return userCreate
        .then((resObj)=>{
          return createCharacter(resObj)
        })
        .then(resObj => {
          assert.equal(resObj.res.status, 201);
          assert.typeOf(resObj.res.body, "object");
          expect(resObj.res.body).to.have.all.keys('id', 'name', 'image', 'creator', 'class', 'luck', 'harm', 'experience', 'Spooky', 'Divine', 'Professional');
          assert.equal(resObj.res.body.name, resObj.postChar.charName);
          assert.equal(resObj.res.body.class, resObj.postChar.classType);
        })
      })
    })

    describe('Character Update', function() {
      it('character can be updated', function() {


        return userCreate
        .then((resObj)=>{
          return createCharacter(resObj)
        })
        .then(resObj=>{
          let updateChar = generateUpdateCharacter(resObj.res.body.id);

          return chai.request(app)
          .put(`api/characters/${resObj.res.body.id}`)
          .set('Authorization', "Bearer" + resObj.user.authToken)
          .send(updateChar)
          .then(res => {
            assert.equal(res.status, 200);
            assert.typeOf(res.body, "object");
            expect(resObj.res.body).to.have.all.keys('id', 'name', 'image', 'creator', 'class', 'luck', 'harm', 'experience', 'Spooky', 'Divine', 'Professional');
            assert.equal(res.body.name, updateChar.name);
            assert.equal(res.body.class, updateChar.class);
          })
        })
      })
    })


    describe('delete Character', function() {
      it('character can be deleted', function() {

        return userCreate
        .then((resObj)=>{
          return createCharacter(resObj)
        })
        .then(resObj=>{
          return chai.request(app)
          .delete(`api/characters/${resObj.res.body.id}`) 
          .then(
            Character
            .findById(resObj.res.body.id)
            .then(res=>{
              assert.isNull(res);
            })
          )
        })
      })
    })
    

    describe('Delete User', function() {
      it('should delete user info', function() {
        
        return userCreate
        .then(resObj=>{
          return chai.request(app)
          .delete(`api/users/${resObj.user.id}`)
          .then(
            User
            .findById(resObj.user.id)
            .then(res=>{
              assert.isNull(res);
            })
          )
        })     
      })
    })
  });
});