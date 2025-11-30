import React, { useState } from 'react';
import { 
    Clock, CheckCircle, User, Bell, List, FileText 
} from 'lucide-react';
import Card from '../Shared/Card';
import DetailsModal from '../Shared/DetailsModal';

// --- Teacher Data ---
const teacherData = {
    id: 'T001', 
    name: 'Dr. Evelyn Sharp', 
    email: 'evelyn@uni.edu', 
    sectionAssignments: ['MATH-101', 'CS-205']
};

const initialAssignments = [
    { id: 'S1001', name: 'Alex Johnson', subject: 'Calculus I', assignmentId: 'A-201', score: 92, maxScore: 100, status: 'Completed', submissionDate: '2025-11-25', submissionTime: '10:30 AM', plagiarismPercent: 5, extraDetail: 'High Distinction', teacherId: 'T001' },
    { id: 'S1002', name: 'Maria Lopez', subject: 'Digital Marketing', assignmentId: 'R-305', score: null, maxScore: 5, status: 'In Review', submissionDate: '2025-11-24', submissionTime: '04:15 PM', plagiarismPercent: 0, extraDetail: 'Draft 1 Received', teacherId: 'T002' },
    { id: 'S1003', name: 'Chen Wei', subject: 'Data Structures', assignmentId: 'P-112', score: 55, maxScore: 100, status: 'Completed', submissionDate: '2025-11-23', submissionTime: '09:50 AM', plagiarismPercent: 12, extraDetail: 'Requires Resubmission', teacherId: 'T001' },
    { id: 'S1004', name: 'Rohan Kapoor', subject: 'Econometrics', assignmentId: 'Q-08', score: 65, maxScore: 100, status: 'Completed', submissionDate: '2025-11-20', submissionTime: '11:45 AM', plagiarismPercent: 22, extraDetail: 'High Plagiarism', teacherId: 'T003' },
    { id: 'S1005', name: 'Kavya Menon', subject: 'Physics Lab Report', assignmentId: 'L-01', score: 4, maxScore: 5, status: 'Completed', submissionDate: '2025-11-18', submissionTime: '06:20 PM', plagiarismPercent: 3, extraDetail: 'Experiment 3', teacherId: 'T002' },
];

const TeacherDashboard = () => {
    const [assignments, setAssignments] = useState(initialAssignments);
    const [selected, setSelected] = useState(null);

    const teacherAssignments = assignments.filter(a => a.teacherId === teacherData.id || a.teacherId === 'T002');
    
    const pendingCount = teacherAssignments.filter(a => a.status === 'In Review').length;
    const completedCount = teacherAssignments.filter(a => a.status === 'Completed').length;

    const sortedAssignments = [...teacherAssignments].sort((a, b) => {
        if (a.status === 'In Review' && b.status !== 'In Review') return -1;
        if (a.status !== 'In Review' && b.status === 'In Review') return 1;
        return new Date(b.submissionDate) - new Date(a.submissionDate);
    });

    const handleGradeSubmit = (studentId, feedback) => {
        setAssignments(prev => prev.map(item => 
          item.id === studentId 
            ? { ...item, score: feedback.score, status: feedback.status } 
            : item
        ));
    };

    return (
        <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 space-y-8 text-white font-sans">
            
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-white">Teacher Dashboard: {teacherData.name}</h2>
                <p className="text-gray-400 mt-2">Assigned Sections: {teacherData.sectionAssignments.join(', ')}</p>
            </div>
            
            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Pending Reviews" value={pendingCount} icon={Clock} colorClass="text-red-400" />
                <Card title="Completed Reviews" value={completedCount} icon={CheckCircle} colorClass="text-green-400" />
                <Card title="Make Announcement" icon={Bell} colorClass="text-yellow-400">
                    <button className="mt-3 w-full py-2 bg-yellow-600/20 text-yellow-400 font-semibold rounded-lg border border-yellow-600 hover:bg-yellow-600/30 transition-colors flex items-center justify-center">
                        <Bell className="h-4 w-4 mr-2" /> New Message
                    </button>
                </Card>
            </div>

            {/* Assignments List */}
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-semibold text-white pt-4 border-t border-gray-800 mb-6">Assignments to Review ({sortedAssignments.length})</h3>
                
                <div className="space-y-4">
                    {sortedAssignments.map((student) => {
                        const isPending = student.status === 'In Review';
                        const isCompleted = student.status === 'Completed';
                        const isHighPlagiarism = student.plagiarismPercent > 15;

                        return (
                            <div 
                                key={student.id + student.assignmentId} 
                                className={`flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 rounded-xl border ${isPending ? 'border-yellow-600/50 bg-yellow-900/10' : 'border-gray-800 bg-gray-900/50'} shadow-lg transition-all duration-200 ease-in-out hover:bg-gray-800/80`}
                            >
                                {/* LEFT SIDE: Info */}
                                <div className="flex items-center space-x-4 w-full">
                                    <div className="flex flex-col min-w-0">
                                        <div className="text-base font-semibold text-white truncate">{student.subject} ({student.assignmentId})</div>
                                        <div className="text-sm text-gray-400 flex items-center space-x-2 mt-0.5">
                                            <User className="h-3 w-3 text-indigo-400" />
                                            <span>Student: <span className="text-gray-300 font-medium">{student.name}</span></span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5 flex items-center space-x-1">
                                            <Clock className="h-3 w-3" />
                                            <span>Submitted: <span className="text-gray-400 font-medium">{student.submissionDate} @ {student.submissionTime}</span></span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* RIGHT SIDE: Mixed Status Styles */}
                                <div className="flex items-center mt-4 sm:mt-0 sm:ml-4 space-x-6 w-full sm:w-auto justify-end">
                                    
                                    <div className="flex flex-col items-end mr-2 min-w-[100px]">
                                        {/* LOGIC: If Completed -> Green Badge. If In Review -> Plain Text */}
                                        {isCompleted ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                                                <CheckCircle className="w-3 h-3 mr-1.5" />
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold tracking-wider text-white/90 uppercase pr-1">
                                                {student.status}
                                            </span>
                                        )}

                                        <span className={`text-[10px] mt-1 pr-1 ${isHighPlagiarism ? 'text-red-400' : 'text-gray-500'}`}>
                                            Plag: {student.plagiarismPercent}%
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => setSelected(student)}
                                        className={`flex items-center justify-center w-10 h-10 rounded-full text-white shadow-lg transition-transform hover:scale-105 ${isPending ? 'bg-red-600 shadow-red-500/30' : 'bg-indigo-600 shadow-indigo-500/30'}`}
                                        title={isPending ? "Grade Assignment" : "View Final Report"}
                                    >
                                        {isPending ? <List className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <DetailsModal 
                student={selected} 
                onClose={() => setSelected(null)} 
                userRole="Teacher"
                onSubmitFeedback={handleGradeSubmit}
            />
        </div>
    );
};

export default TeacherDashboard;