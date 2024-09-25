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
exports.sendCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const omitFields_1 = require("./omitFields");
const db_1 = require("../db");
const sendCookie = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_SECRET) {
        throw new Error("no secret provided");
    }
    try {
        const token = yield jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        yield db_1.prisma.user.update({
            where: { id: user.id },
            data: { accessToken: token },
        });
        const options = {
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
            data: (0, omitFields_1.omitFields)(user, ["password"]),
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            statusCode: error.statusCode || 500,
            message: error.message || "Failed to login",
            success: false,
        });
    }
});
exports.sendCookie = sendCookie;
