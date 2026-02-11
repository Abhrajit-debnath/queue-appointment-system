import bcrypt from "bcrypt";

const hashPassword =  (password) => {
  try {
    const hashedPassword =  bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

export default hashPassword
