import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import App from './App';
import './index.css';
import { AppProvider } from './context/AppContext';

ReactDOM.render(
  <HashRouter>
    <AppProvider>
      <AuthProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthProvider>
    </AppProvider>
  </HashRouter>,
  document.getElementById('root')
);