var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/api/calculateMultiplies', function(request, response) {
  //response.render('pages/index');
  response.json({"number found": "number"})
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


