var app = require('./app/app.js');

app.listen(app.get('port'));

console.log('Listening on ' + app.get('url') + ':' + app.get('port'));