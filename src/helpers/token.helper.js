import jwt from "jsonwebtoken";

const generateToken = (role, id, tokenOptions) => {
  try {
    const token = jwt.sign(
      {
        role,
        userId: id,
      },
      process.env.JWT_SECRET,
      tokenOptions,
    );

    return token;
  } catch (error) {
    throw new Error("Token can't be generated");
  }
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
  } catch (error) {
    throw new Error("Token can't be decoded");
  }
};

export  {generateToken,decodeToken};
