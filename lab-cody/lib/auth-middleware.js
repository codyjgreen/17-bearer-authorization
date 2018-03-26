'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

function(req, res, next) {
    // read the user information from the "Authorization" header
    var authHeader = req.headers.authorization;
    var token = authHeader.split('Bearer ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
    User.findOne({ username: decoded.username })
    .then(user => {
    req.user = user;
    // go to the next piece of middleware
    next();
    });
    })
};