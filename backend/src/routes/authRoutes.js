const express = require("express")

const {
register,
login,
logout,
checkAuth
} = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

// Register user
router.post("/register", register)

// Login user
router.post("/login", login)

// Logout user
router.post("/logout", logout)

router.get("/check", protect, checkAuth)

module.exports = router