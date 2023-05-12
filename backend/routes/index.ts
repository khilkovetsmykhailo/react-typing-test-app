import express from "express";
import { create, getLeaderBoard } from "../controllers/test";

const router = express.Router();

router.post("/tests", create);
router.get("/tests/leader-board", getLeaderBoard);

export default router;
