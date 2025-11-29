import React from "react";
// import Login from "./components/Pages/Login";
import Home from "./Pages/Home"
import Login from ".//Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import CyberAuth from "./Pages/Register";
import { UserProvider } from "./context/UserContext";
import HeaderWrapper from "./components/Home/Headers/HeaderWrapper";
import Student from './Pages/Student'


import CyberAuth from "./components/Pages/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <ToastProvider>
        <UserProvider>
        <BrowserRouter>
      <HeaderWrapper />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CyberAuth />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/StudentDashboard" element={<Student />} /> */}
          </Routes>
        </BrowserRouter>
        </UserProvider>
      </ToastProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<CyberAuth />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;
