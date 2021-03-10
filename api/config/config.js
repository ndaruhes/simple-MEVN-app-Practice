require('dotenv').config()
const {DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_CONNECTION} = process.env
module.exports = {
  "development": {
    "username": "root",
    "password": DB_PASSWORD,
    "database": "latihan_crud_nodejs",
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": DB_PASSWORD,
    "database": "latihan_crud_nodejs",
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": DB_PASSWORD,
    "database": "latihan_crud_nodejs",
    "host": DB_HOST,
    "dialect": "mysql"
  }
}















// require("dotenv").config();
// const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

// module.exports = {
// 	development: {
// 		username: DB_USERNAME,
// 		password: DB_PASSWORD,
// 		database: DB_DATABASE,
// 		host: DB_HOST,
// 		dialect: "mysql",
// 	},
// 	test: {
// 		username: DB_USERNAME,
// 		password: DB_PASSWORD,
// 		database: DB_DATABASE,
// 		host: DB_HOST,
// 		dialect: "mysql",
// 	},
// 	production: {
// 		username: DB_USERNAME,
// 		password: DB_PASSWORD,
// 		database: DB_DATABASE,
// 		host: DB_HOST,
// 		dialect: "mysql",
// 	},
// };
