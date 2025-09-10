import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    staff_id: {
      type: String,
      required: [true, 'staff id is required'],
      unique: true,
    },
    checkin: { type: String, required: true },
    checkout: { type: String, required: true },
    date: { type: Date, required: true },
    designation: { type: String, required: true },
    isChecked: { type: Boolean },
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
    status: { type: String },
  },
  { timestamps: true, collection: "employees" }
);

EmployeeSchema.index({ date: 1 });

export default mongoose.model("Employee", EmployeeSchema);
