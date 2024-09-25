import dotenv from "dotenv";
import app from "./app";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
