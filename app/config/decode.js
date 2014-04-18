'use strict';

var jwt = require('jwt-simple');


exports.decode = function(safeRoutes){
  var safe = {};

  safeRoutes.forEach(function (route){
    safe[route] = true;
  });

  return function (req, res, next){
    if(req.headers.token){
      var token = jwt.decode(req.headers.token, process.env.JWT_SECRET);
      req.user = {
        number: token.number,
        _id: token._id,
        verified: token.verified
      };
      next();
    } else if(!req.headers.token){
      if(safe[req.url]){
        next();
      } else{
        res.send(401);
      }
    }
  };
};