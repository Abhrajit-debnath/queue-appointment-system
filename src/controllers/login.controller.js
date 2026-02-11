import userModel from "../models/user.models.js";
import { comparePassword } from "../helpers/password.helper.js";
import { generateToken } from "../helpers/token.helper.js";

const loginUser = async (req, res) => {

  const { email, password, role } = req.body;

  try {
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      res.status(405).json({
        message: "User doesn't exists",
      });
    }

    console.log(user);

    const comparedPassword = await comparePassword(password, user.password);

    if (!comparedPassword) {
      res.status(401).json({
        message: "Wrong Credentials",
      });
    }

    if (user.role !== role) {
      res.status(401).json({
        message: "Invalid Role",
      });
    }

    const tokenOptions = {
      expiresIn: "2 days",
    };

    const token = generateToken(user.role, user._id, tokenOptions);

    if (!token) {
      console.log("Unable to generate token");
    }

    const options = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    };

    res.cookie("token", token, options);

    res.status(201).json({
      message: "User LoggedIn Sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export default loginUser;
