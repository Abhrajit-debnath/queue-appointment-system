import express from "express"
import authRoutes from "./routes/auth/auth.route.js"



const app = express()

// Middlewares

// Middleware to read JSON data from client

app.use(express.json())



// Routes

app.use("/api/auth",authRoutes)


app.get("/",(req,res)=>{
res.send("hello")
})




export default app

