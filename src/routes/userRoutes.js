import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllUsers, getUserByStaffId, upsertUsersBulk } from "../controllers/userController.js";

const router = Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserByStaffId);
router.patch("/upload-users", verifyToken, upsertUsersBulk);

export default router;
