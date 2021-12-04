import React from 'react';
import { Header } from '../Header/Header';
import { Login } from '../Login/Login';
import './style/App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Login/>
    </div>
  );
}

export default App;
