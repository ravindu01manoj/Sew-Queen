const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

module.exports = {
    MONGO_DB:true,
    MONGOURL: process.env.MONGO_DB_URI === undefined ? '' : process.env.MONGO_DB_URI
  }
