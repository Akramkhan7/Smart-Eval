import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, ArrowRight, GraduationCap } from "lucide-react";
import { useUser } from "../../../context/UserContext";
import { useContext } from "react";
import { useState, useEffect } from "react";

// --- Dummy Data: Enrolled Subjects ---

// color: "hover:border-indigo-500/50",
// iconColor: "text-indigo-400",

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { subjects, setSubjects } = useUser();
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  useEffect(() => {
    if (subjects) {
      setEnrolledSubjects(subjects);
      console.log("user panel ", subjects);
    }
  }, [subjects]);

  const handleSubjectClick = (subjectId) => {
    // Navigates to the details page (Make sure StudentSubjectDetails route exists)
    navigate(`/student/subject/${subjectId}`);
  };

  return (
    <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 text-white font-sans">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
            <GraduationCap className="h-8 w-8 mr-3 text-indigo-500" />
            My Classroom
          </h1>
          <p className="text-gray-400">
            Select a subject to view assignments and submit work.
          </p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            Current Session
          </p>
          <p className="text-xl font-bold text-white"> 2025-26</p>
        </div>
      </div>

      {/* Subject Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledSubjects.map((subject) => (
          <div
            key={subject._id}
            onClick={() => handleSubjectClick(subject._id)}
            className={`bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 ${subject.color} hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
          >
            {/* Decorative Background Blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Top Row: Icon & Code */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-gray-700 transition-colors">
                  <BookOpen className={`h-6 w-6 ${subject.iconColor}`} />
                </div>
                <span className="px-3 py-1 bg-gray-900 rounded-full text-xs font-semibold text-gray-400 border border-gray-800">
                  {subject.courseCode}
                </span>
              </div>

              {/* Subject Name */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors truncate">
                {subject.name}
              </h3>

              {/* Teacher Name */}
              <div className="flex items-center text-sm text-gray-400 mb-6">
                <User className="h-3 w-3 mr-2" />
                {subject.allotedTeacher
                  ? subject.allotedTeacher.name
                  : "Not Alloted Yet"}
              </div>

              {/* Footer: Stats & Arrow */}
              <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    Status
                  </span>
                  <span
                    className={
                      subject.pending > 0
                        ? "text-yellow-400 font-medium flex items-center"
                        : "text-green-400 font-medium flex items-center"
                    }
                  >
                    {subject.pending > 0 ? (
                      <>{subject.pending} Assignments Pending</>
                    ) : (
                      <>All Caught Up</>
                    )}
                  </span>
                </div>
                <div className="bg-gray-900 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-gray-800 group-hover:border-indigo-500">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
