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
  // 1. Get all data from Context (including students)
  const { subjects, teachers, students } = useAdmin();

  // 2. Local State
  const [subjectsData, setsubjectsData] = useState([]);
  const [teacherData, setTeachersData] = useState([]);
  const [allocations, setAllocations] = useState([]);
  
  // Dynamic User List (Replaces hardcoded data)
  const [users, setUsers] = useState([]); 
  
  // Dynamic Stats (Replaces static stats)
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    pendingEnrollments: 0, 
    systemStatus: "Operational",
  });

  const [announcementText, setAnnouncementText] = useState("");
  const [userToBlock, setUserToBlock] = useState("");
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    credits: "",
  });
  const [newAllocation, setNewAllocation] = useState({
    teacherId: "",
    subjectId: "",
  });

  const [activeTab, setActiveTab] = useState("overview");

  // 3. MAIN EFFECT: Process Data when Context loads
  useEffect(() => {
    // A. Handle Subjects & Allocations
    if (subjects) {
      setsubjectsData(subjects);
      const newAllocations = [];
      subjects.forEach((subject) => {
        if (subject.allotedTeacher) {
          // Handle both object and array cases for safety
          const teacherObj = Array.isArray(subject.allotedTeacher) 
            ? subject.allotedTeacher[0] 
            : subject.allotedTeacher;

          if (teacherObj) {
            newAllocations.push({
              id: subject._id,
              teacherId: teacherObj._id,
              teacherName: teacherObj.name,
              subjectId: subject.courseCode,
              subjectName: subject.name,
            });
          }
        }
      });
      setAllocations(newAllocations);
    }

    // B. Handle Teachers (for dropdown)
    if (teachers) {
      setTeachersData(teachers);
    }

    // C. Handle Overview Data (Merge Teachers + Students)
    if (teachers || students) {
      // Format Teachers
      const formattedTeachers = (teachers || []).map((t) => ({
        id: t._id, // Mongo ID
        displayId: t.enrollmentNumber, // What we show in table
        name: t.name,
        role: "Teacher",
        email: t.email || "N/A",
        status: "Active",
      }));

      // Format Students
      const formattedStudents = (students || []).map((s) => ({
        id: s._id,
        displayId: s.enrollmentNumber,
        name: s.name,
        role: "Student",
        email: s.email || "N/A",
        status: "Active",
      }));

      // Set Table Data
      setUsers([...formattedTeachers, ...formattedStudents]);

      // Set Stats
      setStats((prev) => ({
        ...prev,
        totalStudents: students?.length || 0,
        totalTeachers: teachers?.length || 0,
      }));
    }
  }, [subjects, teachers, students]);

  // --- HANDLERS ---

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

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  const addSubject = async () => {
    if (newSubject.name && newSubject.code && newSubject.credits) {
      const subjectPayload = {
        name: newSubject.name,
        code: newSubject.code.toUpperCase(),
        credits: parseInt(newSubject.credits),
      };

      try {
        let res = await fetch("http://localhost:3000/admin/addSubject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subjectPayload),
        });
        
        const data = await res.json();

        if (data.success) {
          const newSubjectForState = {
            id: data.data?._id || Date.now(),
            _id: data.data?._id || Date.now(), 
            name: newSubject.name,
            courseCode: newSubject.code.toUpperCase(),
            credit: parseInt(newSubject.credits)
          };
          setsubjectsData((prev) => [...prev, newSubjectForState]);
          setNewSubject({ name: "", code: "", credits: "" });
          alert("Subject added successfully!");
        } else {
          setNewSubject({ name: "", code: "", credits: "" });
          alert("Something Wrong!");
        }
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    } else {
      alert("Please fill in all subject fields.");
    }
  };

  const deleteSubject = (id) => {
    const updatedAllocations = allocations.filter((a) => a.subjectId !== id);
    setAllocations(updatedAllocations);
    setsubjectsData((prev) => prev.filter((s) => s.id !== id && s._id !== id));
    alert("Subject deleted successfully!");
  };

  const addAllocation = async () => {
    if (!newAllocation.teacherId || !newAllocation.subjectId) {
      alert("Please select both a Teacher and a Subject.");
      return;
    }

    const teacher = teacherData.find((t) => String(t._id) === String(newAllocation.teacherId));
    const subject = subjectsData.find((s) => String(s._id) === String(newAllocation.subjectId));

    if (teacher && subject) {
      try {
        let res = await fetch("http://localhost:3000/admin/allocation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacherId: newAllocation.teacherId,
            subjectId: newAllocation.subjectId,
          }),
        });

        const data = await res.json();

        if (data.success) {
          const newAllocationEntry = {
            id: Date.now(),
            teacherId: teacher._id,
            teacherName: teacher.name,
            subjectId: subject.courseCode, 
            subjectName: subject.name,
          };
          setAllocations((prev) => [...prev, newAllocationEntry]);
          setNewAllocation({ teacherId: "", subjectId: "" });
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Server error.");
      }
    } else {
      alert("Error: Selected teacher or subject not found.");
    }
  };

  const deleteAllocation = (id) => {
    setAllocations(allocations.filter((allocation) => allocation.id !== id));
    alert("Allocation removed successfully!");
  };
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
              Subjects
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
              value={stats.totalStudents} 
              icon={Users}
              colorClass="text-indigo-400"
            />
            <Card
              title="Total Teachers"
              value={stats.totalTeachers} 
              icon={User}
              colorClass="text-green-400"
            />
            <Card
              title="Pending Enrollments"
              value={stats.pendingEnrollments}
              icon={Clock}
              colorClass="text-yellow-400"
            />
            <Card
              title="System Status"
              value={stats.systemStatus}
              icon={Settings}
              colorClass="text-emerald-400"
            />
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
                    {/* EMAIL HEADER REMOVED */}
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
                        {user.displayId}
                      </td>
                      {/* EMAIL DATA ROW REMOVED */}
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

          {/* Core Admin Actions Grid */}
          <div className="max-w-7xl mx-auto gap-6 pt-4">
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
                    value={teacher._id}
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
                  {allocations &&
                    allocations.map((allocation) => (
                      <tr
                        key={allocation.id}
                        className="hover:bg-gray-800/40 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {allocation.teacherName}
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
