var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
// var proxy = httpProxy.createProxyServer({ target : 'http://localhost:3000' });
var target_urls = [ "http://localhost:3001", "http://localhost:3002" ];
var proxy_servers = []

//Create proxy servers for each target url
for (each_target_url in proxy_servers){
	proxy_servers.push(http.createServer({target:each_target_url}));
}
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  client.del("host:port");
  client.lpush("host:port","http://localhost:3001");
  client.lpush("host:port","http://localhost:3002");


  
});

console.log("listening on port 5722")
server.listen(5722, function () {

	  var host = server.address().address
	  console.log("HOST IS="+host);
	  var port = server.address().port

	client.rpoplpush("host:port","host:port",function(err,resp){

		if(err){
			throw err;
		}
		else
		{
			console.log("response from rpoplplush:"+resp);
			var new_http_url = resp;
			console.log("new_http_url:="+new_http_url);
			var proxy = httpProxy.createProxyServer({ target : new_http_url });
			proxy.web(req, res);

		}

	})

  // client.

  console.log('Example app listening at http://%s:%s', host, port)
})