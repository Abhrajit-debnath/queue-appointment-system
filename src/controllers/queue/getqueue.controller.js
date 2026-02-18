import { setQueueInCache } from "../../cache/redis/helpers/queueHelpers/queue.cache.js";
import queueModel from "../../models/queue.model.js";

const getQueue = async (req, res) => {
  const { businessId } = req.params;

  try {
    const queue = await queueModel.find({
      businessId,
    });

    if (!queue || queue.length === 0) {
      return res.status(404).json({
        message: "No queue found",
      });
    }

    const status = await setQueueInCache(businessId, queue);
    if (status) {
      console.log("queue saved in cached sucessfully");
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
