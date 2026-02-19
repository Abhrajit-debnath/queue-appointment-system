import { deleteQueueInCache } from "../../cache/redis/helpers/queueHelpers/queue.cache.js";
import queueModel from "../../models/queue.model.js";

//   const { appointmentId } = req.params;
//   try {
//     const status = await queueModel.findOneAndUpdate(
//       { appointmentId },
//       { $set: { status: "completed" } },
//       { returnDocument: 'after' },
//     );

//     if (!status) {
//       res.status(400).json({
//         messsage: "Can't change status",
//       });
//     }

//     await deleteQueueInCache(status.businessId);

//     res.status(200).json({
//       messsage: `Status changed to ${status.status} sucessfully`,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       messsage: "internal Server Error",error
//     });
//   }
// };

const statusUpdateToComplete = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const status = await queueModel.findOneAndUpdate(
      { appointmentId },
      { $set: { status: "completed" } },
      { returnDocument: "after" },
    );

    if (!status) {
      return res.status(400).json({
        message: "Can't change status",
      });
    }

    await deleteQueueInCache(status.businessId);

    return res.status(200).json({
      message: `Status changed to ${status.status} successfully`,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default statusUpdateToComplete;
