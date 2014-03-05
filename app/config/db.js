
module.exports = function(mongoose){

  mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/ionic');
  db = mongoose.connection;
  db.on('open', console.log.bind(console, 'connected to db'));
  db.on('error', console.error.bind(console, 'error connecting to db'));
};



