var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.get('*', function(req, res){
	var url = req.url;
	var input = url.toString().substring(1, url.toString().length); //remove the first slash
	if (isNaN(input)) {
		var unixResult = naturalToUnix(input).toString();
		var jsonResult = convertToJSON(unixResult, input.replace(/%20/g, ' '));
		res.send(jsonResult);

	} else {
		var natural = unixToNatural(input);
	    var jsonResult = convertToJSON(input, natural);
	    res.send(jsonResult);
	}
	
});

app.listen(port, function(){
	console.log('Example app listening on port ' + port);
});

function naturalToUnix(naturalDate){
	var reg = /[a-zA-Z]+/g
    var month = naturalDate.match(reg);
    var regNum = /[^a-zA-Z]+/g
    var num = naturalDate.match(regNum)
    var splitStr = num.toString().split(',');
    var day = splitStr[0].substr(3);
    var year = splitStr[1].substr(3);
    var finalDate = year + '.' + month + '.' + day;
	var unix = new Date(finalDate).getTime() / 1000;
	return unix;
}


function unixToNatural(unixTimeStamp){
	var date = new Date(unixTimeStamp*1000);
	var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
	var month = monthNames[date.getMonth()];
	var day = date.getDate();
	var year = date.getFullYear();
	//var result = date + '';
    var result = month + ' ' + day + ', ' + year;
	return result;
}

function convertToJSON(unix, naturalDate){
   var json = {};
   json['unix'] = unix;
   json['natural'] = naturalDate;
   return JSON.stringify(json);
}