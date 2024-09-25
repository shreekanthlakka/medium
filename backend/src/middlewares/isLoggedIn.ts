import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../utils/customError";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    const token: string | null =
        req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    if (!token) {
        throw new CustomError(402, "not authorized to access this page");
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decode as JwtPayload;
    next();
});
