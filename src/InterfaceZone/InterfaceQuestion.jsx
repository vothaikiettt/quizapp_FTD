import { useCallback, useRef, useState } from "react";
import QUESTION from "../question.js";
import "./InterfaceQuestion.css";
import PicOfFinished from "../assets/vite.svg";
import TimeOut from "./QuestionTimer.jsx";

export default function InterfaceQuestion() {
  const shuffledAnswers = useRef();

  const [UserAnswers, setUserAnswers] = useState([]);
  const [UserState, setUserState] = useState(""); 

  const activeQuestion =
    UserState === "" ? UserAnswers.length : UserAnswers.length - 1;

  const QuizComplete = activeQuestion === QUESTION.length;

  const HandleSelectAnswer = useCallback(
    function HandleSelectAnswer(SelectAnswer) {
      setUserState("answered");
      setUserAnswers((prevAnswer) => [...prevAnswer, SelectAnswer]);

      setTimeout(() => {
        if (SelectAnswer === QUESTION[activeQuestion].answers[0]) {
          setUserState("right");
        } else {
          setUserState("wrong");
        }

        setTimeout(() => {
          setUserState("");
          shuffledAnswers.current = null; 
        }, 2000); 
      }, 1000); 
    },
    [activeQuestion]
  );

  const handleSkipAns = useCallback(() => {
    HandleSelectAnswer(null);
  }, [HandleSelectAnswer]);

  if (QuizComplete) {
    return (
      <div id="submitBefore">
        <img src={PicOfFinished} alt="AnhKetThuc" />
        <h2>Quiz Completed !</h2>
      </div>
    );
  }

  function shuffleArray(array) {
    const shuffled = [...array]; 
    for (let i = shuffled.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = shuffleArray(QUESTION[activeQuestion].answers);
  }

  return (
    <>
      <div className="id">
        <div className="question">
          <TimeOut
            key={activeQuestion}
            TimeOut={10000}
            OntimeOut={handleSkipAns}
          />
          <h3>{QUESTION[activeQuestion].text}</h3>
          <div className="answer">
            {shuffledAnswers.current.map((ans) => {
              const IsSelectQuestion = UserAnswers[UserAnswers.length - 1] === ans;
              let cssClass = "";

              if (UserState === "answered" && IsSelectQuestion) {
                cssClass = "answered";
              }

              if (
                (UserState === "right" || UserState === "wrong") &&
                IsSelectQuestion
              ) {
                cssClass = UserState;
              }

              return (
                <li key={ans} className="ans">
                  <button
                    className={cssClass}
                    onClick={() => HandleSelectAnswer(ans)}
                  >
                    {ans}
                  </button>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}