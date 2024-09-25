"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
router.route("/:blogId").post(isLoggedIn_1.isLoggedIn, commentController_1.createComment).get(commentController_1.getCommentsByBlog);
router
    .route("/:blogId/:commentId")
    .delete(isLoggedIn_1.isLoggedIn, commentController_1.deleteComment)
    .put(isLoggedIn_1.isLoggedIn, commentController_1.editComment);
exports.default = router;
