import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { staff_id, password } = req.body;
    if (!staff_id || !password) {
      return res.status(400).json({ status: false, message: "Missing credentials" });
    }

    const user = await User.findOne({ staff_id }).lean();
    if (!user) return res.json({ status: false, message: "Authentication failed!" });

    if (password === user.phone) {
      const token = jwt.sign(
        { id: user.staff_id, phone: user.phone, role: user.role },
        process.env.JWT_KEY
      );
      return res.json({
        user,
        token: `Bearer ${token}`,
        status: true,
        message: "Login successful"
      });
    }

    return res.json({ status: false, message: "Authentication failed!" });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
