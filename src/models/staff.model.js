import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
});


staffSchema.index({name:1,businessId:1},{unique:true})

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
