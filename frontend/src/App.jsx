import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

// Pages & Components
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Teacher from './Pages/Teacher';
import HeaderWrapper from "./components/Home/Headers/HeaderWrapper";
import Teacher from "./Pages/Teacher";
import AuthPage from "./Pages/Register";
import { AuthProvider } from "./context/AuthContext";
import TeacherDashboard from "./components/Dashboards/TeacherDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard/AdminDashboard"; // <-- Imported AdminDashboard
import FloatingAnimate from "./Animations/FloatingAnimate";

// --- Student Dashboard Components ---
import StudentDashboard from './components/Dashboards/StudentDashboard/StudentDashboard';
import StudentSubjectDetails from './components/Dashboards/StudentDashboard/StudentSubjectDetails';
import StudentAssignmentUpload from './components/Dashboards/StudentDashboard/StudentAssignmentUpload';

// --- Teacher Dashboard Components ---
import TeacherDashboard from "./components/Dashboards/TeacherDashboard/TeacherDashboard";
import TeacherAssignmentDetails from "./components/Dashboards/TeacherDashboard/TeacherAssignmentDetails";

// --- Admin Dashboard Components ---
import AdminDashboard from "./components/Dashboards/AdminDashboard/AdminDashboard"; 

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <UserProvider>
            <BrowserRouter>
              <FloatingAnimate />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Student Routes */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/subject/:id" element={<StudentSubjectDetails />} />
                <Route path="/student/subject/:subjectId/assignment/:id" element={<StudentAssignmentUpload />} />

                {/* Teacher Routes */}
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher/assignment/:id" element={<TeacherAssignmentDetails />} />

                {/* Admin Route */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;
