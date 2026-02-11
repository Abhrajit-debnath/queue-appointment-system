import express from "express"
import authRoutes from "./routes/auth/auth.route.js"
import businessRoutes from "./routes/business/business.route.js"

import cookieParser from "cookie-parser";

const app = express()

// Middlewares



// Middleware to read JSON data from client

app.use(express.json())



// Routes

app.use("/api/auth",authRoutes)
app.use("/api/business",businessRoutes)


app.get("/",(req,res)=>{
res.send("hello")
})




export default app

