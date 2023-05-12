import express from "express";
import { create } from "../controllers/test";

const router = express.Router();

router.post("/tests", create);

export default router;
