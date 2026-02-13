

import appointmentModel from "../../models/appointment.model.js";

const getAppointmetnbyId = async (req, res) => {
  const { userId } = req.user;

  

  try {
    const appointment = await appointmentModel.findOne({
      customerId: userId,
    });

    if (!appointment) {
      res.status(500).json({
        message: "Appointment not found",
      });
    }

    res.status(201).json({
      message: "Appointment fetched successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getAppointmetnbyId;
