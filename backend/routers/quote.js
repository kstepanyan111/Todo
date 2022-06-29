const {Router} = require("express")
const router = Router()
const quoteController = require('../app/controllers/quote.controller')

router.get("/", quoteController.getQuote)
router.post("/new", quoteController.postQuote)
router.put("/:id", quoteController.updateQuote)
router.delete("/:id", quoteController.deleteQuote)

module.exports = router