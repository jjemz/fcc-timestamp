var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res){
	res.send('timestamp project');
});

app.listen(port, function(){
	console.log('Example app listening on port ' + port);
});
