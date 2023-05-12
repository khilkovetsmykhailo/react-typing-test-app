import { ChangeEvent, useCallback, useEffect, useMemo, useState, Fragment } from "react";
import randomWords from "random-words";
import useElapsedTime from "../hooks/useElapsedTime";

const Test = () => {
  const [words, setWords] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const { startTimer, elapsed, started, stopTimer } = useElapsedTime();
  const [finished, setFinished] = useState(false);

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

  const handleTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTyped(e.target.value);
  }, []);

  const { wrongCharsIndex, wordCount } = useMemo(() => {
    const diff = [];
    let wordCount = 0;

    let wordCorrect = true;

    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== paragraph[i]) {
        diff.push(i);
        wordCorrect = false;
      } else {
        if (typed[i] === " " || i === paragraph.length) {
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
      return 0;
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

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row justify-between">
        <div>Timer: {elapsed}</div>
        <div>Word Count: {wordCount}</div>
        <div>Character Count: {typed.length - wrongCharsIndex.length}</div>
        <div>WPM: {wpm}</div>
      </div>

      <div className="w-full border rounded-xl border-gray-200 p-4 text-xl mt-4 tracking-wider leading-8 bg-slate-200">
        <p>{paragraphElement}</p>

        <textarea
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
