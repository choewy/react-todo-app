import React from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from './components/Auth';
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import Home from './components/Common/Home';
import Page404 from './components/Common/Page404';
import Todo from './components/Todo';

const App = () => {
  // 이거 다시 적용하는 거 검토
  // 아, auth만 사용하는 걸로
  // 왜냐하면 새로고침하거나 바로 진입할 경우 location.state props 못 받음.

  return (
    <div className="App">
      <Header />
      < main className="main">
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/auth/" component={Auth} />
          <Route path="/todo/" component={Todo} />
          <Route path="/" component={Page404} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;