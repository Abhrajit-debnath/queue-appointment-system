import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  queueNumber: {
    type: Number,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
});

queueSchema.index({ appointmentId: 1, businessId: 1 }, { unique: true });

const queue = mongoose.model("queue", queueSchema);
export default queue;
