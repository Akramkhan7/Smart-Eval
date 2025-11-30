import React, { useState, useEffect } from "react";
import {
  Users,
  User,
  Clock,
  Settings,
  Bell,
  Lock,
  RefreshCw,
  Layers,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
} from "lucide-react";
import Card from "../Shared/Card";
import { useAdmin } from "../../../context/AdminContext";

// --- Dummy Data ---
const adminStats = {
  totalStudents: 1500,
  totalTeachers: 45,
  pendingEnrollments: 8,
  systemStatus: "Operational",
};

const initialAnnouncements = [
  {
    id: 1,
    date: "2025-11-28",
    content:
      "System maintenance scheduled for Dec 5th, 1 AM - 3 AM. Submissions will be blocked.",
  },
  {
    id: 2,
    date: "2025-11-20",
    content:
      "New plagiarism detection model activated. Please review the updated policy.",
  },
];

const initialUsers = [
  {
    id: "T001",
    name: "Dr. Evelyn Sharp",
    role: "Teacher",
    email: "evelyn@uni.edu",
    status: "Active",
  },
  {
    id: "T002",
    name: "Ms. Chloe Bennet",
    role: "Teacher",
    email: "chloe@uni.edu",
    status: "Active",
  },
  {
    id: "S1001",
    name: "Alex Johnson",
    role: "Student",
    email: "alex.j@uni.edu",
    status: "Active",
  },
  {
    id: "S1002",
    name: "Maria Lopez",
    role: "Student",
    email: "maria.l@uni.edu",
    status: "Blocked",
  },
  {
    id: "S1003",
    name: "Chen Wei",
    role: "Student",
    email: "chen.w@uni.edu",
    status: "Active",
  },
];

// New data for subjectsData and allocations
const initialsubjectsData = [
  { id: "MATH-101", name: "Calculus I", code: "MATH101", credits: 3 },
  { id: "CS-205", name: "Data Structures", code: "CS205", credits: 4 },
  { id: "PHY-101", name: "Physics Fundamentals", code: "PHY101", credits: 3 },
  { id: "ENG-201", name: "Advanced Composition", code: "ENG201", credits: 3 },
];

const initialAllocations = [
  {
    id: "A1",
    teacherId: "T001",
    teacherName: "Dr. Evelyn Sharp",
    subjectId: "MATH-101",
    subjectName: "Calculus I",
  },
  {
    id: "A2",
    teacherId: "T001",
    teacherName: "Dr. Evelyn Sharp",
    subjectId: "CS-205",
    subjectName: "Data Structures",
  },
  {
    id: "A3",
    teacherId: "T002",
    teacherName: "Ms. Chloe Bennet",
    subjectId: "PHY-101",
    subjectName: "Physics Fundamentals",
  },
];

