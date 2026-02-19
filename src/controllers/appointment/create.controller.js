import { deleteQueueInCache } from "../../cache/redis/helpers/queueHelpers/queue.cache.js";
import { CheckTime } from "../../helpers/checkValidTime.js";
import { convertTo24hour } from "../../helpers/convertTime.js";
import appointmentModel from "../../models/appointment.model.js";
import Business from "../../models/business.model.js";

// const createAppointment = async (req, res) => {
//   const { name, businessId, customerId, time, date } = req.body;
//   const time24hr = convertTo24hour(time);
//   console.log(time24hr);

//   const fullDateTime = new Date(`${date}T${time24hr}:00`);

//   console.log(fullDateTime);

//   try {
//     const appointment = await appointmentModel.create({
//       name,
//       businessId,
//       customerId,
//       time: fullDateTime,
//     });

//     deleteQueueInCache(businessId);

//     const business = await Business.findOne({
//       _id: businessId,
//     });

//     const result = CheckTime(
//       appointment.time,
//       business.startHour,
//       business.endHour,
//     );

//     if (!result) {
//       return res.status(400).json({
//         message:
//           "Appointment time can't be greater than end hour or less than start hour  ",
//       });
//     }

//     if (!appointment) {
//       return res.status(500).json({
//         message: "Appointment can't not be created",
//       });
//     }

//     return res.status(201).json({
//       message: "Appointment created successfully",
//       appointment,
//     });
//   } catch (error) {
//     if (error.code == 11000) {
//       return res.status(500).json({
//         message: "Can't create appointment with same time and businessId",
//       });
//     }
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

const createAppointment = async (req, res) => {
  const { name, businessId, customerId, time, date } = req.body;
  const time24hr = convertTo24hour(time);

  const fullDateTime = new Date(`${date}T${time24hr}:00.000Z`);

  try {
    const business = await Business.findOne({ _id: businessId });

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const result = CheckTime(
      fullDateTime,
      business.startHour,
      business.endHour,
    );

    if (!result) {
      return res.status(400).json({
        message:
          "Appointment time must be between business start and end hours",
      });
    }

    const appointment = await appointmentModel.create({
      name,
      businessId,
      customerId,
      time: fullDateTime,
    });

    deleteQueueInCache(businessId);

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({
        message: "Can't create appointment with same time and businessId",
      });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default createAppointment;
