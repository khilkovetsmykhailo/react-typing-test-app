import { useState, useEffect, useRef } from "react";

const useElapsedTime = () => {
  const [start, setStart] = useState<number>(0);
  const [elapsed, setElapsed] = useState("0");
  const [started, setStarted] = useState(false);
  const timer = useRef<number | null>(null);

  const startTimer = () => {
    setStarted(true);
    setElapsed("0");
  };

  const stopTimer = () => {
    setStarted(false);
    if (timer.current) clearInterval(timer.current);
  };

  useEffect(() => {
    if (started) {
      setStart(new Date().getTime());

      timer.current = setInterval(() => {
        const elapsed = ((new Date().getTime() - start) / 1000).toFixed(0);
        setElapsed(elapsed);
      }, 1000);

      return () => {
        if (timer.current) clearInterval(timer.current);
      };
    } else {
      if (timer.current) clearInterval(timer.current);
    }
  }, [started, start]);

  return { startTimer, elapsed, stopTimer, started };
};

export default useElapsedTime;
