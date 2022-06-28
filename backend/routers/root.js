const {Router} = require("express")
const router = Router()
const rootController = require('../app/controllers/test.controller')

router.get("/", rootController.getQuote)

router.post("/new", rootController.postQuote)
router.put("/:id", rootController.updateQuote)
router.delete("/:id", rootController.deleteQuote)

module.exports = router