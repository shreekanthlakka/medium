import express from "express";
import { createClap, getTotalClaps } from "../controllers/clapController";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = express.Router();

router.route("/:blogId").get(getTotalClaps).post(isLoggedIn, createClap);

export default router;
