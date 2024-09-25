import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { omitFields } from "./omitFields";
import { User } from "@prisma/client";
import { prisma } from "../db";

export const sendCookie = async (user: User, res: Response) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("no secret provided");
    }
    try {
        const token = await jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        await prisma.user.update({
            where: { id: user.id },
            data: { accessToken: token },
        });
        const options: {
            httpOnly: boolean;
            secure: boolean;
            maxAge: number;
            sameSite: "strict" | "lax" | "none";
        } = {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 1,
            sameSite: "none",
        };
        res.status(200)
            .cookie("accessToken", token, options)
            .json({
                statusCode: 200,
                message: "User logged in successfully",
                success: true,
                accessToken: token,
                data: omitFields(user, ["password"]),
            });
    } catch (error: any) {
        res.status(error.statusCode || 500).json({
            statusCode: error.statusCode || 500,
            message: error.message || "Failed to login",
            success: false,
        });
    }
};
