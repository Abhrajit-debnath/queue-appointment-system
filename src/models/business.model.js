import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    startHour: {
      type: Date,
    },
    endHour: {
       type: Date,
   
    },
  },
  { timestamps: true },
);

businessSchema.index({ name: 1, ownerId: 1 }, { unique: true });

const Business = mongoose.model("Business", businessSchema);
export default Business;
