import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { upsertOutlet } from "../controllers/outletController.js";

const router = Router();

router.post("/", verifyToken, upsertOutlet);

export default router;
