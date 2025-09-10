import Outlet from "../models/Outlet.js";

/** POST /api/outlets  (upsert by staff_id) */
export const upsertOutlet = async (req, res) => {
  try {
    const { staff_id } = req.body;
    if (!staff_id) {
      return res.status(400).json({ status: false, message: "staff_id is required" });
    }

    const result = await Outlet.updateOne(
      { staff_id },
      { $set: req.body },
      { upsert: true }
    );

    // Mongoose doesn't return upsertedId in result consistently; check matched/modified
    const message =
      result.upsertedCount && result.upsertedCount > 0
        ? "Outlet added successfully!"
        : "Outlet updated successfully!";

    return res.json({ status: true, message });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
