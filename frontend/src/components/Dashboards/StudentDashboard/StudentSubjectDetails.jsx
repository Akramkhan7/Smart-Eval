import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

import {
  ChevronLeft,
  Lock,
  Unlock,
  Upload,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";

const StudentSubjectDetails = () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [subject, setSubject] = useState(null);
  const { subjects } = useUser();

  useEffect(() => {
    if (subjects) {
      const found = subjects.find((s) => s._id === id);
      if (found) {
        console.log("found");
        setSubject(found);
        setAssignments(found.assignments || []);
      }
    }
  }, [subjects, id]);

 
  const navigate = useNavigate();

  const handleAssignmentClick = (assignmentId) => {
    navigate(`/student/subject/${id}/assignment/${assignmentId}`);
  };

  return (
    <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 pt-32 text-white font-sans">
      {/* Back Button Row */}
      <div className="max-w-5xl mx-auto mb-6 relative z-50">
        <button
          onClick={() => navigate("/student/dashboard")}
          className="flex items-center text-gray-300 hover:text-white transition-all group cursor-pointer bg-gray-900/80 border border-gray-700 hover:border-gray-500 py-3 px-5 rounded-xl shadow-lg backdrop-blur-md w-fit"
        >
          <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Subjects</span>
        </button>
      </div>
      {/* Header Content */}
      <div className="max-w-5xl mx-auto mb-8 border-b border-gray-800 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {(subject && subject.name) || "Not Added Yet"}
            </h1>
            <p className="text-indigo-400 font-medium flex items-center">
              Instructor:{" "}
              {(subject &&
                subject.allotedTeacher &&
                subject.allotedTeacher.name) ||
                "Not Added Yet"}
              <span className="mx-2 text-gray-600">|</span>
              <span className="text-gray-400">
                {(subject && subject.courseCode) || "Not Added Yet"}
              </span>
            </p>
          </div>
          {/* Progress Bar */}
          <div className="text-right mt-4 md:mt-0">
            <div className="text-sm text-gray-400 mb-1">Course Progress</div>
            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Assignments List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {assignments &&
          assignments.map((assignment,number) => (
            <div
              key={assignment._id}
              className={`p-6 rounded-xl border transition-all duration-300 ${
                assignment.locked
                  ? "bg-gray-900/30 border-gray-800 opacity-60"
                  : "bg-[#1a1f2e] border-gray-700 shadow-lg"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div
                    className={`p-3 rounded-full ${
                      assignment.locked
                        ? "bg-gray-800 text-gray-500"
                        : "bg-indigo-500/10 text-indigo-400"
                    }`}
                  >
                    {assignment.locked ? (
                      <Lock className="h-6 w-6" />
                    ) : (
                      <Unlock className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        assignment.locked ? "text-gray-500" : "text-white"
                      }`}
                    >
                     Assignment {number+1} : {assignment.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Due: {assignment.dueDate}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="w-full md:w-auto">
                  {assignment.locked ? (
                    <button
                      disabled
                      className="w-full md:w-auto px-6 py-2 bg-gray-800 text-gray-500 font-medium rounded-lg cursor-not-allowed border border-gray-700"
                    >
                      Locked
                    </button>
                  ) : assignment.status === "Completed" ? (
                    <button
                      onClick={() => handleAssignmentClick(assignment._id)}
                      className="w-full md:w-auto flex items-center justify-center px-6 py-2 bg-green-500/10 text-green-400 border border-green-500/20 font-medium rounded-lg hover:bg-green-500/20 transition-all cursor-pointer"
                    >
                      <Eye className="h-4 w-4 mr-2" /> View Submission
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAssignmentClick(assignment._id)}
                      className="w-full md:w-auto flex items-center justify-center px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-600/20"
                    >
                      <Upload className="h-4 w-4 mr-2" /> Upload Work
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentSubjectDetails;
