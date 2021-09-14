import { Route, Switch } from "react-router";
import Head from "./component/common/Head";
import Header from "./component/common/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import TodoPage from "./pages/TodoPage";
import Aside from "./component/common/Aside";
import { useRef } from "react";

const App = () => {

  const asideElement = useRef();
  const containerElement = useRef();

  return (
    <>
      <Head />
      <Header props={{ asideElement, containerElement }} />
      <main>
        <div ref={asideElement} className="aside">
          <Aside />
        </div>
        <div ref={containerElement} className="container">
          <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/todo" component={TodoPage} />
            <Route path="/" component={NotFoundPage} />
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
