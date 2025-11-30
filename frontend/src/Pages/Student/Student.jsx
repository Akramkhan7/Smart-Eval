import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  Clock,
  XOctagon,
  User,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  X,
  FileText,
  Upload,
  Settings,
  Users,
  Bell,
  Lock,
  BookOpen,
  Layers,
  Zap,
  Code,
  Shield,
  Menu,
  List,
  // FIX: Added missing icons
  AlertTriangle,
  Star,
} from "lucide-react";
import LoginHeader from "../../components/Home/Headers/LoginHeader";
// import second from '
// import { Card } from "framer-motion";

const __app_id = "assignment-platform-v1";
const firebaseConfig = {}; // Placeholder

const Card = ({
  title,
  value,
  icon: Icon,
  colorClass = "text-indigo-400",
  children,
}) => (
  <div className="p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <Icon className={`h-6 w-6 ${colorClass}`} />
    </div>
    {value && <p className="mt-1 text-3xl font-bold text-white">{value}</p>}
    {children}
  </div>
);
const studentData = [
  {
    id: "S1001",
    name: "Alex Johnson",
    subject: "Calculus I",
    assignmentId: "A-201",
    score: 92,
    maxScore: 100,
    status: "Completed",
    submissionDate: "2025-11-25",
    submissionTime: "10:30 AM",
    plagiarismPercent: 5,
    extraDetail: "High Distinction",
    teacherId: "T001",
  },
  {
    id: "S1002",
    name: "Maria Lopez",
    subject: "Digital Marketing",
    assignmentId: "R-305",
    score: null,
    maxScore: 5,
    status: "In Review",
    submissionDate: "2025-11-24",
    submissionTime: "04:15 PM",
    plagiarismPercent: 0,
    extraDetail: "Draft 1 Received",
    teacherId: "T002",
  },
  {
    id: "S1003",
    name: "Chen Wei",
    subject: "Data Structures",
    assignmentId: "P-112",
    score: 55,
    maxScore: 100,
    status: "Completed",
    submissionDate: "2025-11-23",
    submissionTime: "09:50 AM",
    plagiarismPercent: 12,
    extraDetail: "Requires Resubmission",
    teacherId: "T001",
  },
  {
    id: "S1004",
    name: "Rohan Kapoor",
    subject: "Econometrics",
    assignmentId: "Q-08",
    score: 65,
    maxScore: 100,
    status: "Completed",
    submissionDate: "2025-11-20",
    submissionTime: "11:45 AM",
    plagiarismPercent: 22,
    extraDetail: "High Plagiarism",
    teacherId: "T003",
  },
  {
    id: "S1005",
    name: "Kavya Menon",
    subject: "Physics Lab Report",
    assignmentId: "L-01",
    score: 4,
    maxScore: 5,
    status: "Completed",
    submissionDate: "2025-11-18",
    submissionTime: "06:20 PM",
    plagiarismPercent: 3,
    extraDetail: "Experiment 3",
    teacherId: "T002",
  },
];

const DashBoard = ({ onDetailsClick }) => {
  const [assignments, setAssignments] = useState(studentData);
  const StatusBadge = ({ status, isHighPlag = false }) => {
    let colorClass = "bg-gray-700 text-gray-300";
    let icon = Clock;

    if (status === "Completed" || status === "Pass") {
      colorClass = "bg-green-600/20 text-green-400";
      icon = CheckCircle;
    } else if (status === "Fail") {
      colorClass = "bg-red-600/20 text-red-400";
      icon = XOctagon;
    } else if (status === "In Review") {
      colorClass = "bg-yellow-600/20 text-yellow-400";
      icon = Clock;
    }

    if (isHighPlag) {
      colorClass = "bg-red-900/50 text-red-300 border border-red-700";
      // FIXED: AlertTriangle is now imported
      icon = AlertTriangle;
    }

    const IconComponent = icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}
      >
        <IconComponent className="h-3 w-3 mr-1.5" />
        {status}
      </span>
    );
  };

  const studentAssignments = assignments.filter((a) => a.id.startsWith("S"));
  const overallScore =
    studentAssignments.reduce((sum, a) => sum + (a.score || 0), 0) /
    studentAssignments.length;
  const pendingCount = studentAssignments.filter(
    (a) => a.status === "In Review"
  ).length;

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="w-full h-[5vh]">
        <LoginHeader />
      </div>

      <h2 className="text-3xl font-bold text-white">Student Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Overall Grade Avg"
          value={overallScore ? `${overallScore.toFixed(1)}%` : "N/A"}
          icon={TrendingUp}
          colorClass="text-green-400"
        />
        <Card
          title="Assignments Pending"
          value={pendingCount}
          icon={Clock}
          colorClass="text-yellow-400"
        />
        <Card
          title="Sumitted Assignment"
          value={5}
          icon={Clock}
          colorClass="text-indigo-400"
        >
        </Card>
      </div>

      {/* Assignment List */}
      <h3 className="text-2xl font-semibold text-white pt-4 border-t border-gray-800">
        My Submissions ({studentAssignments.length})
      </h3>
      <div className="space-y-4">
        {studentAssignments.map((student) => {
          const isHighPlagiarism = student.plagiarismPercent > 15;

          return (
            <div
              key={student.id + student.assignmentId}
              className="flex justify-between items-center p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50 shadow-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-800/80"
            >
              {/* LEFT SIDE: Info Block */}
              <div className="flex items-center space-x-6 w-full">
                <div className="flex flex-col min-w-0">
                  <div className="text-base font-semibold text-white truncate">
                    {student.subject} ({student.assignmentId})
                  </div>
                  <div className="text-sm text-gray-400 truncate flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-indigo-400" />
                    <span>
                      Submitted:{" "}
                      <span className="text-gray-300 font-medium">
                        {student.submissionDate}
                      </span>{" "}
                      at{" "}
                      <span className="text-gray-300 font-medium">
                        {student.submissionTime}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Results Block */}
              <div className="flex items-center flex-shrink-0 ml-4 space-x-6">
                {/* Status & Marks */}
                <div className="flex flex-col items-end mr-4">
                  <div className="text-xl font-extrabold text-white">
                    {student.score !== null
                      ? `${student.score}/${student.maxScore}`
                      : "N/A"}
                  </div>
                  <StatusBadge
                    status={student.status}
                    isHighPlag={isHighPlagiarism}
                  />
                  {isHighPlagiarism && (
                    <span className="text-xs text-red-400 mt-1">
                      Plagiarism: {student.plagiarismPercent}%
                    </span>
                  )}
                </div>

                {/* More Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDetailsClick(student);
                  }}
                  className="flex items-center justify-center p-3 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
                  title="View detailed feedback"
                >
                  <FileText className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;
