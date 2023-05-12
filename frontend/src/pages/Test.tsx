import { ChangeEvent, useCallback, useEffect, useMemo, useState, Fragment, useContext } from "react";
import randomWords from "random-words";
import useElapsedTime from "../hooks/useElapsedTime";
import { saveTestResult } from "../api";
import { UserContext } from "../components/UserProvider";
import { Link } from "react-router-dom";

const Test = () => {
  const { username } = useContext(UserContext);

  const [words, setWords] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const { startTimer, elapsed, started, stopTimer } = useElapsedTime();
  const [finished, setFinished] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);

  useEffect(() => {
    const words = randomWords(10);

    setWords(words);
  }, []);

  const paragraph = useMemo(() => {
    return words.join(" ");
  }, [words]);

  useEffect(() => {
    if (typed && !started && !finished) {
      startTimer();
    }
  }, [typed, started]);

  useEffect(() => {
    if (typed.length === paragraph.length && started) {
      setFinished(true);
    }
  }, [typed, paragraph]);

  useEffect(() => {
    if (finished) {
      stopTimer();
    }
  }, [finished]);

  const { wrongCharsIndex, wordCount } = useMemo(() => {
    const diff = [];
    let wordCount = 0;

    let wordCorrect = true;

    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== paragraph[i]) {
        diff.push(i);
        wordCorrect = false;
      } else {
        if (typed[i] === " " || i === paragraph.length - 1) {
          if (wordCorrect) {
            wordCount++;
          }
          wordCorrect = true;
        }
      }
    }

    return { wrongCharsIndex: diff, wordCount };
  }, [words, typed, paragraph]);

  const wpm = useMemo(() => {
    if (elapsed === "0") {
      return "0";
    }

    return ((wordCount / parseInt(elapsed)) * 60).toFixed(0);
  }, [wordCount, elapsed]);

  const paragraphElement = useMemo(() => {
    let start = 0;

    const spanArray = wrongCharsIndex.map((wrongIndex, i) => {
      const element = (
        <Fragment key={i}>
          <span className="bg-green-200">{paragraph.slice(start, wrongIndex)}</span>
          <span className="bg-red-200">{paragraph[wrongIndex]}</span>
        </Fragment>
      );

      start = wrongIndex + 1;

      return element;
    });

    spanArray.push(<span className="bg-green-200">{paragraph.slice(start, typed.length)}</span>);
    spanArray.push(<span>{paragraph.slice(typed.length)}</span>);

    return spanArray;
  }, [wrongCharsIndex, typed, paragraph]);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTyped(e.target.value);
  }, []);

  const handleSubmitResult = async () => {
    await saveTestResult({
      user: username,
      accuracy: ((wordCount / words.length) * 100).toFixed(0) + "%",
      wordCount,
      characterCount: paragraph.length - wrongCharsIndex.length,
      wpm: parseInt(wpm),
    });

    setResultSaved(true);
  };

  const handleRestart = () => {
    setFinished(false);
    setResultSaved(false);
    setTyped("");
    setWords(randomWords(10));
  };

  return (
    <div className="flex flex-col mt-8">
      <div>
        <Link to="/">
          <span className="text-purple-600 underline">Go back to leader board</span>
        </Link>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div>
            <span className="text-lg font-semibold">Timer:</span> {elapsed}
          </div>

          {finished ? (
            <div className="flex flex-row gap-4 mt-4">
              <button onClick={handleRestart} className="bg-green-600 px-2 py-1 rounded-md h-fit text-white">
                Restart Test
              </button>
              {!resultSaved && (
                <button onClick={handleSubmitResult} className="bg-blue-600 px-2 py-1 rounded-md h-fit text-white">
                  Save test result
                </button>
              )}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <div>
            <span className="text-lg font-semibold">Word Count:</span> {wordCount}
          </div>
          <div>
            <span className="text-lg font-semibold">Character Count:</span> {typed.length - wrongCharsIndex.length}
          </div>
          <div>
            <span className="text-lg font-semibold">WPM:</span> {wpm}
          </div>
        </div>
      </div>

      <div className="w-full border rounded-xl border-gray-200 p-4 text-xl mt-4 tracking-wider leading-8 bg-slate-200">
        <p>{paragraphElement}</p>

        <textarea
          autoFocus
          value={typed}
          onChange={handleTextChange}
          className="w-full border-none mt-4 text-xl bg-white tracking-wider leading-8 h-40"
          disabled={finished}
        ></textarea>
      </div>
    </div>
  );
};

export default Test;
