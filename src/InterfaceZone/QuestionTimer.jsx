import { useState, useEffect } from "react";
import "./QuestionTimer.css";
export default function TimeOut({ TimeOut, OntimeOut }) {
  const [RemainingTime, setRemainingTime] = useState(TimeOut);

  useEffect(() => {
    const timer = setTimeout(OntimeOut, TimeOut);
    return () => {
      clearTimeout(timer);
    };
  }, [TimeOut, OntimeOut]);

  useEffect(() => {
    setInterval(() => {
      const Interval = setRemainingTime(
        (prevRemainingTime) => prevRemainingTime - 100,
      );
      return () => {
        clearInterval(Interval);
      };
    }, 100);
  }, []);

  return (
    <>
      <div className="progress_bar">
        <progress max={TimeOut} value={RemainingTime}/>
      </div>
    </>
  );
}
