import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    staff_id: {
      type: String,
      required: [true, 'staff id is required'],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'designation is required']
    },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    outlet: { type: String, required: true },
    outlet_code: { type: String, required: true },
    phone: {
      type: String,
      required: [true, 'phone is required'],
      unique: true,
      maxLength: 11,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not supported'
      },
      default: 'user'
    },
  },
  { timestamps: true, collection: "users" }
);

export default mongoose.model("User", UserSchema);
