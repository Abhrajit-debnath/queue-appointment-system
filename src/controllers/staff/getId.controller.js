import staffModel from "../../models/staff.model.js";

const getStaffbyId = async (req, res) => {
  const { id, businessId } = req.params;

  try {
    if (!id) {
      const staff = await staffModel.findOne({
        businessId,
      });

      if (!staff) {
        res.status(404).json({
          message: "Staff not found",
        });
      }
    }

    const staff = await staffModel.findOne({
      _id: id,
    });

    if (!staff) {
      res.status(200).json({
        message: "Staff not found",
      });
    }

    res.status(201).json({
      message: "Staff found successfully",
      staff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getStaffbyId;
