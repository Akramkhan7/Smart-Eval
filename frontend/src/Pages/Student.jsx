import React from "react";
import AssignmentUploadForm from "./Student/Upload";
import DashBoard from "./Student/Student";
import StudentDashboard from "../components/Dashboards/StudentDashboard/StudentDashboard";

const Student = () => {
  return (
    <div>
      <StudentDashboard />
      <AssignmentUploadForm />
    </div>
  );
};

export default Student;
