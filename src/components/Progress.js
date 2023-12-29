import { useQuizContext } from "../contexts/QuizContext/useQuizContext";

const Progress = () => {
  const { index, answer, points, numQuestions, maxPoints } = useQuizContext();

  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer)}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </div>
  );
};

export default Progress;
