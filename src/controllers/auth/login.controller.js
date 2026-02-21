import userModel from "../../models/user.model.js";
import { comparePassword } from "../../helpers/password.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/token.helper.js";

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    const comparedPassword = await comparePassword(password, user.password);

    if (!comparedPassword) {
      return res.status(401).json({
        message: "Wrong Credentials",
      });
    }

    if (user.role !== role) {
      return res.status(401).json({
        message: "Invalid Role",
      });
    }

    const tokenOptions = { expiresIn: "15m" };

    const { accessToken } = generateAccessToken(
      user.role,
      user._id,
      tokenOptions,
    );

    const { refreshToken } = generateRefreshToken(user.role, user._id);

    if (!accessToken) {
      return res.status(500).json({ message: "Unable to generate token" });
    }

    if (!refreshToken) {
      return res.status(500).json({ message: "Unable to generate token" });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({
      message: "User LoggedIn Successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUser;
