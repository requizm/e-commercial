import React from "react";
import ReactDOM from "react-dom";
import './index.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./page/LoginPage/LoginPage";
import { RegisterPage } from "./page/RegisterPage/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}>
        </Route>
        <Route path="/register" element={<RegisterPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);