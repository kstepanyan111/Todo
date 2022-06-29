const quoteService = require('../service/quote.service')
exports.postQuote = async (req, res) => {
    try{
        if ((req.body.quote && req.body.name) !== "") {
            const hasNumber = /\d/;
            if (!hasNumber.test(req.body.name)){
                const quote =  await quoteService.postQuote(req)
                res.status(200).json({
                    quote
                })
            }
        }
    }catch (error) {
        return res.status(401).json({error: 'Error to add quote'});
    }
}
exports.getQuote = async (req, res) => {
    try{
        const quote = await quoteService.getQuote()
        res.status(200).json({
            quote
        })
    }catch (error) {
        return res.status(401).json({error: 'Error to get quotes'});
    }
}
exports.deleteQuote = async (req, res) => {
    try{
        const quote = await quoteService.deleteQuote(req)
        res.status(200).json({
            quote
        })
    }catch (error) {
        return res.status(401).json({error: 'Error to delete quotes'});
    }
}
exports.updateQuote = async (req, res) => {
    try{
        const quote =  quoteService.updateQuote(req)
        res.status(200).json({
            quote
        })
    }catch (error) {
        return res.status(401).json({error: 'Error to delete quotes'});
    }
}
