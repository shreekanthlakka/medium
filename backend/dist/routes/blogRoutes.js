"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
router.route("/").get(blogController_1.getAllBlogs).post(isLoggedIn_1.isLoggedIn, blogController_1.createBlog);
router
    .route("/:id")
    .get(isLoggedIn_1.isLoggedIn, blogController_1.getSingleBlog)
    .put(isLoggedIn_1.isLoggedIn, blogController_1.editBlog)
    .delete(isLoggedIn_1.isLoggedIn, blogController_1.delBlog);
exports.default = router;
