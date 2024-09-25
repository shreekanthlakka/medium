import { prisma } from "../db";
import { asyncHandler } from "../utils/asyncHandler";
import { CustomResponse } from "../utils/customResponse";

export const getTotalClaps = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const claps = await prisma.clap.findMany({
        where: {
            blogId: blogId,
        },
    });
    res.status(200).json(new CustomResponse(200, "total claps", claps));
});

export const createClap = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    // @ts-ignore
    const userId = req.user.id;
    const newClap = await prisma.clap.create({
        data: {
            blogId,
            userId,
        },
    });
    res.status(201).json(new CustomResponse(201, "clap created", newClap));
});
