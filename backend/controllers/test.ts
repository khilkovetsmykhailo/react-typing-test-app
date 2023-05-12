import type { Request, Response } from "express";
import Test from "../models/Test";

export async function create(req: Request, res: Response) {
  const testData = req.body;

  const test = await Test.create(testData);

  return res.json(test);
}

export async function getLeaderBoard(req: Request, res: Response) {
  const tests = await Test.find().sort({ wpm: -1, accuracy: -1 }).limit(10);

  return res.json(tests);
}
