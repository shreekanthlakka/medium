import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db";
import bcrypt, { hashSync } from "bcryptjs";
import { CustomError } from "../utils/customError";
import { CustomResponse } from "../utils/customResponse";
import { sendCookie } from "../utils/sendToken";
import { Request, Response } from "express";
import { omitFields } from "../utils/omitFields";

const signinController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        throw new CustomError(401, "Invalid email or password");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new CustomError(401, "Invalid email or password");
    }
    if (isValidPassword) {
        sendCookie(user, res);
    }
});

const signupController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log("req.body => ", req.body);
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPass,
        },
    });
    console.log("User => ", user);
    if (!user) {
        throw new CustomError(400, "failed to create user");
    }
    res.status(200).json(
        new CustomResponse(200, "success", omitFields(user, ["password"]))
    );
});

const logoutController = asyncHandler(async (req, res) => {
    // @ts-ignore
    const id = req.user.id;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new CustomError(401, "Unauthorized");
    }

    user.accessToken = null;
    res.status(200)
        .clearCookie("token", {
            httpOnly: true,
            secure: true,
            maxAge: 0,
        })
        .json(
            new CustomResponse(
                200,
                "user logout sucessfully",
                omitFields(user, ["password", "accessToken"])
            )
        );
});

const currentUser = asyncHandler(async (req, res) => {
    // @ts-ignore
    const id = req.user.id;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new CustomError(401, "Unauthorized");
    }
    res.status(200).json({
        statusCode: 200,
        sucess: true,
        isAuthenticated: true,
        data: omitFields(user, ["password", "accessToken"]),
        message: "User Authenticated Sucessfully",
    });
});

export { signinController, signupController, logoutController, currentUser };
