var express = require('express');
var bodyParser = require('body-parser');
var cache = require('memory-cache');

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

app.post('/calculateMultiplies', function(request, response) {

	var num = request.body.number

	if(NaN === parseInt(num))
    {
        response.json({"sum": "not a valid number"});
    }
    else
    {
    	response.json({"sum": calculateMultiplies(3, 5, num)});
    }
});


app.get('/getPrevResult', function(request, response) {
  	response.json({"sum": cache.get('sum')});
});


app.listen(app.get('port'), function() {
   	console.log('Node app is running on port', app.get('port'));
});

function calculateMultiplies(first,second,limit) {
	var sum = 0;
	for(var i = 0 ; i < limit ; i++){
		if (i%first === 0 || i%second === 0){
			sum += i;
		}
	}
	cache.put('sum', sum);
	return sum;
}


