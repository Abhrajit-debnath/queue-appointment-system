import businessModel from "../../models/business.model.js";

const getbusinesses = async (req, res) => {
  const { userId} = req.user;

  try {

    const business = await businessModel.find({
      
      ownerId: userId,
    });

       if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }

    res.status(200).json({
      message: "Businesses fetched successfully",
      business,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export default getbusinesses;
