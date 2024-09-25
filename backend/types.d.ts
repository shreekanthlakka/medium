import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload | User; // Add user property, adjust type based on your JWT payload
        }
    }
}
