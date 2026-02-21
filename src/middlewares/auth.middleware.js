import { decodeToken, generateAccessToken } from "../helpers/token.helper.js";

const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = decodeToken(accessToken, "access");
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res
            .status(401)
            .json({ message: "Session expired, login again" });
        }

        const decoded = decodeToken(refreshToken, "refresh");

        const { accessToken: newAccessToken } = generateAccessToken(
          decoded.role,
          decoded.userId,
          { expiresIn: "15m" },
        );

        res.setHeader("x-access-token", newAccessToken);
        req.user = decoded;
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
