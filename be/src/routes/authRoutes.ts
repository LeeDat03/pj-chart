import express from "express";
import authController from "../controllers/authController";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validations/authValidation";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);

export default router;
