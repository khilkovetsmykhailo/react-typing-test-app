import type { Request, Response } from "express";
import Test from "../models/Test";

export async function create(req: Request, res: Response) {
  const testData = req.body;

  const test = await Test.create(testData);

  return res.json(test);
}
