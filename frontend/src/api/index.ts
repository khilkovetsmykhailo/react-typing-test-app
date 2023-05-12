import axios from "axios";

type Test = {
  user: string;
  wpm: number;
  accuracy: string;
  wordCount: number;
  characterCount: number;
  created_at?: string;
};

export async function saveTestResult(result: Test) {
  try {
    const res = await axios.post("/api/tests/", result);

    return res.data;
  } catch (e) {
    console.log(e);
  }
}
