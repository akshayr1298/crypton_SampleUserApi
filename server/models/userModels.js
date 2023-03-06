import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    place: { type: String, required: true },
    pinCode: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
