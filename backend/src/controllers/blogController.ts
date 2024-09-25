import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";
import { CustomError } from "../utils/customError";
import { CustomResponse } from "../utils/customResponse";

const createBlog = asyncHandler(async (req, res) => {
    // @ts-ignore
    const authorId: string = req.user.id;
    const { title, content } = req.body;
    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            published: false,
            author: { connect: { id: authorId } },
        },
    });
    if (!blog) {
        throw new CustomError(400, "failed to create a blog");
    }
    res.status(201).json(new CustomResponse(201, "blog created", blog));
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await prisma.blog.findMany({
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
    res.status(200).json(new CustomResponse(200, "all blogs", blogs));
});

const getSingleBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const blog = await prisma.blog.findUnique({
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
        throw new CustomError(400, "no blog found");
    }
    res.status(200).json(
        new CustomResponse(200, `blog with id ${blogId}`, blog)
    );
});

const editBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const { title, content } = req.body;
    const blog = await prisma.blog.update({
        where: {
            id: blogId,
        },
        data: {
            title,
            content,
        },
    });
    if (!blog) {
        throw new CustomError(400, "failed to updata");
    }
    res.status(200).json(
        new CustomResponse(200, `blog with id ${blogId} updated`, blog)
    );
});

const delBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const blog = await prisma.blog.delete({
        where: {
            id: blogId,
        },
    });
    res.status(200).json(new CustomResponse(200, "blog deleted", blog));
});

export { delBlog, editBlog, createBlog, getAllBlogs, getSingleBlog };
