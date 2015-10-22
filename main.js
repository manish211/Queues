var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

// var url = require('url');
// var url_parts = url.parse(req.url, true);
// var query = url_parts.query;

// console.log("query:"+query);

///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.
// app.use(function(req, res, next) 
// {
// 	console.log(req.method, req.url);

// 	// ... INSERT HERE.

// 	next(); // Passing the request to the next handler in the stack.
// });

app.get('/get',function(req,res){

	console.log("You visited get");

	console.log(req.query);

	for(var key in req.query){

		if(req.query.hasOwnProperty(key)){

			console.log("key name:"+key);

			client.get(key, function(err,value){ 
			
			console.log(value);

			
			})

		}
	}

	req.send('You visited get')

})

app.get('/set',function(req,res){

	console.log("You visited set");

	// res.send('You visited set');

	console.log(req.query)

	// var key = req.query[0]

	console.log("key="+key);

	for(var key in req.query){

		if(req.query.hasOwnProperty(key)){

			client.set(key,req.query[key]);
			var outputString = "key="+key+" value="+req.query[key] ;
			console.log(outputString);
			console.log("-----");

		}
	}
	
	res.send(outputString);


	// client.set("key", "value");
	// client.get("key", function(err,value){ console.log(value)});

})


app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
   console.log(req.body) // form fields
   console.log(req.files) // form files

   if( req.files.image )
   {
	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) throw err;
	  		var img = new Buffer(data).toString('base64');
	  		console.log(img);
		});
	}

   res.status(204).end()
}]);

app.get('/', function(req, res) {
	{
		// console.log(req);
		res.send('hello world')
	}
})

app.get('/meow', function(req, res) {
	{
		if (err) throw err
		res.writeHead(200, {'content-type':'text/html'});
		items.forEach(function (imagedata) 
		{
   		res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
		});
   	res.end();
	}
})

// HTTP SERVER
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

