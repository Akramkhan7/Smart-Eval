import React from "react";
// import Login from "./components/Pages/Login";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
}

export default App;
