"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode = 400, message = "error", error = {}) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.success = false;
    }
}
exports.CustomError = CustomError;
