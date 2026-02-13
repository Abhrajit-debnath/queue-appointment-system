import staffModel from "../../models/staff.model.js";

const getStaffbyId = async (req, res) => {
  const { businessId } = req.query;
  console.log(req.query);

  try {
    const staff = await staffModel.find({
      businessId:businessId,
    });

    console.log(staff);

    if (!staff) {
      res.status(404).json({
        message: "Staff not found",
      });
    }

    res.status(200).json({
      message: "Staff found successfully",
      staff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getStaffbyId;
