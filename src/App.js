import { useEffect, useReducer } from "react";

import {
  Error,
  FinishScreen,
  Footer,
  Header,
  Loader,
  Main,
  NextButton,
  Progress,
  Questions,
  StartScreen,
  Timer,
} from "./components";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "received_data": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "failed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    }
    case "new_answer": {
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "next_question": {
      return { ...state, answer: null, index: state.index + 1 };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    }

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  let url;

  if (process.env.REACT_APP_ENV === "production") {
    url = "https://krishandeep17.github.io/data/react-quiz.json";
  } else {
    url = "http://localhost:5000/questions";
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "received_data", payload: data }))
      .catch((err) => dispatch({ type: "failed" }));
  }, [url]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  index={index}
                  numQuestions={numQuestions}
                />
              )}

              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
