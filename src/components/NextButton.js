import { useQuizContext } from "../contexts/QuizContext/useQuizContext";

const NextButton = () => {
  const { index, dispatch, numQuestions } = useQuizContext();

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-right"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }

  return (
    <button
      className="btn btn-right"
      onClick={() => dispatch({ type: "next_question" })}
    >
      Next
    </button>
  );
};

export default NextButton;
