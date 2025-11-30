import React, { useState, useEffect } from "react";
import { X, Code, User, Clock, List, Star, Zap, Shield, RefreshCw, FileText } from "lucide-react";

// Helper for Info rows (Grid Layout)
const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-700/50 rounded-lg">
            <Icon className="h-4 w-4 text-indigo-400" />
        </div>
        <div className="flex flex-col">
            <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
            <span className="text-white font-medium text-sm">{value}</span>
        </div>
    </div>
);

const DetailsModal = ({ 
  open, children, student, userRole, onSubmitFeedback, onClose 
}) => {
  // Legacy Mode
  if (children) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
        <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl text-black">
          {children}
          <button onClick={onClose} className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Close</button>
        </div>
      </div>
    );
  }

  // Dashboard Mode
  if (!student) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState("");
  const [finalScore, setFinalScore] = useState(student.score || "");
  const [statusOverride, setStatusOverride] = useState(student.status || "In Review");

  useEffect(() => {
    if (student) {
      setFinalScore(student.score || "");
      setStatusOverride(student.status || "In Review");
      setTeacherNotes(student.reviewMessage || ""); // Load existing feedback if any
      setIsEditing(false); // Reset to view mode on open
    }
  }, [student]);

  const handleFinalize = () => {
    const finalReport = {
        score: finalScore,
        status: statusOverride,
        reviewMessage: teacherNotes,
    };
    if (onSubmitFeedback) onSubmitFeedback(student.id, finalReport);
    setIsEditing(false); // Return to view mode
    // onClose(); // Optional: Close modal immediately or let user review changes
  };

  const aiReport = {
    plagiarism: student.plagiarismPercent || 0,
    similarity: (student.plagiarismPercent || 0) > 10 ? "High similarity detected." : "Low similarity detected.",
    deductions: (student.plagiarismPercent || 0) > 10 ? ["Potential plagiarism (-20 marks)", "Lack of original analysis"] : ["Minor grammatical issues"],
  };

  const isAlreadyCompleted = student.status === 'Completed';
  const primaryBg = isAlreadyCompleted ? 'bg-green-600' : 'bg-indigo-600';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-auto bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className={`p-5 rounded-t-2xl flex justify-between items-center ${primaryBg}`}>
            <h3 className="text-xl font-bold text-white flex items-center">
                <Code className="h-6 w-6 mr-3" />
                Assignment Review: {student.assignmentId || 'A-XXX'} - {student.subject || 'Details'}
            </h3>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors bg-transparent border-none">
                <X className="h-6 w-6" />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 text-left bg-gray-900 rounded-b-2xl">
            
            {/* Left Column: Submission Details & Display */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h4 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3 mb-4">Submission Details</h4>
                    
                    {/* Main Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800/50 p-5 rounded-xl border border-gray-800">
                        <InfoItem label="Student" value={student.name} icon={User} />
                        <InfoItem label="Date/Time" value={`${student.submissionDate} @ ${student.submissionTime}`} icon={Clock} />
                        <InfoItem label="Current Status" value={student.status} icon={List} />
                        
                        {/* Display Final Score Here */}
                        <InfoItem 
                            label="Final Score" 
                            value={student.score !== null ? `${student.score}/${student.maxScore}` : 'Not Graded'} 
                            icon={Star} 
                        />
                    </div>

                    {/* Display Teacher Feedback Here (Read Only View) */}
                    {(student.reviewMessage || teacherNotes) && (
                        <div className="mt-4 bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                            <h5 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center">
                                <FileText className="h-3 w-3 mr-1" /> Teacher Review / Feedback
                            </h5>
                            <p className="text-sm text-gray-300 italic">
                                "{student.reviewMessage || teacherNotes}"
                            </p>
                        </div>
                    )}
                </div>
                
                {/* AI Section */}
                <div>
                    <h4 className="text-lg font-bold text-white border-l-4 border-yellow-500 pl-3 mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                        AI Assessment Report
                    </h4>
                    <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-800 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-medium">Plagiarism Score:</span>
                            <span className={`font-bold px-3 py-1 rounded-full ${aiReport.plagiarism > 15 ? 'bg-red-500/10 text-red-400' : 'text-green-400'}`}>
                                {aiReport.plagiarism}%
                            </span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            <span className="font-semibold text-white">Originality Check:</span> {aiReport.similarity}
                        </div>
                        <div className="mt-2">
                            <span className="text-gray-400 text-sm block mb-2 font-semibold text-white">Suggested Deductions:</span>
                            <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                                {aiReport.deductions.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Update Action / Grading Form */}
            {(userRole === 'Teacher' || userRole === 'Admin') && (
                <div className="lg:col-span-1 bg-gray-800/40 p-6 rounded-xl border border-gray-800 h-fit">
                    
                    {!isEditing ? (
                        // 1. VIEW MODE: Simple Card with Action Button
                        <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                            <div className={`p-4 rounded-full ${isAlreadyCompleted ? 'bg-green-500/10' : 'bg-indigo-500/10'}`}>
                                {isAlreadyCompleted ? <Shield className="h-10 w-10 text-green-400" /> : <Shield className="h-10 w-10 text-indigo-400" />}
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">
                                    {isAlreadyCompleted ? "Grading Complete" : "Ready to Grade"}
                                </h4>
                                <p className="text-sm text-gray-400">
                                    {isAlreadyCompleted 
                                        ? "This assignment has been evaluated. Click below to edit." 
                                        : "Review the submission and enter marks."}
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsEditing(true)}
                                className={`w-full py-3 font-bold rounded-lg transition-all flex justify-center items-center shadow-lg ${
                                    isAlreadyCompleted 
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-gray-700/20' 
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
                                }`}
                            >
                                {isAlreadyCompleted ? (
                                    <> <RefreshCw className="h-4 w-4 mr-2" /> Update Grade </>
                                ) : (
                                    <> <Shield className="h-4 w-4 mr-2" /> Grade Assignment </>
                                )}
                            </button>
                        </div>
                    ) : (
                        // 2. EDIT MODE: The Grading Form (The "Update Card")
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                                <h4 className="text-lg font-bold text-white">Grading Form</h4>
                                <button onClick={() => setIsEditing(false)} className="text-xs text-gray-400 hover:text-white underline">Cancel</button>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-2">Final Score ({student.maxScore} Max)</label>
                                <input
                                    type="number"
                                    max={student.maxScore}
                                    value={finalScore}
                                    onChange={(e) => setFinalScore(e.target.value)}
                                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="0"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-2">Status Override</label>
                                <select
                                    value={statusOverride}
                                    onChange={(e) => setStatusOverride(e.target.value)}
                                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-indigo-500 outline-none"
                                >
                                    {['Completed', 'In Review', 'Fail', 'Pass', 'Resubmit'].map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-2">Teacher Feedback</label>
                                <textarea
                                    value={teacherNotes}
                                    onChange={(e) => setTeacherNotes(e.target.value)}
                                    rows="4"
                                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-indigo-500 outline-none resize-none placeholder-gray-600"
                                    placeholder="Enter specific feedback, mark deductions, and improvement tips."
                                />
                            </div>

                            <button 
                                onClick={handleFinalize} 
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all flex justify-center items-center shadow-lg shadow-indigo-500/25 mt-2"
                            >
                                <Shield className="h-5 w-5 mr-2" /> Save & Update
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;