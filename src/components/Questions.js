import { useQuizContext } from "../contexts/QuizContext/useQuizContext";

const Questions = () => {
  const { questions, index, answer, dispatch } = useQuizContext();

  const { question, options, correctOption } = questions[index];

  const hasAnswer = answer !== null;

  const correctClass = (i) =>
    hasAnswer && (i === correctOption ? "correct" : "wrong");

  const answerClass = (i) => i === answer && "answer";

  return (
    <div>
      <h4>{question}</h4>

      <div className="options">
        {options.map((option, i) => (
          <button
            key={option}
            className={`btn btn-option ${correctClass(i)} ${answerClass(i)}`}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "new_answer", payload: i })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
