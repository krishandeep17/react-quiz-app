const Progress = ({ index, numQuestions, points, maxPoints, answer }) => {
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
