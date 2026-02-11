import express from "express"

import registerUser from "../../controllers/register.controller.js"

import { registerValidator,registerValidate , loginValidator,loginValidate} from "../../validators/auth.validator.js";
import loginUser from "../../controllers/login.controller.js";

const router = express.Router()

// Auth Routes

router.post("/register",registerValidator,registerValidate,registerUser)

router.post("/login",loginValidator, loginValidate ,loginUser)


export default router