"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    constructor(statusCode = 200, message = "success", data = []) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}
exports.CustomResponse = CustomResponse;
