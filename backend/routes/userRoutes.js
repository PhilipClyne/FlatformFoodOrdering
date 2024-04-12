import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import {
  authenticate,
  authorizeAdmin,
  getAllUsers,
} from "../middlewares/authMiddleWare.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

//Admin route
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
