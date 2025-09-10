import mongoose from "mongoose";

const OutletSchema = new mongoose.Schema(
  {
    staff_id: { type: String, required: true },
    outlet_code: String,
    outlet_name: String,
    region: String
  },
  { timestamps: true, collection: "outlets" }
);

OutletSchema.index({ staff_id: 1 }, { unique: true });

export default mongoose.model("Outlet", OutletSchema);
