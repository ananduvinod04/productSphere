const express = require("express")

const {
createProduct,
getProducts,
updateProduct,
deleteProduct
} = require("../controllers/productController")

const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/roleMiddleware")

const router = express.Router()

router.get("/", protect, getProducts)

router.post("/", protect, adminOnly, createProduct)

router.put("/:id", protect, adminOnly, updateProduct)

router.delete("/:id", protect, adminOnly, deleteProduct)

module.exports = router