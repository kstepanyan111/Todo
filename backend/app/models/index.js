const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const Test = require("./test.model");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tests = new Test();
module.exports = db;