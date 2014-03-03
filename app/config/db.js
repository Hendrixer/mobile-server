
module.exports = function(mongoose){
  var dbUrl;
  // update this with more env variables like heroku
  if(!process.env.URL){
    dbUrl = 'mongodb://localhost'
  }

  mongoose.connect(dbUrl + '/ionic');
  db = mongoose.connection;
  db.on('open', console.log.bind(console, 'connected to db'));
  db.on('error', console.error.bind(console, 'error connecting to db'));
}



