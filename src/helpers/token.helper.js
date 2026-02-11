import jwt from "jsonwebtoken"

const generateToken = (role,userId,tokenOptions)=>{
    try {
        const token = jwt.sign({
            role,
            userId
        },process.env.JWT_SECRET,tokenOptions)

        return token
    } catch (error) {
        throw new Error("Token can't be generated")
        
    }

}

export default generateToken