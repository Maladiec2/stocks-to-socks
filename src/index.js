import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Route exact path="/">
        <App />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </div>
    </Router>,
  </React.StrictMode>,
  document.getElementById('root')
);
