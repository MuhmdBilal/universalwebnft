const con = require('serverless-mysql')({
    config: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dateStrings: [
          'DATE',
          'DATETIME'
      ],
      charset:'utf8mb4'
    },
    zombieMaxTimeout:120,
  })
  
  var prefix = "ui"; 
  
  module.exports = {con,prefix};