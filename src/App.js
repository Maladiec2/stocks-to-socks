import React from 'react';
import './App.css';
import Converter from './components/converter/Converter';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import HomePage from './components/pages/HomePage';

function App() {
  return (
    <div className="App">
      <RegisterPage />
    </div>
  );
}

export default App;
