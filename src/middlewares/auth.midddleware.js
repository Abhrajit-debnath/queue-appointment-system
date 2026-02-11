import { decodeToken } from "../helpers/token.helper.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.cookie
      
        

    if (!token) {
      res.status(401).json({
        message : "unauthorized user"
      })
    }

    const extractedValue = token.split("=")[1]
    
    
    
    const decodedToken =  decodeToken(extractedValue)

    if (!decodedToken) {
        if (!token) {
      res.status(401).json({
        message : "unauthorized user"
      })
    }
    }

    req.user = decodedToken

   next()
    
    
  } catch (error) {
    res.status(500).json({
      message : "Something went wrong"
    })
  }
};

export default authMiddleware;
