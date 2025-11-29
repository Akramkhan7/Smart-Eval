import React from "react";
// import Login from "./components/Pages/Login";
import Home from "./Pages/Home";
import Login from ".//Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";
import HeaderWrapper from "./components/Home/Headers/HeaderWrapper";
import Student from "./Pages/Student";
import AuthPage from "./Pages/Register";
import { AuthProvider } from "./context/AuthContext";
import StudentDashboard from "./Pages/Student";
import FloatingAnimate from "./Animations/FloatingAnimate";
function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <UserProvider>
            <BrowserRouter>
              {/* <HeaderWrapper /> */}
               <FloatingAnimate />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Dashboard" element={<StudentDashboard />} />
                {/* <Route path="/StudentDashboard" element={<Student />} /> */}
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;
