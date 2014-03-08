
module.exports = function(app, mongoose){

  mongoose.connect(app.get('db uri'));
  db = mongoose.connection;
  db.on('open', console.log.bind(console, 'connected to db'));
  db.on('error', console.error.bind(console, 'error connecting to db'));
};



