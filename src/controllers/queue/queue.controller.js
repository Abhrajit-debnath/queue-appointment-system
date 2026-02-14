import { generateQueue } from "../../helpers/generateQueue.helper.js";
import appointmentModel from "../../models/appointment.model.js";
import queueModel from "../../models/queue.model.js";

const genQueue = async (req, res) => {
  const { businessId } = req.params;

  try {
    const queue = await appointmentModel
      .find({
        businessId,
      })
      .sort({
        time: 1,
      });

    const sortedQueue = generateQueue(queue);

    const finalQueue = await queueModel.insertMany(sortedQueue);

    if (!finalQueue) {
      res.status(500).json({
        message: "Queue can't not be generated",
      });
    }

    res.status(201).json({
      message: "Queue generated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default genQueue;
