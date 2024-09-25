import { Request, Response, NextFunction } from "express";

const asyncHandler = (
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err: any) {
            return res.status(err.statusCode || 500).json({
                statusCode: err.statusCode || 500,
                message: err.message || "internal server error",
                success: false,
            });
        }
    };
};

export { asyncHandler };
