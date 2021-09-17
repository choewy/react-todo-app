import { useEffect, useRef } from "react";
import { Route, Switch } from "react-router";
import Head from "./component/common/Head";
import Header from "./component/common/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import TodoPage from "./pages/TodoPage";
import Aside from "./component/common/Aside";
import { useAppDispatch } from "./context/AppContext";
import Footer from "./component/common/Footer";

const App = () => {

  const dispatch = useAppDispatch();

  const asideElement = useRef();
  const containerElement = useRef();

  useEffect(() => {
    dispatch({ type: "init_aside", asideElement, containerElement })
  })

  return (
    <>
      <Head />
      <Header />
      <main>
        <div ref={asideElement} className="aside">
          <Aside />
        </div>
        <div ref={containerElement} className="container">
          <div className="component">
            <Switch>
              <Route exact={true} path="/" component={HomePage} />
              <Route path="/auth" component={AuthPage} />
              <Route path="/todo" component={TodoPage} />
              <Route path="/" component={NotFoundPage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
