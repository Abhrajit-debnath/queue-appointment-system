import userModel from "../../models/user.model.js";
import { hashPassword } from "../../helpers/password.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/token.helper.js";

const registerUser = async (req, res) => {
  const { email, role, password, businessId } = req.body;

  try {
    const hashedPassword = await hashPassword(password); // ✅ inside try

    if (!hashedPassword) {
      return res.status(500).json({ message: "Unable to hash password" }); // ✅ return
    }

    const user = await userModel.create({
      email,
      password: hashedPassword,
      role,
      businessId,
    });

    const tokenOptions = { expiresIn: "15m" };

    const { accessToken } = generateAccessToken(user.role, user._id, tokenOptions);
    const { refreshToken } = generateRefreshToken(user.role, user._id); 

    if (!accessToken) {
      return res.status(500).json({ message: "Unable to generate token" });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    return res.status(201).json({
      message: "User Registered Successfully",
      accessToken, 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" }); // ✅
  }
};

export default registerUser;
