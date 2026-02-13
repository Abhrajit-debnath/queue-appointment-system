

import appointmentModel from "../../models/appointment.model.js";

const getAppointmentbybusinessId = async (req, res) => {
  const { businessId } = req.query;


  try {
    const appointments = await appointmentModel.find({
      businessId,
    });

    if (appointments.length === 0) {
      res.status(404).json({
        message: "no appointments yet",
      });
    }

    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getAppointmentbybusinessId;
