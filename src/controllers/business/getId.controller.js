import Business from "../../models/business.model.js";

const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }

    res.status(200).json({
      message: "Business fetched successfully",
      business,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getBusinessById;
