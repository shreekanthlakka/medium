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
exports.deleteComment = exports.editComment = exports.getCommentsByBlog = exports.createComment = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const db_1 = require("../db");
const customError_1 = require("../utils/customError");
const customResponse_1 = require("../utils/customResponse");
const createComment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { comment } = req.body;
    // @ts-ignore
    const userId = req.user.id;
    const commentObj = yield db_1.prisma.comment.create({
        data: {
            blogId,
            userId,
            comment,
        },
    });
    if (!commentObj) {
        throw new customError_1.CustomError(400, "Failed to create Comment");
    }
    res.status(201).json(new customResponse_1.CustomResponse(201, "comment created", commentObj));
}));
exports.createComment = createComment;
const getCommentsByBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const comments = yield db_1.prisma.comment.findMany({
        where: {
            blogId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!comments) {
        throw new customError_1.CustomError(401, "failed to get all comments");
    }
    res.status(200).json(new customResponse_1.CustomResponse(200, "comments retrieved", comments));
}));
exports.getCommentsByBlog = getCommentsByBlog;
const editComment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, blogId } = req.params;
    const { comment } = req.body;
    // @ts-ignore
    const userId = req.user.id;
    const updateComment = yield db_1.prisma.comment.update({
        where: {
            id: commentId,
            userId,
            blogId,
        },
        data: {
            comment,
        },
    });
    if (!updateComment) {
        throw new customError_1.CustomError(400, "failed to update comment");
    }
    res.status(200).json(new customResponse_1.CustomResponse(200, "comment updated", updateComment));
}));
exports.editComment = editComment;
const deleteComment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, blogId } = req.params;
    // @ts-ignore
    const userId = req.user.id;
    const delComment = yield db_1.prisma.comment.delete({
        where: {
            id: commentId,
            userId,
        },
    });
    if (!delComment) {
        throw new customError_1.CustomError(400, "failed to delete comment");
    }
    res.status(200).json(new customResponse_1.CustomResponse(200, "comment deleted", delComment));
}));
exports.deleteComment = deleteComment;
