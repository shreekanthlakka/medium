"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleBlog = exports.getAllBlogs = exports.createBlog = exports.editBlog = exports.delBlog = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const db_1 = require("../db");
const customError_1 = require("../utils/customError");
const customResponse_1 = require("../utils/customResponse");
const createBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const authorId = req.user.id;
    const { title, content } = req.body;
    const blog = yield db_1.prisma.blog.create({
        data: {
            title,
            content,
            published: false,
            author: { connect: { id: authorId } },
        },
    });
    if (!blog) {
        throw new customError_1.CustomError(400, "failed to create a blog");
    }
    res.status(201).json(new customResponse_1.CustomResponse(201, "blog created", blog));
}));
exports.createBlog = createBlog;
const getAllBlogs = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield db_1.prisma.blog.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
        },
    });
    // console.log("blogs => ", blogs);
    res.status(200).json(new customResponse_1.CustomResponse(200, "all blogs", blogs));
}));
exports.getAllBlogs = getAllBlogs;
const getSingleBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const blog = yield db_1.prisma.blog.findUnique({
        where: {
            id: blogId,
        },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!blog) {
        throw new customError_1.CustomError(400, "no blog found");
    }
    res.status(200).json(new customResponse_1.CustomResponse(200, `blog with id ${blogId}`, blog));
}));
exports.getSingleBlog = getSingleBlog;
const editBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const { title, content } = req.body;
    const blog = yield db_1.prisma.blog.update({
        where: {
            id: blogId,
        },
        data: {
            title,
            content,
        },
    });
    if (!blog) {
        throw new customError_1.CustomError(400, "failed to updata");
    }
    res.status(200).json(new customResponse_1.CustomResponse(200, `blog with id ${blogId} updated`, blog));
}));
exports.editBlog = editBlog;
const delBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const blog = yield db_1.prisma.blog.delete({
        where: {
            id: blogId,
        },
    });
    res.status(200).json(new customResponse_1.CustomResponse(200, "blog deleted", blog));
}));
exports.delBlog = delBlog;
