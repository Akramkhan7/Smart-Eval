import React from "react";
// import Login from "./components/Pages/Login";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import CyberAuth from "./components/Pages/Register";

function App() {
  return (
    <>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CyberAuth />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
}

export default App;
