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
	proxy_servers.push(httpProxy.createProxyServer({target:each_target_url}));
}

var server = http.createServer();

server.listen(5722);

