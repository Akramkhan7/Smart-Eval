import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
    Upload, Clock, CheckCircle, TrendingUp, 
    FileText, AlertTriangle, X, User, Calendar,
    Award, BarChart3, FileCheck, Download
} from 'lucide-react';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setAssignments([
                {
                    id: 'A001',
                    subject: 'Calculus I',
                    assignmentId: 'A-201',
                    score: 92,
                    maxScore: 100,
                    status: 'Completed',
                    submissionDate: '2025-11-25',
                    submissionTime: '10:30 AM',
                    plagiarismPercent: 5,
                    teacherName: 'Dr. Sarah Johnson',
                    feedback: 'Excellent work! Your understanding of derivatives is outstanding. Keep up the good work.',
                    grade: 'A',
                    submittedFile: 'calculus_assignment_1.pdf',
                    reviewedDate: '2025-11-26',
                    strengths: ['Clear explanations', 'Well-organized solutions', 'Good use of examples'],
                    improvements: ['Minor notation errors in question 3']
                },
                {
                    id: 'A002',
                    subject: 'Digital Marketing',
                    assignmentId: 'R-305',
                    score: null,
                    maxScore: 100,
                    status: 'In Review',
                    submissionDate: '2025-11-24',
                    submissionTime: '04:15 PM',
                    plagiarismPercent: 2,
                    teacherName: 'Prof. Michael Chen',
                    feedback: null,
                    grade: null,
                    submittedFile: 'marketing_strategy.docx',
                    reviewedDate: null,
                    strengths: [],
                    improvements: []
                },
                {
                    id: 'A003',
                    subject: 'Data Structures',
                    assignmentId: 'P-112',
                    score: 55,
                    maxScore: 100,
                    status: 'Completed',
                    submissionDate: '2025-11-23',
                    submissionTime: '09:50 AM',
                    plagiarismPercent: 8,
                    teacherName: 'Dr. Emily Roberts',
                    feedback: 'Your implementation needs improvement. Please review the concepts of linked lists and recursion.',
                    grade: 'D',
                    submittedFile: 'data_structures_hw2.zip',
                    reviewedDate: '2025-11-24',
                    strengths: ['Good effort on attempting all problems'],
                    improvements: ['Incorrect algorithm implementation', 'Missing time complexity analysis', 'Code lacks proper comments']
                },
                {
                    id: 'A004',
                    subject: 'Physics',
                    assignmentId: 'PHY-201',
                    score: 78,
                    maxScore: 100,
                    status: 'Completed',
                    submissionDate: '2025-11-20',
                    submissionTime: '02:45 PM',
                    plagiarismPercent: 12,
                    teacherName: 'Dr. James Wilson',
                    feedback: 'Good understanding of concepts. Watch out for calculation errors.',
                    grade: 'B-',
                    submittedFile: 'physics_lab_report.pdf',
                    reviewedDate: '2025-11-22',
                    strengths: ['Clear methodology', 'Good data presentation'],
                    improvements: ['Calculation errors in problem 2', 'Need more detailed analysis']
                }
            ]);
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <div className="text-white text-xl">Loading your assignments...</div>
                </div>
            </div>
        );
    }

    const completedAssignments = assignments.filter(a => a.status === 'Completed');
    const pendingAssignments = assignments.filter(a => a.status === 'In Review');
    const averageScore = completedAssignments.length > 0
        ? completedAssignments.reduce((sum, a) => sum + a.score, 0) / completedAssignments.length
        : 0;

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Student Dashboard
                    </h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overall Grade */}
                    <div className="p-6 bg-[#1a1f2e] rounded-2xl border border-gray-800">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Overall Grade Avg
                            </p>
                            <TrendingUp className="h-5 w-5 text-green-400" />
                        </div>
                        <p className="text-4xl font-bold text-white">
                            {averageScore > 0 ? `${averageScore.toFixed(1)}%` : 'N/A'}
                        </p>
                    </div>

                    {/* Assignments Pending */}
                    <div className="p-6 bg-[#1a1f2e] rounded-2xl border border-gray-800">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Assignments Pending
                            </p>
                            <Clock className="h-5 w-5 text-yellow-400" />
                        </div>
                        <p className="text-4xl font-bold text-white">{pendingAssignments.length}</p>
                    </div>

                    {/* Upload New Assignment */}
                    <div className="p-6 bg-[#1a1f2e] rounded-2xl border border-gray-800">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Upload New Assignment
                            </p>
                            <Upload className="h-5 w-5 text-indigo-400" />
                        </div>
                        <button className="w-full mt-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center">
                            <Upload className="h-5 w-5 mr-2" />
                            Select File
                        </button>
                    </div>
                </div>

                {/* Assignments List */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6">
                        My Submissions ({assignments.length})
                    </h3>
                    <div className="space-y-4">
                        {assignments.map((assignment) => (
                            <AssignmentCard 
                                key={assignment.id} 
                                assignment={assignment}
                                onViewDetails={() => setSelectedAssignment(assignment)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {selectedAssignment && (
                <AssignmentDetailsModal
                    assignment={selectedAssignment}
                    onClose={() => setSelectedAssignment(null)}
                />
            )}
        </div>
    );
};

// Assignment Card Component
const AssignmentCard = ({ assignment, onViewDetails }) => {
    const isPending = assignment.status === 'In Review';
    const isHighPlagiarism = assignment.plagiarismPercent > 15;

    return (
        <div className="p-6 bg-[#1a1f2e] rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Assignment Info */}
                <div className="flex-1">
                    <h4 className="text-md font-bold text-white mb-2">
                        {assignment.subject} ({assignment.assignmentId})
                    </h4>
                    <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                            Submitted: <span className="text-gray-300 font-medium">{assignment.submissionDate}</span> at{' '}
                            <span className="text-gray-300 font-medium">{assignment.submissionTime}</span>
                        </span>
                    </div>
                </div>

                {/* Right: Score & Status */}
                <div className="flex items-center gap-6">
                    {/* Score */}
                    <div className="text-right">
                        <p className="text-1xl  text-white">
                            {assignment.score !== null ? `${assignment.score}/${assignment.maxScore}` : 'N/A'}
                        </p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                        {isPending ? (
                            <span className="px-4 py-2 text-sm font-semibold rounded-full bg-yellow-500/20 text-yellow-400 flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                In Review
                            </span>
                        ) : (
                            <span className="px-3 py-1 text-sm  rounded-full bg-green-500/20 text-green-400 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Completed
                            </span>
                        )}

                        {/* View Details Button */}
                        <button 
                            onClick={onViewDetails}
                            className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                            <FileText className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Plagiarism Warning */}
            {isHighPlagiarism && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                    <p className="text-sm text-red-400">
                        High plagiarism detected: {assignment.plagiarismPercent}%
                    </p>
                </div>
            )}
        </div>
    );
};

// Assignment Details Modal
const AssignmentDetailsModal = ({ assignment, onClose }) => {
    const isPending = assignment.status === 'In Review';
    const getGradeColor = (grade) => {
        if (!grade) return 'text-gray-400';
        if (grade.startsWith('A')) return 'text-green-400';
        if (grade.startsWith('B')) return 'text-blue-400';
        if (grade.startsWith('C')) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-[#1a1f2e] rounded-2xl shadow-2xl border border-gray-800">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {assignment.subject}
                        </h2>
                        <p className="text-gray-400 mt-1">Assignment ID: {assignment.assignmentId}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    
                    {/* Score & Grade Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-[#0a0e1a] rounded-xl border border-gray-800">
                            <p className="text-sm text-gray-400 mb-2">Score</p>
                            <p className="text-3xl font-bold text-white">
                                {assignment.score !== null ? `${assignment.score}/${assignment.maxScore}` : 'Pending'}
                            </p>
                        </div>
                        
                        <div className="p-4 bg-[#0a0e1a] rounded-xl border border-gray-800">
                            <p className="text-sm text-gray-400 mb-2">Grade</p>
                            <p className={`text-3xl font-bold ${getGradeColor(assignment.grade)}`}>
                                {assignment.grade || 'N/A'}
                            </p>
                        </div>
                        
                        <div className="p-4 bg-[#0a0e1a] rounded-xl border border-gray-800">
                            <p className="text-sm text-gray-400 mb-2">Plagiarism</p>
                            <p className={`text-3xl font-bold ${
                                assignment.plagiarismPercent > 15 ? 'text-red-400' : 'text-green-400'
                            }`}>
                                {assignment.plagiarismPercent}%
                            </p>
                        </div>
                    </div>

                    {/* Submission Info */}
                    <div className="bg-[#0a0e1a] rounded-xl border border-gray-800 p-5">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <FileCheck className="h-5 w-5 mr-2 text-indigo-400" />
                            Submission Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-3">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-gray-400">Submitted On</p>
                                    <p className="text-white font-medium">{assignment.submissionDate} at {assignment.submissionTime}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <User className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-gray-400">Reviewed By</p>
                                    <p className="text-white font-medium">{assignment.teacherName}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <FileText className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-gray-400">Submitted File</p>
                                    <p className="text-white font-medium">{assignment.submittedFile}</p>
                                </div>
                            </div>
                            
                            {assignment.reviewedDate && (
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="text-gray-400">Reviewed On</p>
                                        <p className="text-white font-medium">{assignment.reviewedDate}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feedback Section */}
                    {!isPending && (
                        <>
                            <div className="bg-[#0a0e1a] rounded-xl border border-gray-800 p-5">
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <Award className="h-5 w-5 mr-2 text-indigo-400" />
                                    Teacher Feedback
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {assignment.feedback || 'No feedback provided yet.'}
                                </p>
                            </div>

                            {/* Strengths & Improvements */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {assignment.strengths.length > 0 && (
                                    <div className="bg-green-900/20 border border-green-800 rounded-xl p-5">
                                        <h4 className="text-base font-semibold text-green-400 mb-3 flex items-center">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Strengths
                                        </h4>
                                        <ul className="space-y-2">
                                            {assignment.strengths.map((strength, idx) => (
                                                <li key={idx} className="text-sm text-gray-300 flex items-start">
                                                    <span className="text-green-400 mr-2">•</span>
                                                    {strength}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {assignment.improvements.length > 0 && (
                                    <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-5">
                                        <h4 className="text-base font-semibold text-yellow-400 mb-3 flex items-center">
                                            <AlertTriangle className="h-4 w-4 mr-2" />
                                            Areas for Improvement
                                        </h4>
                                        <ul className="space-y-2">
                                            {assignment.improvements.map((improvement, idx) => (
                                                <li key={idx} className="text-sm text-gray-300 flex items-start">
                                                    <span className="text-yellow-400 mr-2">•</span>
                                                    {improvement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Pending Message */}
                    {isPending && (
                        <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-5 text-center">
                            <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-white mb-2">Under Review</h3>
                            <p className="text-gray-400">
                                Your assignment is currently being reviewed by {assignment.teacherName}. 
                                You will receive feedback soon.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800 flex justify-between items-center">
                    <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center">
                        <Download className="h-5 w-5 mr-2" />
                        Download Submission
                    </button>
                    <button 
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
