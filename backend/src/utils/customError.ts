class CustomError extends Error {
    private statusCode: number;
    public message: string;
    private error: object;
    private success: boolean;
    constructor(statusCode = 400, message = "error", error = {}) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.success = false;
    }
}

export { CustomError };
