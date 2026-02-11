import userModel from "../../models/user.model.js";
import {hashPassword} from "../../helpers/password.helper.js";
import {generateToken} from "../../helpers/token.helper.js";

const registerUser = async (req, res) => {
  const { email, role, password, businessId } = req.body;

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    console.log("Unable to hash password");
  }

  try {
    const user = await userModel.create({
      email,
      password: hashedPassword,
      role,
      businessId,
    });

    if (!user) {
      console.log("Something to went wrong");
    }

    const tokenOptions = {
      expiresIn: "2 days",
    };

    const token = generateToken(user.role, user._id, tokenOptions);

    if (!token) {
      console.log("Unable to generate token");
    }

    console.log(token);

    const options = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    };

    res.cookie("token", token, options);

    res.status(201).json({
      message: "User Registered Sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export default registerUser;
