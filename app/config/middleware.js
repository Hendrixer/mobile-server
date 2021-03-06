"use strict";

var jwt = require('jwt-simple');

module.exports = {
  logError: function(err, req, res, next){
    console.error(err.stack);
    next(err);
  },

  errorHandler: function(err, req, res, next){
    res.send(500);
  },

  decode: function(req, res, next){
    if(req.headers.token){
      var token = jwt.decode(req.headers.token, process.env.JWT_SECRET);
      req.user = {
        number: token.number,
        _id: token._id,
        verified: token.verified
      };
      next();
    } else if(!req.headers.token){
      if(req.url === '/v1/user/new' || req.url === '/v1/user/verify'){
        next();
      } else{
        res.send(401);
      }
    }
  },

  enableCors: function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,DELETE,OPTIONS,PUT,GET');
    res.header('Access-Control-Allow-Headers', 'Client-Id, Authorization, X-Requested-With, Token');

    if(req.method === 'OPTIONS'){
      res.send(200);
    } else {
      next();
    }
  },

  clientCheck: function(req, res, next){
    if(req.headers['client-id'] !== process.env.CLIENT_MOBILE_ID){
      res.send(401);
    } else {
      next();
    }
  }
};