var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;

/*const jwt= require('express-jwt');

const authCheck = jwt({
  secret: new Buffer('YOUR-AUTH0-SECRET', 'base64'),
  audience:'YOUR-AUTH0-CLIENT-ID'
})*/

var app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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
    username:{ type: String},
     email:{ type: String, unique:true},
     clicked:{type:Number}
  },
   {timestamps: true}
   ))
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/click');
Resource2.register(app, '/user');



app.listen(3500);

console.log("Server is running at port 3500"); 

console.log(new Date());