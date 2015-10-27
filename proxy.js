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

client.del("target_urls",function(){

	// Create proxy servers for each target url
	// for (each_target_url in proxy_servers){
	// 	proxy_servers.push(httpProxy.createProxyServer({target:each_target_url}));
	// 	client.lpush("target_urls",each_target_url)
	// }

	for(var i=0; i < target_urls.length - 1; i++){
		proxy_servers.push(httpProxy.createProxyServer({target:target_urls[i]}));
		client.lpush("target_urls",target_urls[i])
	}

	proxy_servers.push(httpProxy.createProxyServer({target:target_urls[i]}));
    client.lpush("target_urls",target_urls[i],function(){

    	var server = http.createServer(function(req,res){

			client.rpoplpush("target_urls","target_urls",function(err,target_url){

				console.log("target_url is ->"+target_url);

				var proxy_server = httpProxy.createProxyServer({target : target_url });

				proxy_server.web(req,res);

			});// End of rpoplpush callback

		});  // End of server function

		server.listen(5722);

    })

	

}); // End of client.del callback




