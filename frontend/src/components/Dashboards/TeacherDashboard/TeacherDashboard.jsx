import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  Clock,
  ChevronRight,
  Layers,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { useTeacher } from "../../../context/TeacherContext";

// --- Teacher Data ---
const teacherData = {
  id: "T001",
  name: "Dr. Evelyn Sharp",
  email: "evelyn@uni.edu",
  sectionAssignments: ["MATH-101", "CS-205"],
};

// --- Dummy Data: Aggregated Assignment Stats ---
const assignmentGroups = [
  {
    id: "A-101",
    title: "Assignment 1: Introduction to AI",
    totalSubmitted: 45,
    totalEvaluated: 30,
    remaining: 15,
    status: "InProgress",
  },
  {
    id: "A-102",
    title: "Assignment 2: Neural Networks",
    totalSubmitted: 42,
    totalEvaluated: 42,
    remaining: 0,
    status: "Completed",
  },
  {
    id: "A-103",
    title: "Assignment 3: Computer Vision Basics",
    totalSubmitted: 40,
    totalEvaluated: 5,
    remaining: 35,
    status: "InProgress",
  },
  {
    id: "A-104",
    title: "Assignment 4: Natural Language Processing",
    totalSubmitted: 0,
    totalEvaluated: 0,
    remaining: 0,
    status: "NotStarted",
  },
  {
    id: "A-105",
    title: "Assignment 5: Final Project Proposal",
    totalSubmitted: 38,
    totalEvaluated: 10,
    remaining: 28,
    status: "InProgress",
  },
];

const TeacherDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [assignments, setAssignments] = useState([]);
  const { user } = useAuth();
  const { subjects } = useTeacher();

useEffect(() => {
  if (subjects) {
    setAssignments(subjects.assignments || []);
  }
}, [subjects]);


  console.log(subjects, "from techaser dash");

  // Function to navigate to the details page
  const handleSeeDetails = (assignmentId) => {
    navigate(`/teacher/assignment/${assignmentId}`);
  };

  return (
    <div className="relative z-10  min-h-screen p-4 md:p-8 lg:p-10 space-y-8 text-white font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white">
          Teacher Dashboard: {user && user.name}
        </h2>
        <p className="text-gray-400 mt-2 flex items-center">
          <Layers className="h-4 w-4 mr-2 text-indigo-400" />
          Assigned Sections: {user && user.sectionsAlloted}
        </p>
        <p className="text-gray-400 mt-2 flex items-center">
          <Layers className="h-4 w-4 mr-2 text-indigo-400" />
          Assigned Subjects: {subjects && subjects.name}
        </p>
      </div>

      {/* Main Content: All Assignments List */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-white pb-4 border-b border-gray-800 mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-indigo-400" />
          All Assignments ({assignments.length})
        </h3>

        <div className="space-y-5">
          {assignments.map((assignment,count) => {
            const isCompleted =
              assignment.remaining === 0 && assignment.totalSubmitted > 0;
            const borderColor = isCompleted
              ? "border-green-500/30 hover:border-green-500/50"
              : "border-gray-800 hover:border-indigo-500/50";

            return (
              <div
                key={assignment.id}
                className={`bg-gray-900/50 rounded-xl border ${borderColor} shadow-lg transition-all duration-200 ease-in-out hover:bg-gray-900/80 group overflow-hidden`}
              >
                {/* Assignment Title Row */}
                <div className="p-5 bg-gray-900/80 border-b border-gray-800/50 flex justify-between items-center">
                  <h4 className="text-lg font-bold text-white truncate pr-4">
                    Assignement  {count+1} : {assignment.name}
                    
                  </h4>
                  {isCompleted && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </span>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="p-5 grid grid-cols-3 gap-4 text-center divide-x divide-gray-800">
                  {/* Column 1: Total Submitted */}
                  <div className="flex flex-col items-center justify-center p-2">
                    <span className="text-2xl font-bold text-white">
                      {/* {assignment.submissions} */}20
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider mt-1 flex items-center">
                      <FileText className="h-3 w-3 mr-1 text-indigo-400" />{" "}
                      Total Submitted
                    </span>
                  </div>

                  {/* Column 2: Total Evaluated */}
                  <div className="flex flex-col items-center justify-center p-2">
                    <span className="text-2xl font-bold text-green-400">
                      {/* {assignment.totalEvaluated} */}0
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider mt-1 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-400" />{" "}
                      Evaluated
                    </span>
                  </div>

                  {/* Column 3: Remaining */}
                  <div className="flex flex-col items-center justify-center p-2">
                    <span
                      className={`text-2xl font-bold ${
                        assignment.remaining > 0
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      {/* {assignment.remaining} */}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider mt-1 flex items-center">
                      <Clock
                        className={`h-3 w-3 mr-1 ${
                          assignment.remaining > 0
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      />{" "}
                      Remaining
                    </span>
                  </div>
                </div>

                {/* "See Details" Button Footer */}
                <div
                  onClick={() => handleSeeDetails(assignment.id)}
                  className="bg-gray-900/30 p-3 flex justify-center items-center cursor-pointer border-t border-gray-800/50 hover:bg-indigo-900/10 transition-colors text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  See Detailed Summary
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
