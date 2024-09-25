import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import commentRoutes from "./routes/commentRoutes";
import clapRoutes from "./routes/clapRoutes";
import fs from "fs";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// const dirName = dirname(fileURLToPath(import.meta.url));

const writeStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan("dev", {
        stream: writeStream,
    })
);
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        if (allowedOrigins.includes(origin)) {
            res.header("Access-Control-Allow-Origin", origin);
            res.header("Access-Control-Allow-Credentials", "true");
        }
    }
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE ,PATCH"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );

    next();
});

app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.sendStatus(200); // Send 200 OK for OPTIONS requests
});

app.use((req, res, next) => {
    console.log(
        `${req.url} ==> ${req.method} ==> ${
            req.originalUrl
        } ==> ${JSON.stringify(req.query)} ==> ${new Date()}`
    );
    next();
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/claps", clapRoutes);

export default app;
