import express from "express";
import { login, logout } from "../controllers/authController.js";
import validate from "../middleware/validateRequest.js";
import { loginSchema } from "../validators/authValidators.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;

/* auth routes
post /auth/login -> user login
post /auth/logout -> user logout
patch /auth/change-password -> password reset
get /auth/profile -> get user profile
*/
