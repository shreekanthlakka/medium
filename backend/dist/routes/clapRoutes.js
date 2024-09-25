"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clapController_1 = require("../controllers/clapController");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
router.route("/:blogId").get(clapController_1.getTotalClaps).post(isLoggedIn_1.isLoggedIn, clapController_1.createClap);
exports.default = router;
