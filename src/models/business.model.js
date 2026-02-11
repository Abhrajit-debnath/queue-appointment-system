import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: "user",
  },
  email: {
    unique: true,
    type: String,
  },
});

const Business = mongoose.model("Business", businessSchema);
export default Business;
