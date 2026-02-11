import bcrypt from "bcrypt";

const hashPassword =  async(password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

const comparePassword =  async(password,hashPassword) => {
  try {
    const comparedPassword =  await bcrypt.compare(password,hashPassword)
    return comparedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  comparePassword,
  hashPassword
}
