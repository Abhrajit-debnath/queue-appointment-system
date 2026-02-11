import express from "express"

import registerUser from "../../controllers/auth/register.controller.js"

import { registerValidator,registerValidate , loginValidator,loginValidate} from "../../validators/auth.validator.js";
import loginUser from "../../controllers/auth/login.controller.js";
import authMiddleware from "../../middlewares/auth.midddleware.js";

const router = express.Router()

// Auth Routes

router.post("/register",registerValidator,registerValidate,registerUser)

router.post("/login",loginValidator, loginValidate ,loginUser)


export default router