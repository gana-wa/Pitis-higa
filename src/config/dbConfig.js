const mySql = require('mysql');

const db = mySql.createConnection({
   host: process.env.HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DATABASE,
   multipleStatements: true,
});

db.connect(errMsg => {
   if (errMsg) throw errMsg;
   console.log("Database connected");
});

module.exports = db;