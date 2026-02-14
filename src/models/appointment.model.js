import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business",
      required: true,
      index: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

appointmentSchema.index({ time: 1 }, { unique: true });

const apppointmentModel = mongoose.model("Appointment", appointmentSchema);
export default apppointmentModel;
