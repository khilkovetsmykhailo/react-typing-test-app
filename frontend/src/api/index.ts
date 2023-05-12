import axios from "axios";

export type Test = {
  user: string;
  wpm: number;
  accuracy: string;
  wordCount: number;
  characterCount: number;
  createdAt?: string;
  id?: string;
};

export async function saveTestResult(result: Test) {
  try {
    const res = await axios.post("/api/tests/", result);

    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getLeaderboard() {
  try {
    const res = await axios.get<Test[]>("/api/tests/leader-board");

    return res.data;
  } catch (e) {
    console.log(e);
  }
}
