import express from "express"
import authRoutes from "./routes/auth/auth.routes.js"
import staffRoutes from "./routes/staff/staff.routes.js"
import businessRoutes from "./routes/business/business.routes.js"
import appointmentRoutes from "./routes/appointment/appointment.routes.js"
import queueRoutes from "./routes/queue/queue.routes.js"

import cookieParser from "cookie-parser";

const app = express()

// Middlewares



// Middleware to read JSON data from client

app.use(express.json())



// Routes

app.use("/api/auth",authRoutes)
app.use("/api/business",businessRoutes)
app.use("/api/staff",staffRoutes)
app.use("/api/appointment",appointmentRoutes)
app.use("/api/appointments",appointmentRoutes)
app.use("/api/queue",queueRoutes)


app.get("/",(req,res)=>{
res.send("hello")
})




export default app

