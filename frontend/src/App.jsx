import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";
import HeaderWrapper from "./components/Home/Headers/HeaderWrapper";
import Teacher from "./Pages/Teacher";
import AuthPage from "./Pages/Register";
import { AuthProvider } from "./context/AuthContext";
import TeacherDashboard from "./components/Dashboards/TeacherDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard/AdminDashboard"; // <-- Imported AdminDashboard
import FloatingAnimate from "./Animations/FloatingAnimate";
import StudentDashboard from "./Pages/Student";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <UserProvider>
            <BrowserRouter>
              <FloatingAnimate />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route
                  path="/student/dashboard"
                  element={<StudentDashboard />}
                />
                <Route
                  path="/teacher/dashboard"
                  element={<TeacherDashboard />}
                />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
                {/* <-- Added Admin Route */}
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
