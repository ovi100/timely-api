import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createEmployee,
  deleteEmployeeById,
  getEmployeeById,
  getEmployees,
  updateEmployeeToday
} from "../controllers/employeeController.js";

const router = Router();

router.post("/", verifyToken, createEmployee);
router.get("/", verifyToken, getEmployees);
router.get("/:id", verifyToken, getEmployeeById);
router.patch("/:id", verifyToken, updateEmployeeToday);
router.delete("/:id", verifyToken, deleteEmployeeById);

export default router;
