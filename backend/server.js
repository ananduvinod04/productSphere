const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./src/config/db")

const authRoutes = require("./src/routes/authRoutes")
const productRoutes = require("./src/routes/productRoutes")
const cookieParser = require("cookie-parser")

dotenv.config()

connectDB()

const app = express()
app.use(cookieParser())


app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials: true

}))

app.use(express.json())
app.get("/", (req, res) => {
  res.send("Product Management API is running");
});

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})