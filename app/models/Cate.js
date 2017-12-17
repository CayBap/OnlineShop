const mongoose = require('mongoose');
const db = require('../common/database');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Cate = new Schema({
    nameCate 		: String,
    nameCateUnbind 	: String,
    decription 		: String,
    createdAt 		: Date,
    updatedAt       :Date
   },{collection : 'cate'});
   
   module.exports = mongoose.model('Cate', Cate);