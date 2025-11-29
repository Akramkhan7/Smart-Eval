import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";
import HeaderWrapper from "./components/Home/Headers/HeaderWrapper";
import Teacher from './Pages/Teacher';
import StudentDashboard from './components/Dashboards/StudentDashboard';
import AuthPage from "./Pages/Register";
import { AuthProvider } from "./context/AuthContext";
import TeacherDashboard from "./components/Dashboards/TeacherDashboard";
import FloatingAnimate from "./Animations/FloatingAnimate";

import StudentDashboard from "./Pages/Student";
import FloatingAnimate from "./Animations/FloatingAnimate";
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <UserProvider>
          <BrowserRouter>
            
            {/* 🔥 Background animation for EVERY page */}
            <FloatingAnimate />

            <HeaderWrapper />

            <div className="relative z-10">
    <>
      <AuthProvider>
        <ToastProvider>
          <UserProvider>
            <BrowserRouter>
              {/* <HeaderWrapper /> */}
               <FloatingAnimate />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Dashboard" element={<StudentDashboard />} />
                {/* <Route path="/StudentDashboard" element={<Student />} /> */}
              </Routes>
            </div>

          </BrowserRouter>
        </UserProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
