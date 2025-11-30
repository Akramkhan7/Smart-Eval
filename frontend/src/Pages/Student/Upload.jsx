import React, { useState, useRef } from "react";
import { useToast } from "../../context/ToastContext";
import { useContext } from "react";

const AssignmentUploadForm = () => {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    file: null,
    assignment: "",
    subject: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Sample data - replace with your actual data
  const assignments = [
    { id: "1", name: "Assignment 1: Introduction to React" },
    { id: "2", name: "Assignment 2: State Management" },
    { id: "3", name: "Assignment 3: Component Lifecycle" },
    { id: "4", name: "Assignment 4: Hooks and Effects" },
  ];

  const subjects = [
    { id: "cs101", name: "Computer Science Fundamentals" },
    { id: "webdev", name: "Web Development" },
    { id: "reactjs", name: "React.js Advanced" },
    { id: "nodejs", name: "Node.js Backend" },
  ];

const handleUpload = async (e) => {
  e.preventDefault();

  const formData = new formData();
    formData.append("title",title);
    formData.append('description',description);
    formData.append('uploadedBy',uploadedBy);
    formData.append('file',file);


const response  = await fetch("http://localhost:3000/api/assignments/upload",{
  method : 'POST',
  body : formData,
});

const data  = await response.json();

if(response.ok){
  alert("Uploaded!");
  onUploadSuccess();
  setTitle("");
  setDescription("");
  setFile(null);
}else {
    alert("Something went wrong.");
  }
};


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]); // Only take the first file
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]); // Only take the first file
    }
  };

  const handleFile = (file) => {
    const newFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    };
    setFormData((prev) => ({
      ...prev,
      file: newFile,
    }));
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission to backend
    console.log("Form submitted:", formData);
    const data = new FormData();

    data.append("subject", formData.subject);
    data.append("assignment", formData.assignment);
    data.append("file", formData.file.file);
    console.log(data);
    setFormData({
      file: null,
      assignment: "",
      subject: "",
    });

    let res = await fetch("http://localhost:3000/student/assignment/upload", {
      method: "POST",
      credentials: "include",
      body: data,
    });
    res = await res.json();
    console.log(res);
    console.log("NOthing app");
    if (res.messages?.length > 0) {
      const msg = res.messages[0];
      res.success ? showToast(msg, "success") : showToast(msg, "error");
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type.startsWith("video/")) return "🎥";
    if (type.startsWith("audio/")) return "🎵";
    return "📄";
  };

  return (
    <div className="min-h-screen b  py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            Submit Assignment
          </h1>
          <p className="text-purple-200">
            Complete the form to submit your work
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step <= currentStep
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-gray-500 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 ${
                      step < currentStep ? "bg-blue-500" : "bg-gray-500"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8"
          encType="multipart/form-data"
        >
          {/* Step 1: File Upload */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Upload Your File
              </h2>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? "border-blue-400 bg-blue-500/20"
                    : "border-white/30 hover:border-blue-400 hover:bg-white/5"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="mb-4">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <svg
                      className="w-10 h-10 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-white mb-2">
                    Drag and Drop file to upload
                  </p>
                  <p className="text-purple-200 mb-4">or</p>
                </div>

                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Browse File
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileInput}
                  accept="pdf"
                />
              </div>

              {/* File Info */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-purple-200 text-center">
                  Supported: mps/mps/rmov/webm/wav... | Video &lt; 4G, Audio
                  &lt; 500M
                </p>
              </div>

              {/* Uploaded File */}
              {formData.file && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Selected File
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {getFileIcon(formData.file.type)}
                        </span>
                        <div>
                          <p className="font-medium text-white truncate max-w-xs">
                            {formData.file.name}
                          </p>
                          <p className="text-sm text-purple-200">
                            {formatFileSize(formData.file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-300 transition-colors p-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.file}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Next: Assignment Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Assignment & Subject Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Assignment Details
              </h2>

              {/* Subject Selection */}
              <div className="space-y-4">
                <label className="block text-white font-medium">
                  Select Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" className="text-gray-700">
                    Choose a subject
                  </option>
                  {subjects.map((subject) => (
                    <option
                      key={subject.id}
                      value={subject.id}
                      className="text-gray-700"
                    >
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Assignment Selection */}
              <div className="space-y-4">
                <label className="block text-white font-medium">
                  Select Assignment
                </label>
                <select
                  value={formData.assignment}
                  onChange={(e) =>
                    handleInputChange("assignment", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" className="text-gray-700">
                    Choose an assignment
                  </option>
                  {assignments.map((assignment) => (
                    <option
                      key={assignment.id}
                      value={assignment.id}
                      className="text-gray-700"
                    >
                      {assignment.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 border border-white/20"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.assignment || !formData.subject}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Next: Review & Submit
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Review & Submit
              </h2>

              <div className="space-y-6">
                {/* File Summary */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    File to Upload
                  </h3>
                  <div className="space-y-2">
                    {formData.file && (
                      <div className="flex items-center justify-between text-white">
                        <span>{formData.file.name}</span>
                        <span className="text-purple-200 text-sm">
                          {formatFileSize(formData.file.size)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Assignment Details */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Assignment Details
                  </h3>
                  <div className="space-y-2 text-white">
                    <div>
                      <span className="text-purple-200">Subject:</span>{" "}
                      {subjects.find((s) => s.id === formData.subject)?.name}
                    </div>
                    <div>
                      <span className="text-purple-200">Assignment:</span>{" "}
                      {
                        assignments.find((a) => a.id === formData.assignment)
                          ?.name
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 border border-white/20"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Submit Assignment
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AssignmentUploadForm;
