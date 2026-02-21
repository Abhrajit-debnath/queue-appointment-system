import jwt from "jsonwebtoken";

const generateAccessToken = (role, id, tokenOptions) => {
  try {
    const accessToken = jwt.sign(
      {
        role,
        userId: id,
      },
      process.env.ACCESS_SECRET,
      tokenOptions,
    );

    return {
      accessToken,
    };
  } catch (error) {
    console.log(error.message);

    throw new Error("Token can't be generated");
  }
};

const generateRefreshToken = (role, id) => {
  try {
    const refreshToken = jwt.sign(
      {
        role,
        userId: id,
      },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return {
      refreshToken,
    };
  } catch (error) {
    throw new Error("Token can't be generated");
  }
};

const decodeToken = (token, tokenName) => {
  try {
    const decoded = jwt.verify(
      token,
      tokenName === "access"
        ? process.env.ACCESS_SECRET
        : process.env.REFRESH_SECRET,
    );
    return decoded;
  } catch (error) {

    throw error;
  }
};

export { generateAccessToken, generateRefreshToken, decodeToken };