const AdminDashboard = () => {
  const [subjectsData, setsubjectsData] = useState([]);
  const [teacherData, setTeachersData] = useState([]);

  const { subjects, teachers } = useAdmin();

  useEffect(() => {
    if (subjects) {
      setsubjectsData(subjects);
    }
    if (teachers) {
      setTeachersData(teachers);
      console.log(teacherData);
    }
  }, [subjects, teachers]);

  const [announcementText, setAnnouncementText] = useState("");
  const [userToBlock, setUserToBlock] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  // New states for subject management

  const [allocations, setAllocations] = useState(initialAllocations);
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    credits: "",
  });
  const [newAllocation, setNewAllocation] = useState({
    teacherId: "",
    subjectId: "",
  });
  // useEffect(async () => {
  //   let res = await fetch("http://localhost:3000/admin/addAllocation", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newAllocation),
  //   });
  //   res = await res.json();
  // }, [newAllocation]);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'subjectsData', 'allocations'

  // Handle Posting Announcement
  const handleAnnouncement = () => {
    if (announcementText.trim()) {
      const newAnnouncement = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        content: announcementText,
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncementText("");
      alert("Announcement Posted Successfully!");
    }
  };

  // Handle Blocking/Unblocking Logic
  const handleAction = (actionType) => {
    if (!userToBlock) return;

    // In a real app, you would verify the ID exists here
    alert(
      `User ${userToBlock} has been ${
        actionType === "block" ? "BLOCKED" : "UNBLOCKED"
      } successfully.`
    );
    setUserToBlock("");
  };

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  // New functions for subject management
  const addSubject = async () => {
    if (newSubject.name && newSubject.code && newSubject.credits) {
      const subject = {
        name: newSubject.name,
        code: newSubject.code.toUpperCase(),
        credits: parseInt(newSubject.credits),
      };

      let res = await fetch("http://localhost:3000/admin/addSubject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subject),
      });
      res = await res.json();
      if (res.success) {
        setNewSubject({ name: "", code: "", credits: "" });
        alert("Subject added successfully!");
      } else {
        setNewSubject({ name: "", code: "", credits: "" });
        alert("Something Wrong!");
      }
    }
  };

  const deleteSubject = (id) => {
    // Remove allocations for this subject first
    const updatedAllocations = allocations.filter(
      (allocation) => allocation.subjectId !== id
    );
    setAllocations(updatedAllocations);

    // Remove subject
    setsubjectsData(subjectsData.filter((subject) => subject.id !== id));
    alert("Subject deleted successfully!");
  };

  const addAllocation = () => {
    if (newAllocation.teacherId && newAllocation.subjectId) {
      const teacher = users.find(
        (u) => u.id === newAllocation.teacherId && u.role === "Teacher"
      );
      const subject = subjectsData.find(
        (s) => s.id === newAllocation.subjectId
      );

      if (teacher && subject) {
        // Check if allocation already exists
        const exists = allocations.find(
          (a) =>
            a.teacherId === newAllocation.teacherId &&
            a.subjectId === newAllocation.subjectId
        );

        if (!exists) {
          const allocation = {
            id: `A${Date.now()}`,
            teacherId: newAllocation.teacherId,
            teacherName: teacher.name,
            subjectId: newAllocation.subjectId,
            subjectName: subject.name,
          };
          setAllocations([...allocations, allocation]);
          setNewAllocation({ teacherId: "", subjectId: "" });
          alert("Teacher allocated to subject successfully!");
        } else {
          alert("This teacher is already allocated to this subject!");
        }
      }
    }
  };

  const deleteAllocation = (id) => {
    setAllocations(allocations.filter((allocation) => allocation.id !== id));
    alert("Allocation removed successfully!");
  };

  // Get available teachers (only active teachers)
  const availableTeachers = users.filter(
    (user) => user.role === "Teacher" && user.status === "Active"
  );

  return (
    <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 space-y-8 text-white font-sans">
      {/* Header with Navigation Tabs */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Administrator Panel
            </h2>
            <p className="text-gray-400 mt-2">
              Manage users, system settings, and announcements
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-4 md:mt-0 bg-gray-900/50 p-1 rounded-lg border border-gray-800">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("subjectsData")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "subjectsData"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              subjectsData
            </button>
            <button
              onClick={() => setActiveTab("allocations")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "allocations"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Allocations
            </button>
          </div>
        </div>
      </div>

      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <>
          {/* System Stats Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              title="Total Students"
              value={adminStats.totalStudents}
              icon={Users}
              colorClass="text-indigo-400"
            />
            <Card
              title="Total Teachers"
              value={adminStats.totalTeachers}
              icon={User}
              colorClass="text-green-400"
            />
            <Card
              title="Pending Enrollments"
              value={adminStats.pendingEnrollments}
              icon={Clock}
              colorClass="text-yellow-400"
            />
            <Card
              title="System Status"
              value={adminStats.systemStatus}
              icon={Settings}
              colorClass="text-emerald-400"
            />
          </div>

          {/* Core Admin Actions Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* 1. Announcement Panel */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-4 backdrop-blur-sm">
              <h4 className="text-xl font-semibold text-white flex items-center">
                <Bell className="h-5 w-5 mr-2 text-yellow-400" /> Make Global
                Announcement
              </h4>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                rows="3"
                className="w-full rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500 transition-colors placeholder-gray-600"
                placeholder="Enter announcement text for all users..."
              />
              <button
                onClick={handleAnnouncement}
                className="w-full py-2.5 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors shadow-lg shadow-yellow-600/20"
              >
                Post Announcement
              </button>

              <div className="pt-4">
                <h5 className="text-sm font-medium text-gray-400 mb-3">
                  Recent Announcements:
                </h5>
                <ul className="space-y-2">
                  {announcements.map((a) => (
                    <li
                      key={a.id}
                      className="p-3 bg-gray-950/30 rounded-md border-l-2 border-yellow-500 text-sm text-gray-300"
                    >
                      <span className="font-bold text-white block text-xs mb-1">
                        [{a.date}]
                      </span>
                      {a.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. User Management Panel */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-6 backdrop-blur-sm">
              {/* Block/Unblock Section */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-red-400" /> Block/Unblock
                  User
                </h4>

                <input
                  type="text"
                  value={userToBlock}
                  onChange={(e) => setUserToBlock(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500 placeholder-gray-600"
                  placeholder="Enter User ID or Email to Block/Unblock"
                />

                {/* Two separate buttons layout */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAction("block")}
                    className="w-1/2 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center shadow-lg shadow-red-600/20"
                  >
                    <Lock className="h-4 w-4 mr-2" /> Block User
                  </button>
                  <button
                    onClick={() => handleAction("unblock")}
                    className="w-1/2 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center shadow-lg shadow-green-600/20"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Unblock User
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="pt-2">
                <h4 className="text-xl font-semibold text-white flex items-center mb-2">
                  <Layers className="h-5 w-5 mr-2 text-indigo-400" /> Quick
                  Stats
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-950/30 p-3 rounded-lg border border-gray-800">
                    <div className="text-gray-400">Total subjectsData</div>
                    <div className="text-white font-semibold">
                      {subjectsData.length}
                    </div>
                  </div>
                  <div className="bg-gray-950/30 p-3 rounded-lg border border-gray-800">
                    <div className="text-gray-400">Active Allocations</div>
                    <div className="text-white font-semibold">
                      {allocations.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registered Users Table */}
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-semibold text-white pt-4 border-t border-gray-800 mb-6">
              User Database ({users.length})
            </h3>
            <div className="overflow-hidden bg-gray-900/50 rounded-xl border border-gray-800 shadow-xl">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full ${
                            user.role === "Teacher"
                              ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`text-xs font-medium ${
                            user.status === "Active"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`${
                            user.status === "Active"
                              ? "text-red-400 hover:text-red-300"
                              : "text-green-400 hover:text-green-300"
                          } transition-colors text-xs font-bold uppercase tracking-wide`}
                        >
                          {user.status === "Active" ? "Block" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* subjectsData Tab Content */}
      {activeTab === "subjectsData" && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Add Subject Panel */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <h4 className="text-xl font-semibold text-white flex items-center mb-4">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-400" /> Add New
              Subject
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                value={newSubject.name}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, name: e.target.value })
                }
                className="rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500 placeholder-gray-600"
                placeholder="Subject Name"
              />
              <input
                type="text"
                value={newSubject.code}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, code: e.target.value })
                }
                className="rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500 placeholder-gray-600"
                placeholder="Subject Code"
              />
              <input
                type="number"
                value={newSubject.credits}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, credits: e.target.value })
                }
                className="rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500 placeholder-gray-600"
                placeholder="Credits"
                min="1"
                max="6"
              />
            </div>
            <button
              onClick={addSubject}
              className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-lg shadow-indigo-600/20"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Subject
            </button>
          </div>

          {/* subjectsData List */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 shadow-xl">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-2xl font-semibold text-white">
                All subjectsData ({subjectsData.length})
              </h3>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {subjectsData.map((subject) => (
                    <tr
                      key={subject.id}
                      className="hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {subject.courseCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {subject.credit} Credits
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        <button
                          onClick={() => deleteSubject(subject.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Allocations Tab Content */}
      {activeTab === "allocations" && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Add Allocation Panel */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <h4 className="text-xl font-semibold text-white flex items-center mb-4">
              <Layers className="h-5 w-5 mr-2 text-green-400" /> Allocate
              Teacher to Subject
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={newAllocation.teacherId}
                onChange={(e) =>
                  setNewAllocation({
                    ...newAllocation,
                    teacherId: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                <option value="" className="text-gray-700">
                  Select Teacher
                </option>
                {teacherData.map((teacher) => (
                  <option
                    key={teacher._id}
                    value={teacher.enrollmentNumber}
                    className="text-gray-700"
                  >
                    {teacher.name} ({teacher.enrollmentNumber})
                  </option>
                ))}
              </select>
              <select
                value={newAllocation.subjectId}
                onChange={(e) =>
                  setNewAllocation({
                    ...newAllocation,
                    subjectId: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                <option value="" className="text-gray-700">
                  Select Subject
                </option>
                {subjectsData.map((subject) => (
                  <option
                    key={subject._id}
                    value={subject._id}
                    className="text-gray-700"
                  >
                    {subject.name} ({subject.courseCode})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={addAllocation}
              className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center shadow-lg shadow-green-600/20"
            >
              <Layers className="h-4 w-4 mr-2" /> Allocate Teacher
            </button>
          </div>

          {/* Allocations List */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 shadow-xl">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-2xl font-semibold text-white">
                Teacher Allocations ({allocations.length})
              </h3>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {allocations.map((allocation) => (
                    <tr
                      key={allocation.id}
                      className="hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {allocation.teacherName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {allocation.teacherId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {allocation.subjectName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {allocation.subjectId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        <button
                          onClick={() => deleteAllocation(allocation.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
