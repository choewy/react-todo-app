import React from 'react';
import { Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import Home from './components/Common/Home';
import Page404 from './components/Common/Page404';
import { useAuthState } from './context/AuthContext';
import AuthRoute from './routes/AuthRoute';
import TodoRoute from './routes/TodoRoute';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`

const App = () => {
  const auth = useAuthState();
  return (
    <>
      <GlobalStyle />
      <Header auth={auth} />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/auth/" component={AuthRoute} />
        <Route path="/todo/" component={TodoRoute} />
        <Route path="/" component={Page404} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;