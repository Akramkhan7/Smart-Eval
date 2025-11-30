import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Clock, CheckCircle, User, FileText, ChevronLeft, Filter, Download 
} from 'lucide-react';
import StatusBadge from '../Shared/StatusBadge'; 
import DetailsModal from '../Shared/DetailsModal'; 

// --- Dummy Data (Updated with Subject/ID for Modal) ---
const mockSubmissions = [
    { id: 'S1', name: 'Alex Johnson', subject: 'Introduction to AI', assignmentId: 'A-101', pdfName: 'Intro_AI_Assignment_Alex.pdf', score: 92, maxScore: 100, status: 'Completed', submissionDate: '2025-11-25', submissionTime: '10:30 AM', plagiarismPercent: 5 },
    { id: 'S2', name: 'Maria Lopez', subject: 'Introduction to AI', assignmentId: 'A-101', pdfName: 'AI_Intro_Draft_v2.pdf', score: null, maxScore: 100, status: 'In Review', submissionDate: '2025-11-24', submissionTime: '04:15 PM', plagiarismPercent: 0 },
    { id: 'S3', name: 'Chen Wei', subject: 'Introduction to AI', assignmentId: 'A-101', pdfName: 'Chen_Assignment_1.pdf', score: 88, maxScore: 100, status: 'Completed', submissionDate: '2025-11-23', submissionTime: '09:50 AM', plagiarismPercent: 12 },
    { id: 'S4', name: 'Rohan Kapoor', subject: 'Introduction to AI', assignmentId: 'A-101', pdfName: 'Rohan_AI_Final.pdf', score: null, maxScore: 100, status: 'In Review', submissionDate: '2025-11-26', submissionTime: '11:00 AM', plagiarismPercent: 2 },
];

const TeacherAssignmentDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [submissions, setSubmissions] = useState(mockSubmissions);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('All'); 

    const totalCount = submissions.length;
    const evaluatedCount = submissions.filter(s => s.status === 'Completed').length;
    const pendingCount = submissions.filter(s => s.status === 'In Review').length;

    const filteredList = submissions.filter(item => {
        if (filter === 'All') return true;
        return item.status === filter;
    });

    const handleGradeSubmit = (studentId, feedback) => {
        setSubmissions(prev => prev.map(item => 
          item.id === studentId 
            ? { ...item, score: feedback.score, status: feedback.status } 
            : item
        ));
    };

    // Helper for PDF Download Simulation
    const handleDownload = (e, fileName) => {
        e.stopPropagation(); // Prevent opening the grading modal
        alert(`Downloading file: ${fileName}`);
    };

    const FilterCard = ({ title, count, active, onClick, icon: Icon, colorClass }) => (
        <div 
            onClick={onClick}
            className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                active 
                ? 'bg-gray-900 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                : 'bg-gray-900/50 border-gray-800 hover:bg-gray-800'
            }`}
        >
            <div className="flex justify-between items-center">
                <h3 className={`text-sm font-medium uppercase tracking-wider ${active ? 'text-white' : 'text-gray-400'}`}>
                    {title}
                </h3>
                <Icon className={`h-5 w-5 ${colorClass}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-white">{count}</p>
        </div>
    );

    return (
        <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 pt-24 space-y-8 text-white font-sans">
            
            {/* Header */}
            <div className="max-w-7xl mx-auto flex items-center">
                <button 
                    type="button"
                    onClick={() => navigate('/teacher/dashboard')} 
                    className="mr-4 p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors group cursor-pointer relative z-50 shadow-lg"
                >
                    <ChevronLeft className="h-6 w-6 text-white group-hover:text-indigo-400 transition-colors pointer-events-none" />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-white">Assignment: {id}</h2>
                    <p className="text-gray-400 mt-1 text-sm">Introduction to AI</p>
                </div>
            </div>
            
            {/* Filters */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <FilterCard title="All Submissions" count={totalCount} active={filter === 'All'} onClick={() => setFilter('All')} icon={Filter} colorClass="text-indigo-400" />
                <FilterCard title="Evaluated" count={evaluatedCount} active={filter === 'Completed'} onClick={() => setFilter('Completed')} icon={CheckCircle} colorClass="text-green-400" />
                <FilterCard title="Pending / Not Evaluated" count={pendingCount} active={filter === 'In Review'} onClick={() => setFilter('In Review')} icon={Clock} colorClass="text-yellow-400" />
            </div>

            {/* List Section */}
            <div className="max-w-7xl mx-auto">
                <h3 className="text-xl font-semibold text-white pt-4 border-t border-gray-800 mb-6 flex items-center">
                    <User className="h-5 w-5 mr-2 text-indigo-400" />
                    Student List ({filteredList.length})
                </h3>
                
                <div className="space-y-4">
                    {filteredList.map((student) => {
                        const isPending = student.status === 'In Review';
                        const isCompleted = student.status === 'Completed';
                        
                        return (
                            <div 
                                key={student.id} 
                                className={`flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 rounded-xl border ${isPending ? 'border-yellow-600/50 bg-yellow-900/10' : 'border-gray-800 bg-gray-900/50'} shadow-lg transition-all duration-200 hover:bg-gray-800/80 cursor-pointer`}
                                onClick={() => setSelected(student)} // Open modal on row click
                            >
                                <div className="flex items-center space-x-4 w-full">
                                    <div className="flex flex-col min-w-0">
                                        <div className="text-lg font-bold text-white truncate flex items-center">
                                            {student.name}
                                        </div>
                                        
                                        {/* Clickable PDF Button */}
                                        <button 
                                            onClick={(e) => handleDownload(e, student.pdfName)}
                                            className="text-sm text-indigo-400 flex items-center mt-1 hover:text-indigo-300 hover:underline w-fit transition-colors group"
                                            title="Download PDF"
                                        >
                                            <FileText className="h-3 w-3 mr-1" />
                                            {student.pdfName}
                                            <Download className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>

                                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Submitted: {student.submissionDate} @ {student.submissionTime}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center mt-4 sm:mt-0 sm:ml-4 space-x-6 w-full sm:w-auto justify-end">
                                    <div className="flex flex-col items-end mr-2">
                                        {isCompleted ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                <CheckCircle className="h-3 w-3 mr-1.5" />
                                                Completed
                                            </span>
                                        ) : (
                                            <StatusBadge status={student.status} />
                                        )}
                                        <span className="text-[10px] text-gray-500 mt-1">Plag: {student.plagiarismPercent}%</span>
                                    </div>

                                    {/* Action Icon */}
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full text-white shadow-lg ${isPending ? 'bg-red-600 shadow-red-500/30' : 'bg-indigo-600 shadow-indigo-500/30'}`}>
                                        <FileText className="h-5 w-5" />
                                    </div>
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

export default TeacherAssignmentDetails;