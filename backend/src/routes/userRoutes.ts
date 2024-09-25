import express from "express";
import {
    currentUser,
    logoutController,
    signinController,
    signupController,
} from "../controllers/userController";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = express.Router();
router.route("/signup").post(signupController);
router.route("/signin").post(signinController);
router.route("/logout").post(isLoggedIn, logoutController);
router.route("/me").get(isLoggedIn, currentUser);

export default router;
