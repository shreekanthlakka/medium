import express from "express";
import {
    createBlog,
    delBlog,
    editBlog,
    getAllBlogs,
    getSingleBlog,
} from "../controllers/blogController";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = express.Router();
router.route("/").get(getAllBlogs).post(isLoggedIn, createBlog);
router
    .route("/:id")
    .get(isLoggedIn, getSingleBlog)
    .put(isLoggedIn, editBlog)
    .delete(isLoggedIn, delBlog);

export default router;
