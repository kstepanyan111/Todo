const Quote = require('../models/quote.model');
exports.postQuote = async (quote) => {
    try {
        if ( Quote.find( { item : { $exists: false } } )){
            return await Quote.create({...quote.body})
        }
    }
    catch (error){
        throw 'Error to add quote'
    }
}
exports.getQuote = async () => {
    try {
        return await Quote.find()
    }
    catch (error){
        throw 'Error to get quotes'
    }
}
exports.deleteQuote = async (quote) => {
    try {
        const {id} = quote.params
        return await Quote.deleteOne({_id: id})
    }
    catch (error){
        throw 'Error to delete quotes'
    }
}
exports.updateQuote = async (quote) => {
    try {
        const {id} = quote.params
        const data = quote.body
        return await Quote.findByIdAndUpdate(id, data, {new: true})
    }
    catch (error){
        throw 'Error to edit quotes'
    }
}