const mongoose = require("mongoose");
const { Schema } = mongoose;

const Test = new Schema({
    name: String,
    quote: String
});

const Model = mongoose.model('test', Test);

module.exports = Model;