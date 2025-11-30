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
import { useAdmin } from "../context/AdminContext";

// Dummy Data for Demonstration
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

const teacherData = [
  {
    id: "T001",
    name: "Dr. Evelyn Sharp",
    email: "evelyn@uni.edu",
    subjects: ["Calculus I", "Data Structures"],
    sectionAssignments: ["MATH-101", "CS-205"],
  },
  {
    id: "T002",
    name: "Ms. Chloe Bennet",
    email: "chloe@uni.edu",
    subjects: ["Digital Marketing", "Physics Lab"],
    sectionAssignments: ["MKT-301", "PHY-102"],
  },
  {
    id: "T003",
    name: "Prof. Mark Webber",
    email: "mark@uni.edu",
    subjects: ["Econometrics"],
    sectionAssignments: ["ECO-401"],
  },
];

const adminData = {
  totalStudents: 1700,
  totalTeachers: 45,
  pendingEnrollments: 8,
  systemStatus: "Operational",
};

const announcements = [
  {
    id: 1,
    date: "2025-11-28",
    content:
      "System maintenance scheduled for Dec 5th, 1 AM - 3 AM. Submissions will be blocked.",
    userType: "All",
  },
  {
    id: 2,
    date: "2025-11-20",
    content:
      "New plagiarism detection model activated. Please review the updated policy.",
    userType: "Teacher, Admin",
  },
];

// --- Utility Components ---

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

// --- MODAL COMPONENTS ---

