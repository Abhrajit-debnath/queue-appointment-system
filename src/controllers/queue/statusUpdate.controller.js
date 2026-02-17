import queueModel from "../../models/queue.model.js";

const statusUpdateToProgress = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const status = await queueModel.findOneAndUpdate(
      { appointmentId },
      { $set: { status: "in_progress" } },
      { new: true },
    );

    if (!status) {
      res.status(400).json({
        messsage: "Can't change status",
      });
    }

    res.status(200).json({
      messsage: `Status changed to ${status.status} sucessfully`,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "internal Server Error",
    });
  }
};

export default statusUpdateToProgress;
