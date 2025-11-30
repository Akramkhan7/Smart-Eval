import React, { useContext } from "react";
import AssignmentUploadForm from "./Student/Upload";
import DashBoard from "./Student/Student";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Student = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Checking login…</p>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <StudentDashboard />
      <AssignmentUploadForm />
    </div>
  );
};

export default Student;
