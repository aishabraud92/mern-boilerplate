require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
//var expressJWT = require('express-jwt');//<-- for protecting routes on backend
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  //first find the User
  User.findOne({email: req.body.email}, function(err,user){
    if(!user || !user.password){
      return res.status(404).send({error: true, message: 'User not found'});
    }


    if(bcrypt.compareSync(req.body.password, user.password)){
      //good to go
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET,{
        expiresIn: 60 * 60 * 24 //expires in 24 hours
      });
      res.send({ user: user, token: token });
    }
    else{
      res.status(401).send({error: true, message: 'unauthorized'});
      //bad password
    }
  })
});


// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res, next) {
  console.log('/auth/signup post route', req.body);
  User.findOne({ email: req.body.email },function(err, user){
    if(user){
      return res.status(400).send({error: true, message: 'user already exists'});
    }
    else{
      User.create(req.body,function(error, user){
        if(err){
          return res.status(500).send({error: true, message: 'database error' + err.message});
        }
        else{
          //make a token and send it to the caller
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET,{
            expiresIn: 60 * 60 * 24 //expires in 24 hours
          });
          res.send({ user: user, token: token });
        }
      });
    }
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
var token = req.body.token || req.query.token;
if(!token){
  return res.status(418).send({error: true, message: 'You must be a teapot. Send a token, Mr Teapot.'});

}
////get the user from the tokens
jwt.verify(token, process.env.JWT_SECRET, function(err,user){
  if (err){
    return res.status(500).send({error: true, message: 'JWT Verification error -' + error.message});
    }
    //find the user by usinf the ID from JWT_SECRET
    User.findById({
      '_id': user_id
    }, function(err,user){
      if(err){
        return res.status(501).send({error: true, message: 'database error - ' + err.message});
      }
      else if(!user){
        return res.status(404).send({error: true, message: 'Who dat!?'});
      }
      //renew tokens
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET,{
        expiresIn: 60 * 60 * 24 //expires in 24 hours
      });
      res.send({ user: user, token: token });
    })
  });
});

module.exports = router;
