var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());



mongoose.connect("mongodb://localhost/clicks");

var Resource = app.resource = restful.model('click', mongoose.Schema({
     click: Number,
  }))
  .methods(['get', 'post', 'put', 'delete']);

  var Resource2 = app.resource = restful.model('user', mongoose.Schema({
    username:{ type: String, required:true, unique:true},
    email:{ type: String, required:true, unique:true},
    timestamp:{ type: Date, required:true},
  }))
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/click');
Resource2.register(app, '/user');



app.listen(3500);

console.log("Server is running at port 3500"); 

console.log(new Date());