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
import AdminDashboard from "./components/Dashboards/AdminDashboard/AdminDashboard"; 
import FloatingAnimate from "./Animations/FloatingAnimate";
import TeacherAssignmentDetails from "./components/Dashboards/TeacherDashboard/TeacherAssignmentDetails"; // <-- Imported here

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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                
                {/* Teacher Dashboard Routes */}
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher/assignment/:id" element={<TeacherAssignmentDetails />} /> {/* <-- Added Route here */}

                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>

          </BrowserRouter>
        </UserProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;