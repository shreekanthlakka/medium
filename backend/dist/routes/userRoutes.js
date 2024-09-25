"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
router.route("/signup").post(userController_1.signupController);
router.route("/signin").post(userController_1.signinController);
router.route("/logout").post(isLoggedIn_1.isLoggedIn, userController_1.logoutController);
router.route("/me").get(isLoggedIn_1.isLoggedIn, userController_1.currentUser);
exports.default = router;
