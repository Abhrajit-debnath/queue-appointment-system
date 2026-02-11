import businessModel from "../../models/business.model.js";

const createbusiness = async (req, res) => {
  const { name, email } = req.body;

  try {
    const business = await businessModel.create({
      name,
      email,
      ownerId: req.user.userId,
    });

    res.status(201).json({
      message: "Business created successfully",
      business,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default createbusiness;
