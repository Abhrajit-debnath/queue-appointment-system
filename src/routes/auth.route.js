import express from "express"

import registerUser from "../controllers/register.controller.js"

import { registerValidator,validate } from "../validators/auth.validator.js";

const router = express.Router()

router.post("/register",registerValidator,validate,registerUser)


export default router