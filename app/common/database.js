const mongoose = require('mongoose');
const config = require('config');
mongoose.connect(config.get("mongoose"),{ useMongoClient: true });
//Connect to MongoDB
function getConnection(){
    const db_connect =  mongoose.connection;
    
    db_connect.on('err', console.error.bind(console, 'connect err'))
    db_connect.once('open', function() {
      console.log('Connected mongodb !!!!')
    });
}
module.exports ={
    getConnection:getConnection,
}