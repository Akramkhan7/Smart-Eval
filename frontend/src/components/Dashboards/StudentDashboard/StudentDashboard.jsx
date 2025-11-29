import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

import { 
    Upload, Clock, CheckCircle, TrendingUp, 
    FileText, AlertTriangle
} from 'lucide-react';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    plagiarismPercent: 5
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
                    plagiarismPercent: 2
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
                    plagiarismPercent: 8
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
                    plagiarismPercent: 12
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
        <div className="min-h-screen bg-[#0a0e1a] p-4 md:p-8 lg:p-10">
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
                            <AssignmentCard key={assignment.id} assignment={assignment} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Assignment Card Component
const AssignmentCard = ({ assignment }) => {
    const isPending = assignment.status === 'In Review';
    const isHighPlagiarism = assignment.plagiarismPercent > 15;

    return (
        <div className="p-6 bg-[#1a1f2e] rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Assignment Info */}
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">
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
                        <p className="text-3xl font-bold text-white">
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
                            <span className="px-4 py-2 text-sm font-semibold rounded-full bg-green-500/20 text-green-400 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Completed
                            </span>
                        )}

                        {/* View Details Button */}
                        <button className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
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

export default StudentDashboard;
