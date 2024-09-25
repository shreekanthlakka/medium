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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.logoutController = exports.signupController = exports.signinController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customError_1 = require("../utils/customError");
const customResponse_1 = require("../utils/customResponse");
const sendToken_1 = require("../utils/sendToken");
const omitFields_1 = require("../utils/omitFields");
const signinController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        throw new customError_1.CustomError(401, "Invalid email or password");
    }
    const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new customError_1.CustomError(401, "Invalid email or password");
    }
    if (isValidPassword) {
        (0, sendToken_1.sendCookie)(user, res);
    }
}));
exports.signinController = signinController;
const signupController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log("req.body => ", req.body);
    const hashedPass = yield bcryptjs_1.default.hash(password, 10);
    const user = yield db_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPass,
        },
    });
    console.log("User => ", user);
    if (!user) {
        throw new customError_1.CustomError(400, "failed to create user");
    }
    res.status(200).json(new customResponse_1.CustomResponse(200, "success", (0, omitFields_1.omitFields)(user, ["password"])));
}));
exports.signupController = signupController;
const logoutController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.user.id;
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new customError_1.CustomError(401, "Unauthorized");
    }
    user.accessToken = null;
    res.status(200)
        .clearCookie("token", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
    })
        .json(new customResponse_1.CustomResponse(200, "user logout sucessfully", (0, omitFields_1.omitFields)(user, ["password", "accessToken"])));
}));
exports.logoutController = logoutController;
const currentUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.user.id;
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new customError_1.CustomError(401, "Unauthorized");
    }
    res.status(200).json({
        statusCode: 200,
        sucess: true,
        isAuthenticated: true,
        data: (0, omitFields_1.omitFields)(user, ["password", "accessToken"]),
        message: "User Authenticated Sucessfully",
    });
}));
exports.currentUser = currentUser;
