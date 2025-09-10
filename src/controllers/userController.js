import User from "../models/User.js";

/** GET /api/users */
export const getAllUsers = async (_req, res) => {
  const users = await User.find().lean();
  return res.json({ users, status: users.length > 0 });
};

/** GET /api/users/:id  (by staff_id) */
export const getUserByStaffId = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ staff_id: id }).lean();

  if (!user) {
    return res.status(401).json({ status: false, message: "Unauthorized employee" });
  }
  return res.json({ user, status: true });
};

/** PATCH /api/users/bulk  (upload-users) */
export const upsertUsersBulk = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [];
    if (data.length === 0) {
      return res.status(400).json({ status: false, message: "No users provided" });
    }

    const bulkOperations = data.map((user) => ({
      updateOne: {
        filter: { staff_id: user.staff_id },
        update: { $set: user },
        upsert: true
      }
    }));

    const result = await User.bulkWrite(bulkOperations);
    const modified = result.nModified || result.modifiedCount || 0;
    const added = result.upsertedCount || 0;

    return res.json({
      status: true,
      message:
        modified > 0
          ? "Employees updated successfully"
          : added > 0
            ? "Employees added successfully"
            : "No changes"
    });
  } catch (e) {
    return res.status(500).json({ status: false, message: e.message });
  }
};
