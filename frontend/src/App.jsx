import React from "react";
// import Login from "./components/Pages/Login";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
