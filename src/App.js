import { useQuizContext } from "./contexts/QuizContext/useQuizContext";

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

const App = () => {
  const { status, answer } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              {answer !== null && <NextButton />}

              <Timer />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
};

export default App;
