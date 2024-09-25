"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const clapRoutes_1 = __importDefault(require("./routes/clapRoutes"));
const fs_1 = __importDefault(require("fs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
// const dirName = dirname(fileURLToPath(import.meta.url));
const writeStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), {
    flags: "a",
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev", {
    stream: writeStream,
}));
app.use((0, cookie_parser_1.default)());
const allowedOrigins = ["http://localhost:5173"];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        if (allowedOrigins.includes(origin)) {
            res.header("Access-Control-Allow-Origin", origin);
            res.header("Access-Control-Allow-Credentials", "true");
        }
    }
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE ,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization ");
    next();
});
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.sendStatus(200); // Send 200 OK for OPTIONS requests
});
app.use((req, res, next) => {
    console.log(`${req.url} ==> ${req.method} ==> ${req.originalUrl} ==> ${JSON.stringify(req.query)} ==> ${new Date()}`);
    next();
});
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/blog", blogRoutes_1.default);
app.use("/api/v1/comments", commentRoutes_1.default);
app.use("/api/v1/claps", clapRoutes_1.default);
exports.default = app;
