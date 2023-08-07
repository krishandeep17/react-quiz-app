import { useEffect, useReducer } from "react";

import { Error, Header, Loader, Main } from "./components";

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

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "received_data", payload: data }))
      .catch((err) => dispatch({ type: "failed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
};

export default App;
