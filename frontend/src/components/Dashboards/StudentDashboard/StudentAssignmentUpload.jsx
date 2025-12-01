import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Calendar,
  Clock,
  CheckCircle,
  Upload,
  FileText,
  AlertCircle,
  X,
  Eye,
  Download,
} from "lucide-react";
import { useUser } from "../../../context/UserContext";

const StudentAssignmentUpload = () => {
  // Get params from URL
  const { subjectId, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { subjects } = useUser();
  console.log("Data at using ", subjects);

  // State
  const [status, setStatus] = useState("Pending");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submittedFileName, setSubmittedFileName] = useState(null);
  const [submissionTime, setSubmissionTime] = useState(null);

  useEffect(() => {
    if (subjects && subjectId && id) {
      const foundSubject = subjects.find((s) => s._id === subjectId);
      if (foundSubject && foundSubject.assignments) {
        console.log("founded1");
        const foundAssignment = foundSubject.assignments.find(
          (assignment) => assignment._id === id
        );
        if (foundAssignment) {
          console.log("founded2", foundAssignment);
          setData(foundAssignment);
          // Set initial status from assignment data
          setStatus(foundAssignment.status || "Pending");
          setSubmittedFileName(foundAssignment.submittedFile || null);
          setSubmissionTime(foundAssignment.submissionDate || null);
        }
      }
    }
  }, [subjects, subjectId, id]);

  useEffect(() => {
    console.log("data is ", data);
  }, [data]);

  // Handle File Selection
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Upload to backend
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("assignmentId", id);
    formData.append("file", file);

    try {
      // Show progress animation
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 90) {
          clearInterval(interval);
        }
      }, 150);

      const response = await fetch(
        "http://localhost:3000/student/assignment/upload",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      // Complete the progress
      clearInterval(interval);
      setUploadProgress(100);

      if (response.ok) {
        setStatus("Submitted");
        setSubmittedFileName(file.name);
        setSubmissionTime(new Date().toLocaleDateString());
      } else {
        alert("Upload failed: " + (responseData.message || "Unknown error"));
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  // Handle Viewing the File
  const handleViewFile = () => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } else {
      alert(
        `Opening ${submittedFileName}... (Backend required for real download)`
      );
    }
  };

  // Loading state
  if (!data) {
    return (
      <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 font-sans text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading assignment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 font-sans text-white">
      {/* 1. Back Button Row */}
      <div className="max-w-5xl mx-auto mb-6 mt-24">
        <button
          onClick={() => navigate(`/student/subject/${subjectId}`)}
          className="flex items-center text-gray-300 hover:text-white transition-all group px-4 py-2 rounded-lg hover:bg-gray-800 border border-transparent hover:border-gray-700 w-fit"
        >
          <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Assignments
        </button>
      </div>

      {/* 2. Header Content */}
      <div className="max-w-5xl mx-auto mb-8 border-b border-gray-800 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Assignment: {data?.name || "Assignment"}
            </h1>
            <p className="text-indigo-400 font-medium">
              {data?.subject?.name || "Subject"}
            </p>
          </div>

          {/* Status Badge */}
          <div
            className={`mt-4 md:mt-0 px-4 py-2 rounded-full text-sm font-bold border flex items-center ${
              status === "Submitted" || status === "Completed"
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
            }`}
          >
            {status === "Submitted" || status === "Completed" ? (
              <CheckCircle className="h-4 w-4 mr-2" />
            ) : (
              <Clock className="h-4 w-4 mr-2" />
            )}
            {status === "Submitted" || status === "Completed"
              ? "Submitted"
              : "Pending Submission"}
          </div>
        </div>
      </div>

      {/* 3. Info Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1a1f2e] p-4 rounded-xl border border-gray-800 flex items-center">
          <div className="p-3 bg-indigo-500/10 rounded-lg mr-4">
            <Calendar className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Unlocked On
            </p>
            <p className="font-semibold">
              {new Date(data.unlockedDate).toLocaleDateString() || "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-[#1a1f2e] p-4 rounded-xl border border-gray-800 flex items-center">
          <div className="p-3 bg-red-500/10 rounded-lg mr-4">
            <Clock className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Due Date
            </p>
            <p className="font-semibold">
              {new Date(data.dueDate).toLocaleDateString() || "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-[#1a1f2e] p-4 rounded-xl border border-gray-800 flex items-center">
          <div className="p-3 bg-green-500/10 rounded-lg mr-4">
            <FileText className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Max Marks
            </p>
            <p className="font-semibold">{data.maxScore || 100}</p>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Instructions & Upload */}
        <div className="lg:col-span-2 space-y-6">
          {/* Instructions */}
          <div className="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Instructions</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {data.instructions ||
                "Please upload your solution in PDF format. Ensure all requirements are met clearly."}
            </p>
          </div>

          {/* --- UPLOAD SECTION (Visible Only if Pending) --- */}
          {status !== "Submitted" && status !== "Completed" && (
            <div className="bg-[#1a1f2e] p-8 rounded-2xl border-2 border-dashed border-gray-700 hover:border-indigo-500/50 transition-colors text-center group relative">
              {!file ? (
                <>
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition-colors">
                    <Upload className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Upload your work
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Drag & drop your PDF here or click to browse
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="text-left">
                  <div className="flex items-center justify-between bg-gray-900 p-4 rounded-xl border border-gray-700 mb-4">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-red-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  {uploadProgress > 0 && (
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}

                  <button
                    onClick={handleUpload}
                    disabled={uploadProgress > 0}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {uploadProgress > 0
                      ? uploadProgress === 100
                        ? "Uploaded!"
                        : "Uploading..."
                      : "Submit Assignment"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* --- SUBMITTED VIEW (Visible if Submitted) --- */}
          {(status === "Submitted" || status === "Completed") && (
            <div className="bg-green-500/5 p-6 rounded-2xl border border-green-500/20 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Assignment Submitted!
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Your work has been uploaded successfully.
              </p>

              {/* File Details Card */}
              <div className="bg-[#1a1f2e] p-4 rounded-xl border border-gray-700 flex items-center justify-between text-left mb-4 max-w-lg mx-auto shadow-lg">
                <div className="flex items-center overflow-hidden">
                  <div className="p-3 bg-indigo-500/10 rounded-lg mr-3 shrink-0">
                    <FileText className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate max-w-[200px]">
                      {submittedFileName || "submission.pdf"}
                    </p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                </div>
                <button
                  onClick={handleViewFile}
                  className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors border border-gray-600 ml-4 shrink-0"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </button>
              </div>

              <div className="inline-flex items-center px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 text-sm text-gray-400">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                Submitted on:{" "}
                <span className="text-white ml-2">
                  {submissionTime || "N/A"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Evaluation Status */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 h-fit sticky top-32">
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-4">
              Evaluation
            </h4>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Current Status
                </p>
                {status === "Submitted" || status === "Completed" ? (
                  data.score ? (
                    <span className="text-green-400 font-medium flex items-center bg-green-500/10 px-3 py-1 rounded w-fit">
                      <CheckCircle className="h-4 w-4 mr-2" /> Graded
                    </span>
                  ) : (
                    <span className="text-yellow-400 font-medium flex items-center bg-yellow-500/10 px-3 py-1 rounded w-fit">
                      <Clock className="h-4 w-4 mr-2" /> Waiting for Evaluation
                    </span>
                  )
                ) : (
                  <span className="text-gray-500 font-medium flex items-center bg-gray-800 px-3 py-1 rounded w-fit">
                    <AlertCircle className="h-4 w-4 mr-2" /> Not Submitted
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Score
                </p>
                <p className="text-3xl font-bold text-white tracking-tight">
                  {data.score ? (
                    <span className="text-green-400">
                      {data.score}{" "}
                      <span className="text-lg text-gray-500">
                        / {data.maxScore || 100}
                      </span>
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      -- / {data.maxScore || 100}
                    </span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Teacher Feedback
                </p>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 text-sm text-gray-400 italic min-h-[100px]">
                  {data.feedback
                    ? `"${data.feedback}"`
                    : "No feedback available yet."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentUpload;
