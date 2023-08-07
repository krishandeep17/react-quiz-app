const NextButton = ({ dispatch }) => {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "next_question" })}
    >
      Next
    </button>
  );
};

export default NextButton;
