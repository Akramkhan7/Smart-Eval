import React, { useState, useEffect } from "react";
import { X, Code, User, Clock, List, Star, Zap, Shield } from "lucide-react";

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
  // ---------------------------------------------------------
  // MODE 1: LEGACY / SIMPLE MODAL
  // ---------------------------------------------------------
  if (children) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
        <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl text-black">
          {children}
          <button onClick={onClose} className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // MODE 2: ADVANCED DASHBOARD MODAL (Matches Screenshot)
  // ---------------------------------------------------------
  if (!student) return null;

  const [teacherNotes, setTeacherNotes] = useState("");
  const [finalScore, setFinalScore] = useState(student.score || "");
  const [statusOverride, setStatusOverride] = useState(student.status || "In Review");

  useEffect(() => {
    if (student) {
      setFinalScore(student.score || "");
      setStatusOverride(student.status || "In Review");
      setTeacherNotes("");
    }
  }, [student]);

  const handleFinalize = () => {
    const finalReport = {
        score: finalScore,
        status: statusOverride,
        reviewMessage: teacherNotes,
    };
    if (onSubmitFeedback) onSubmitFeedback(student.id, finalReport);
    onClose();
  };

  const aiReport = {
    plagiarism: student.plagiarismPercent || 0,
    similarity: (student.plagiarismPercent || 0) > 10 ? "High similarity detected." : "Low similarity detected.",
    deductions: (student.plagiarismPercent || 0) > 10 ? ["Potential plagiarism (-20 marks)", "Lack of original analysis"] : ["Minor grammatical issues"],
  };

  // Logic to match the Green Header in your screenshot
  // If status is completed or score > 60, we use Green. Else Red/Indigo.
  const isPass = (student.score >= 60) || student.status === 'Completed'; 
  const primaryBg = isPass ? 'bg-green-600' : 'bg-indigo-600';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-auto bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 animate-in fade-in zoom-in duration-200">
        
        {/* Header - Matches Screenshot Green Header */}
        <div className={`p-5 rounded-t-2xl flex justify-between items-center ${primaryBg}`}>
            <h3 className="text-xl font-bold text-white flex items-center">
                <Code className="h-6 w-6 mr-3" />
                Assignment Review: {student.assignmentId} - {student.subject}
            </h3>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors bg-transparent border-none">
                <X className="h-6 w-6" />
            </button>
        </div>

        {/* Body Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 text-left bg-gray-900 rounded-b-2xl">
            
            {/* Left Column: Details & AI */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Submission Details Section */}
                <div>
                    <h4 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3 mb-4">Submission Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800/50 p-5 rounded-xl border border-gray-800">
                        <InfoItem label="Student" value={student.name} icon={User} />
                        <InfoItem label="Date/Time" value={`${student.submissionDate} @ ${student.submissionTime}`} icon={Clock} />
                        <InfoItem label="Current Status" value={student.status} icon={List} />
                        <InfoItem label="Max Marks" value={student.maxScore} icon={Star} />
                    </div>
                </div>
                
                {/* AI Assessment Section */}
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

            {/* Right Column: Grading Form (Matches styling of right sidebar) */}
            {(userRole === 'Teacher' || userRole === 'Admin') && (
                <div className="lg:col-span-1 bg-gray-800/40 p-6 rounded-xl border border-gray-800 h-fit">
                    <h4 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-700">Final Review & Grading</h4>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-2">Final Score ({student.maxScore} Max)</label>
                            <input
                                type="number"
                                max={student.maxScore}
                                value={finalScore}
                                onChange={(e) => setFinalScore(e.target.value)}
                                className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="0"
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
                            <label className="block text-sm font-semibold text-gray-400 mb-2">Teacher Review Message</label>
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
                            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-all flex justify-center items-center shadow-lg hover:shadow-indigo-500/25 mt-2"
                        >
                            <Shield className="h-5 w-5 mr-2" /> Finalize Report & Approve
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;