// 1. Details Modal (Reused from previous context, but adapted)
const DetailsModal = ({ student, onClose, userRole, onSubmitFeedback }) => {
  if (!student) return null;

  const [teacherNotes, setTeacherNotes] = useState("");
  const [finalScore, setFinalScore] = useState(student.score || "");
  const [statusOverride, setStatusOverride] = useState(
    student.status || "In Review"
  );
  const isPass = student.score >= 60; // Simple pass logic for demo
  const primaryBg = isPass ? "bg-green-600" : "bg-red-600";

  const handleFinalize = () => {
    // In a real app, this would send data to Firestore
    const finalReport = {
      score: finalScore,
      status: statusOverride,
      reviewMessage: teacherNotes,
      // AI data (plagiarism) is already available in student object
    };
    onSubmitFeedback(student.id, finalReport);
    onClose();
  };

  const aiReport = {
    plagiarism: student.plagiarismPercent,
    similarityToOthers:
      student.plagiarismPercent > 10
        ? "High similarity detected with 3 other submissions (needs review)."
        : "Low similarity detected.",
    aiScoreSuggestion: student.score || 80, // Example AI score suggestion
    aiDeductions:
      student.plagiarismPercent > 10
        ? ["Potential plagiarism (-20 marks)", "Lack of original analysis"]
        : ["Minor grammatical issues"],
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl transform transition-all duration-300 scale-100 border border-gray-700">
        {/* Header */}
        <div
          className={`p-5 rounded-t-xl flex justify-between items-center ${primaryBg}`}
        >
          <h3 className="text-xl font-bold text-white flex items-center">
            <Code className="h-6 w-6 mr-3" />
            Assignment Review: {student.assignmentId} - {student.subject}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Submission Info & AI Report (Student/Teacher View) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-lg font-semibold text-white border-l-4 border-indigo-500 pl-3">
              Submission Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-800 p-4 rounded-lg">
              <InfoItem label="Student" value={student.name} icon={User} />
              <InfoItem
                label="Date/Time"
                value={`${student.submissionDate} @ ${student.submissionTime}`}
                icon={Clock}
              />
              <InfoItem
                label="Current Status"
                value={student.status}
                icon={List}
                color={
                  student.status === "Completed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              />
              {/* FIXED: Star is now imported */}
              <InfoItem
                label="Max Marks"
                value={student.maxScore}
                icon={Star}
              />
            </div>

            {/* AI Report */}
            <section className="mt-6">
              <h4 className="text-lg font-semibold text-white border-l-4 border-yellow-500 pl-3 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                AI Assessment Report
              </h4>
              <div className="bg-gray-800 p-4 rounded-lg space-y-3 mt-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plagiarism Score:</span>
                  <span
                    className={`font-bold ${
                      aiReport.plagiarism > 15
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {aiReport.plagiarism}%
                  </span>
                </div>
                <div className="text-gray-400">
                  <span className="font-semibold text-white">
                    Originality Check:
                  </span>{" "}
                  {aiReport.similarityToOthers}
                </div>
                <div className="text-gray-400">
                  <span className="font-semibold text-white">
                    Suggested Deductions:
                  </span>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                    {aiReport.aiDeductions.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Teacher Action Panel */}
          {(userRole === "Teacher" || userRole === "Admin") && (
            <div className="lg:col-span-1 space-y-6 bg-gray-800 p-4 rounded-xl border border-gray-700 h-full">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Final Review & Grading
              </h4>

              {/* Final Score Input */}
              <div>
                <label
                  htmlFor="finalScore"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Final Score ({student.maxScore} Max)
                </label>
                <input
                  id="finalScore"
                  type="number"
                  max={student.maxScore}
                  min="0"
                  value={finalScore}
                  onChange={(e) => setFinalScore(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white outline-none focus:border-indigo-500"
                  placeholder="Enter final score"
                />
              </div>

              {/* Status Override */}
              <div>
                <label
                  htmlFor="statusOverride"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Status Override (e.g., Fail, Re-submission)
                </label>
                <select
                  id="statusOverride"
                  value={statusOverride}
                  onChange={(e) => setStatusOverride(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white outline-none focus:border-indigo-500"
                >
                  {[
                    "Completed",
                    "In Review",
                    "Fail",
                    "Pass",
                    "Requires Resubmission",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Message/Deductions */}
              <div>
                <label
                  htmlFor="teacherNotes"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Teacher Review Message (for student)
                </label>
                <textarea
                  id="teacherNotes"
                  value={teacherNotes}
                  onChange={(e) => setTeacherNotes(e.target.value)}
                  rows="4"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white outline-none focus:border-indigo-500"
                  placeholder="Enter specific feedback, mark deductions, and improvement tips."
                />
              </div>

              <button
                onClick={handleFinalize}
                className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <Shield className="h-5 w-5 mr-2" />
                Finalize Report & Approve
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-400 font-semibold rounded-lg hover:text-white transition-colors"
          >
            {userRole === "Student" ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, icon: Icon, color = "text-gray-400" }) => (
  <div className="flex items-center space-x-2">
    <Icon className={`h-4 w-4 ${color}`} />
    <div className="flex flex-col text-sm">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  </div>
);

// --- DASHBOARDS ---

// 2. Student Dashboard
const StudentDashboard = ({ assignments, onDetailsClick }) => {
  const studentAssignments = assignments.filter((a) => a.id.startsWith("S")); // Filter for student view
  const overallScore =
    studentAssignments.reduce((sum, a) => sum + (a.score || 0), 0) /
    studentAssignments.length;
  const pendingCount = studentAssignments.filter(
    (a) => a.status === "In Review"
  ).length;

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
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
          title="Upload New Assignment"
          icon={Upload}
          colorClass="text-indigo-400"
        >
          <button className="mt-3 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <Upload className="h-4 w-4 mr-2" /> Select File
          </button>
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

// 3. Teacher Dashboard
const TeacherDashboard = ({
  assignments,
  teachers,
  onDetailsClick,
  onSubmitFeedback,
}) => {
  const currentTeacher = teachers[0]; // Assume first teacher is logged in
  const teacherAssignments = assignments.filter(
    (a) => a.teacherId === currentTeacher.id
  );
  const pendingCount = teacherAssignments.filter(
    (a) => a.status === "In Review"
  ).length;
  const completedCount = teacherAssignments.filter(
    (a) => a.status === "Completed"
  ).length;

  // Sort assignments: Pending first, then by date
  const sortedAssignments = teacherAssignments.sort((a, b) => {
    if (a.status === "In Review" && b.status !== "In Review") return -1;
    if (a.status !== "In Review" && b.status === "In Review") return 1;
    return new Date(b.submissionDate) - new Date(a.submissionDate);
  });

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-white">
        Teacher Dashboard: {currentTeacher.name}
      </h2>
      <p className="text-gray-400">
        Assigned Sections: {currentTeacher.sectionAssignments.join(", ")}
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Pending Reviews"
          value={pendingCount}
          icon={Clock}
          colorClass="text-red-400"
        />
        <Card
          title="Completed Reviews"
          value={completedCount}
          icon={CheckCircle}
          colorClass="text-green-400"
        />
        <Card
          title="Make Announcement"
          icon={Bell}
          colorClass="text-yellow-400"
        >
          <button className="mt-3 w-full py-2 bg-yellow-600/20 text-yellow-400 font-semibold rounded-lg border border-yellow-600 hover:bg-yellow-600/30 transition-colors flex items-center justify-center">
            <Bell className="h-4 w-4 mr-2" /> New Message
          </button>
        </Card>
      </div>

      {/* Assignments to Review List */}
      <h3 className="text-2xl font-semibold text-white pt-4 border-t border-gray-800">
        Assignments to Review ({sortedAssignments.length})
      </h3>
      <div className="space-y-4">
        {sortedAssignments.map((student) => {
          const isPending = student.status === "In Review";
          const isHighPlagiarism = student.plagiarismPercent > 15;

          return (
            <div
              key={student.id + student.assignmentId}
              className={`flex justify-between items-center p-4 sm:p-6 rounded-xl border ${
                isPending
                  ? "border-yellow-600/50 bg-yellow-900/10"
                  : "border-gray-800 bg-gray-900/50"
              } shadow-lg transition-all duration-200 ease-in-out hover:bg-gray-800/80`}
            >
              {/* LEFT SIDE: Student & Assignment Info */}
              <div className="flex items-center space-x-4 w-full">
                <div className="flex flex-col min-w-0">
                  <div className="text-base font-semibold text-white truncate">
                    {student.subject} ({student.assignmentId})
                  </div>
                  <div className="text-sm text-gray-400 flex items-center space-x-2 mt-0.5">
                    <User className="h-3 w-3 text-indigo-400" />
                    <span>
                      Student:{" "}
                      <span className="text-gray-300 font-medium">
                        {student.name}
                      </span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      Submitted:{" "}
                      <span className="text-gray-400 font-medium">
                        {student.submissionDate} @ {student.submissionTime}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Status, Plagiarism, Action */}
              <div className="flex items-center flex-shrink-0 ml-4 space-x-6">
                {/* Plagiarism & Status */}
                <div className="flex flex-col items-end mr-4">
                  <StatusBadge
                    status={student.status}
                    isHighPlag={isHighPlagiarism}
                  />
                  <span
                    className={`text-xs mt-1 ${
                      isHighPlagiarism ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    Plag: {student.plagiarismPercent}%
                  </span>
                </div>

                {/* Review Button */}
                <button
                  onClick={() => onDetailsClick(student)}
                  className={`flex items-center justify-center p-3 rounded-full ${
                    isPending ? "bg-red-600" : "bg-indigo-600"
                  } text-white shadow-md hover:bg-indigo-700 transition-colors`}
                  title={isPending ? "Grade Assignment" : "View Final Report"}
                >
                  {isPending ? (
                    <List className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 4. Administrator Dashboard
const AdminDashboard = ({ data, teachers, students, onDetailsClick }) => {
  const [announcementText, setAnnouncementText] = useState("");
  const [userToBlock, setUserToBlock] = useState("");

  const handleAnnouncement = () => {
    if (announcementText) {
      alert(`Admin Announcement: "${announcementText}" posted to all users.`);
      setAnnouncementText("");
    }
  };

  const handleBlockUser = () => {
    if (userToBlock) {
      alert(`User ID/Email: ${userToBlock} has been blocked (simulated).`);
      setUserToBlock("");
    }
  };

  const teacherUserList = teachers.map((t) => ({
    id: t.id,
    name: t.name,
    role: "Teacher",
    email: t.email,
  }));
  const studentUserList = students.map((s) => ({
    id: s.id,
    name: s.name,
    role: "Student",
    email: `${s.name.toLowerCase().replace(" ", ".")}@uni.edu`,
  }));
  const allUsers = [...teacherUserList, ...studentUserList];

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-white">Administrator Panel</h2>

      {/* System Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Total Students"
          value={data.totalStudents}
          icon={Users}
          colorClass="text-indigo-400"
        />
        <Card
          title="Total Teachers"
          value={data.totalTeachers}
          icon={User}
          colorClass="text-green-400"
        />
        <Card
          title="Pending Enrollments"
          value={data.pendingEnrollments}
          icon={Clock}
          colorClass="text-yellow-400"
        />
        <Card
          title="System Status"
          value={data.systemStatus}
          icon={Settings}
          colorClass="text-emerald-400"
        />
      </div>

      {/* Core Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Announcement Panel */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
          <h4 className="text-xl font-semibold text-white flex items-center">
            <Bell className="h-5 w-5 mr-2 text-yellow-400" /> Make Global
            Announcement
          </h4>
          <textarea
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            rows="3"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-indigo-500"
            placeholder="Enter announcement text for all users..."
          />
          <button
            onClick={handleAnnouncement}
            className="w-full py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Post Announcement
          </button>

          <h5 className="text-sm font-medium text-gray-400 pt-2">
            Recent Announcements:
          </h5>
          <ul className="text-xs space-y-1 text-gray-400">
            {announcements.map((a) => (
              <li
                key={a.id}
                className="p-2 bg-gray-800 rounded-md border-l-4 border-yellow-500/50"
              >
                <span className="font-medium text-white">[{a.date}]</span>{" "}
                {a.content}
              </li>
            ))}
          </ul>
        </div>

        {/* User Management Panel */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
          <h4 className="text-xl font-semibold text-white flex items-center">
            <Lock className="h-5 w-5 mr-2 text-red-400" /> Block/Unblock User
          </h4>
          <input
            type="text"
            value={userToBlock}
            onChange={(e) => setUserToBlock(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-indigo-500"
            placeholder="Enter User ID or Email to Block/Unblock"
          />
          <div className="flex gap-4">
            <button
              onClick={handleBlockUser}
              className="w-1/2 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Lock className="h-4 w-4 mr-2" /> Block User
            </button>
            <button
              onClick={() => alert(`Unblocking user ${userToBlock}`)}
              className="w-1/2 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Unblock User
            </button>
          </div>

          <h4 className="text-xl font-semibold text-white pt-4 flex items-center">
            <Layers className="h-5 w-5 mr-2 text-indigo-400" /> Teacher
            Assignment Allocation
          </h4>
          <p className="text-sm text-gray-400">
            Current allocation: T001 gets MATH-101 & CS-205. This can be managed
            here.
          </p>
        </div>
      </div>

      {/* Registered Users List */}
      <h3 className="text-2xl font-semibold text-white pt-4 border-t border-gray-800">
        Registered Users ({allUsers.length})
      </h3>
      <div className="overflow-x-auto bg-gray-900/50 rounded-xl border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {allUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-800/80 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "Teacher"
                        ? "bg-indigo-600/20 text-indigo-400"
                        : "bg-green-600/20 text-green-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setUserToBlock(user.id)}
                    className="text-red-500 hover:text-red-400 transition-colors text-xs font-semibold"
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Application Structure ---

const Navbar = ({ currentUser, onRoleChange }) => {
  const roles = ["Student", "Teacher", "Admin"];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-semibold text-white">AcademiHub</span>
          </div>

          {/* Role Switcher (Simulated Login) */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-400 hidden sm:block">
              Current Role:
            </span>
            <select
              value={currentUser}
              onChange={(e) => onRoleChange(e.target.value)}
              className="rounded-lg border border-gray-700 bg-gray-900/50 py-2 pl-3 pr-8 text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-indigo-500"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role} View
                </option>
              ))}
            </select>
            <button className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [currentRole, setCurrentRole] = useState("Student");
  const [assignments, setAssignments] = useState(studentData);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Function to handle the teacher submitting final grades/feedback (simulated)
  const handleSubmitFeedback = useCallback((assignmentId, feedback) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              score: feedback.score,
              status: feedback.status,
              // In a real app, we'd merge feedback.reviewMessage into a 'details' object
            }
          : a
      )
    );
    alert(
      `Feedback submitted and assignment ${assignmentId} finalized! Score: ${feedback.score}`
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <Navbar currentUser={currentRole} onRoleChange={setCurrentRole} />
      {renderDashboard()}

      {/* The single modal used for detailed views across all roles */}
      <DetailsModal
        student={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        userRole={currentRole}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
};

export default App;
