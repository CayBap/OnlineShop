const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: config.get("secret_key"),
  saveUninitialized: true,
  resave: true,
  cookie:{
    maxAge:1000*60*30
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('views',__dirname+'/app/views');
app.set('view engine',"ejs");

app.use('/static',express.static(__dirname+'/public'));

 var controllers= require(__dirname+'/app/controllers');
 app.use(controllers);

app.listen(config.get('server.port'),config.get('server.host'),function(req,res){
    console.log('Server listen on poort '+config.get('server.port'));
});
