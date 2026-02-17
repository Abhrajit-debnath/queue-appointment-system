import { generateQueue } from "../../helpers/generateQueue.helper.js";
import appointmentModel from "../../models/appointment.model.js";
import queueModel from "../../models/queue.model.js";

const getQueue = async (req, res) => {
  const { businessId } = req.params;

  try {
    const queue = await queueModel.find({
      businessId,
    });

    if (!queue) {
      res.status(500).json({
        message: "Queue can't not be fetched",
      });
    }

    res.status(200).json({
      message: "Queue fetched successfully",
      queue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getQueue;
