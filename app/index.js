var app = require('./app.js');

app.listen(app.get('port'));

console.log('Listening on ' + app.get('url') + ':' + app.get('port'));