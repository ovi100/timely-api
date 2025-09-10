import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    staff_id: {
      type: String,
      required: [true, 'staff id is required'],
      unique: true,
    },
    checkin: { type: String },
    checkout: { type: String },
    date: { type: Date },
    designation: { type: String },
    isChecked: { type: Boolean },
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
    status: { type: String },
  },
  { timestamps: true, collection: "employees" }
);

EmployeeSchema.index({ date: 1 });

export default mongoose.model("Employee", EmployeeSchema);
