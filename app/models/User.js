const mongoose = require('mongoose');
const db = require('../common/database');
let conn = db.getConnection();
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var User = new Schema({
    fullname 		: String,
    img 			: String,
    email 			: String,
    password 		: String,
   
   },{collection : 'user'});
   
   module.exports = mongoose.model('User', User);