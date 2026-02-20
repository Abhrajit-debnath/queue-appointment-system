import express from "express";
import authRoutes from "./routes/auth/auth.routes.js";
import staffRoutes from "./routes/staff/staff.routes.js";
import businessRoutes from "./routes/business/business.routes.js";
import appointmentRoutes from "./routes/appointment/appointment.routes.js";
import queueRoutes from "./routes/queue/queue.routes.js";
import helmet from "helmet";
import { limiter } from "./rateLimiting/limiter.js";

const app = express();

// Middlewares

// Security middleware for express

app.use(helmet());

// Middleware to read JSON data from client

app.use(express.json());

// Middleware to limit the no. of request from client

app.use(limiter);

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/queue", queueRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

export default app;
