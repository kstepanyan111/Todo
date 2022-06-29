const mongoose = require("mongoose");
const { Schema } = mongoose;

const Quote = new Schema({
    name: String,
    quote: String
});

const Model = mongoose.model('test', Quote);

module.exports = Model;