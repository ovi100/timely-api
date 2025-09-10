import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    staff_id: {
      type: String,
      required: [true, 'staff id is required'],
      unique: true,
    },
    designation: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    location: { type: String },
    name: { type: String },
    outlet: { type: String },
    outlet_code: { type: String },
    phone: {
      type: String,
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
