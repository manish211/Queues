var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})



///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.

app.use(function(req, res, next) 
{
	console.log(req.method, req.url);

	// ... INSERT HERE.

	client.lpush('recentQueue',req.url,function(err,reply){

		console.log(reply)
	})

	next(); // Passing the request to the next handler in the stack.
});

app.get('/recent',function(req,res){

	
		// Display all the recently visited sites
		// Put code here pending

		client.lrange('recentQueue',0,4,function(resp,reply){

			console.log("reply: "+reply);

			res.send(reply);
		})
	
})

app.get('/get',function(req,res){

	console.log("You visited get");

	console.log(req.query);

	var outputString;

	for(var key in req.query){

		if(req.query.hasOwnProperty(key)){

			console.log("key name:"+key);

			client.get(key, function(err,value){ 
			
					console.log("value of key:"+value);

					outputString = "key="+key+" value="+value ;

					console.log("outputString inside::"+outputString);

					res.send(outputString);
			})

		}
	}

	console.log("outputString:"+outputString);
	
	// res.send(outputString);

})

app.get('/set',function(req,res){

	console.log("You visited set");

	// res.send('You visited set');

	console.log(req.query)

	// var key = req.query[0]

	console.log("key="+key);

	client.set("keyExpire","This message will self-destruct in 10 seconds");

	client.expire("keyExpire",10);

	console.log("req.query: "+req.query);

	for(var key in req.query){
		console.log("+++++");
		if(req.query.hasOwnProperty(key)){

			client.set(key,req.query[key]);

			var outputString = "key="+key+" value="+req.query[key] ;
			console.log(outputString);
			console.log("-----");

		}
	}
	
console.log("HELLO =======");
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

