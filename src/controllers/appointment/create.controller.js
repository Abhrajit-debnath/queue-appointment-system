import appointmentModel from "../../models/appointment.model.js";

const createAppointment = async (req, res) => {
  const { name, businessId, customerId, time, date } = req.body;

  const fullDateTime = new Date(`${date}T${time}:00`);

  try {
    const appointment = await appointmentModel.create({
      name,
      businessId,
      customerId,
      time: fullDateTime,
    });

    if (!appointment) {
      res.status(500).json({
        message: "Appointment can't not be created",
      });
    }

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    if (error.code == 11000) {
      res.status(500).json({
        message: "Can't create appointment with same time and businessId",
      });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default createAppointment;
