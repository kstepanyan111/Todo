const Test = require('../models/test.model');
exports.postQuote = async (req, res) => {
    const quotes = await Test.create({...req.body})
    res.status(200).json({
        quotes
    })
}

exports.getQuote = async (req, res) => {
    const quotes = await Test.find();
    res.status(200).json({
        quotes
    })
}
exports.deleteQuote = async (req, res) => {
    const {id} = req.params
    const quotes = await Test.remove({_id: id});

    res.status(200).json({
        quotes
    })
}
exports.updateQuote = async (req, res) => {
    const {id} = req.params
    const data = req.body
    const quotes = await Test.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
        quotes
    })
}