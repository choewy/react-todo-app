import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import './index.css'

ReactDOM.render(
  <HashRouter>
    <AuthProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </AuthProvider>
  </HashRouter>,
  document.getElementById('root')
);
