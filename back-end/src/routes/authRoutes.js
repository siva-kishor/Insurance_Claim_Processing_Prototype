import express from "express";
import {
  login,
  logout,
  getProfile,
  changePassord,
} from "../controllers/authController.js";
import validate from "../middleware/validateRequest.js";
import {
  loginSchema,
  changePasswordSchema,
} from "../validators/authSchemas.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authMiddleware, getProfile);
router.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  changePassord,
);

export default router;

/* auth routes
post /auth/login -> user login
post /auth/logout -> user logout
patch /auth/change-password -> password reset
get /auth/profile -> get user profile
*/
