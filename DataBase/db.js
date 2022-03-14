const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
var mongo = '';
if(process.env.MONGO_DB_URI) mongo = process.env.MONGO_DB_URI;
module.exports = {
    MONGO_DB:true,
    MONGOURI: mongo
  }
