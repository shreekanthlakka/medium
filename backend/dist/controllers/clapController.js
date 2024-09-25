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
exports.createClap = exports.getTotalClaps = void 0;
const db_1 = require("../db");
const asyncHandler_1 = require("../utils/asyncHandler");
const customResponse_1 = require("../utils/customResponse");
exports.getTotalClaps = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const claps = yield db_1.prisma.clap.findMany({
        where: {
            blogId: blogId,
        },
    });
    res.status(200).json(new customResponse_1.CustomResponse(200, "total claps", claps));
}));
exports.createClap = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    // @ts-ignore
    const userId = req.user.id;
    const newClap = yield db_1.prisma.clap.create({
        data: {
            blogId,
            userId,
        },
    });
    res.status(201).json(new customResponse_1.CustomResponse(201, "clap created", newClap));
}));
