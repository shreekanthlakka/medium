import express from "express";
import {
    createComment,
    deleteComment,
    editComment,
    getCommentsByBlog,
} from "../controllers/commentController";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = express.Router();

router.route("/:blogId").post(isLoggedIn, createComment).get(getCommentsByBlog);

router
    .route("/:blogId/:commentId")
    .delete(isLoggedIn, deleteComment)
    .put(isLoggedIn, editComment);

export default router;
