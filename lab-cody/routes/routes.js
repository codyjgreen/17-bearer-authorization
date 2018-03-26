'use strict';

const express = require('express');
const User = require('../model/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();

router.route('/signup')
  .get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.send(err.message));
  })

  .post((req, res) => {
    new User(req.body)
      .save()
      .then(user => res.json(user))
      .catch(err => res.sendStatus(400).send(err.message));
  });

router.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');
  console.log('header:', authHeader);
  if (!authHeader) {
    res.status(401);
    res.send('Please provide username and password');
    return;
  }

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  User.findOne({ username: username })
    .then(user => {
      consloe.log(user);
      if (user === null) {
        res.send('user not found');
      }
      if (user.password === password) {
        res.send('Logged in');
      } else {
        res.status(401);
        res.send('wrong password');
      }
    })
    .catch(err => res.send(err.message));

  console.log('usrnpass:', username, password);

});

module.exports = router;