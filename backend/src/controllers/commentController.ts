import { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db";
import { CustomError } from "../utils/customError";
import { CustomResponse } from "../utils/customResponse";

const createComment = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { comment } = req.body;
    // @ts-ignore
    const userId = req.user.id;

    const commentObj = await prisma.comment.create({
        data: {
            blogId,
            userId,
            comment,
        },
    });
    if (!commentObj) {
        throw new CustomError(400, "Failed to create Comment");
    }
    res.status(201).json(
        new CustomResponse(201, "comment created", commentObj)
    );
});

const getCommentsByBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const comments = await prisma.comment.findMany({
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
        throw new CustomError(401, "failed to get all comments");
    }
    res.status(200).json(
        new CustomResponse(200, "comments retrieved", comments)
    );
});

const editComment = asyncHandler(async (req, res) => {
    const { commentId, blogId } = req.params;
    const { comment } = req.body;
    // @ts-ignore
    const userId = req.user.id;
    const updateComment = await prisma.comment.update({
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
        throw new CustomError(400, "failed to update comment");
    }
    res.status(200).json(
        new CustomResponse(200, "comment updated", updateComment)
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId, blogId } = req.params;
    // @ts-ignore
    const userId = req.user.id;
    const delComment = await prisma.comment.delete({
        where: {
            id: commentId,
            userId,
        },
    });
    if (!delComment) {
        throw new CustomError(400, "failed to delete comment");
    }
    res.status(200).json(
        new CustomResponse(200, "comment deleted", delComment)
    );
});

export { createComment, getCommentsByBlog, editComment, deleteComment };
