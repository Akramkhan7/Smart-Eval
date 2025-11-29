import React, { useState, useCallback } from 'react';
import { Search, Filter, ChevronDown, CheckCircle, Clock, XOctagon, Star, MessageSquare, AlertTriangle, User, TrendingUp, TrendingDown, RefreshCw, X, FileText } from 'lucide-react';

// --- 1. HARDCODED DATA LIST (Updated with Submission Time) ---
const studentData = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    subject: 'Calculus I', 
    assignmentId: 'A-201',
    score: 92, 
    maxScore: 100, 
    status: 'Pass',
    submissionDate: '2025-11-25', // Updated field name
    submissionTime: '10:30 AM', // New field for precise time
    timeAgo: '2 days ago', 
    photoUrl: 'https://placehold.co/48x48/A78BFA/FFFFFF?text=AJ',
    icon: CheckCircle,
    color: 'text-green-400',
    marksDisplay: '92/100',
    plagiarismPercent: 5,
    extraDetail: 'High Distinction',
    details: { 
      teacher: 'Dr. Evelyn Sharp',
      deductions: ['Minor formatting errors (-3 marks)', 'Lack of detailed solution steps for Q4 (-5 marks)'],
      reason: 'The application of integration principles was correct, but presentation clarity was below standard.',
      improvements: ['Ensure all final answers are boxed.', 'Provide clear, step-by-step reasoning for all complex problems.'],
    },
  },
  { 
    id: 2, 
    name: 'Maria Lopez', 
    subject: 'Digital Marketing', 
    assignmentId: 'R-305',
    score: 4, 
    maxScore: 5, 
    status: 'In Review', 
    submissionDate: '2025-11-24',
    submissionTime: '04:15 PM',
    timeAgo: '3 days ago',
    photoUrl: 'https://placehold.co/48x48/818CF8/FFFFFF?text=ML',
    icon: Clock,
    color: 'text-yellow-400',
    marksDisplay: '4/5',
    plagiarismPercent: 0,
    extraDetail: 'Draft 1 Received',
    details: {
      teacher: 'Ms. Chloe Bennet',
      deductions: [],
      reason: 'Draft submitted successfully. Currently awaiting plagiarism scan and final review by the instructor.',
      improvements: ['None yet. Waiting for initial feedback.'],
    },
  },
  { 
    id: 3, 
    name: 'Chen Wei', 
    subject: 'Data Structures', 
    assignmentId: 'P-112',
    score: 55, 
    maxScore: 100, 
    status: 'Fail',
    submissionDate: '2025-11-23', 
    submissionTime: '09:50 AM',
    timeAgo: '4 days ago',
    photoUrl: 'https://placehold.co/48x48/9CA3AF/FFFFFF?text=CW',
    icon: XOctagon,
    color: 'text-red-400',
    marksDisplay: '55/100',
    plagiarismPercent: 12,
    extraDetail: 'Requires Resubmission',
    details: {
      teacher: 'Prof. David Lee',
      deductions: ['Inefficient algorithm chosen for Task B (-15 marks)', 'Syntax errors in recursion logic (-10 marks)', 'Missing complexity analysis (-20 marks)'],
      reason: 'The core concept was understood, but the implementation was highly inefficient and incomplete.',
      improvements: ['Study Big O notation.', 'Review dynamic programming techniques for optimization.', 'Thoroughly test and debug code before submission.'],
    },
  },
  { 
    id: 5, 
    name: 'Anjali Desai', 
    subject: 'Indian History', 
    assignmentId: 'E-401',
    score: 5, 
    maxScore: 5, 
    status: 'Pass', 
    submissionDate: '2025-11-21',
    submissionTime: '08:00 PM',
    timeAgo: '6 days ago',
    photoUrl: 'https://placehold.co/48x48/F97316/FFFFFF?text=AD',
    icon: Star,
    color: 'text-green-400',
    marksDisplay: '5/5',
    plagiarismPercent: 1,
    extraDetail: 'Top Scorer',
    details: {
      teacher: 'Dr. Priya Sharma',
      deductions: [],
      reason: 'Excellent essay quality. Strong analytical depth and flawless citation.',
      improvements: ['Keep up the stellar work!'],
    },
  },
  { 
    id: 6, 
    name: 'Rohan Kapoor', 
    subject: 'Econometrics', 
    assignmentId: 'Q-08',
    score: 65, 
    maxScore: 100, 
    status: 'Fail', 
    submissionDate: '2025-11-20', 
    submissionTime: '11:45 AM',
    timeAgo: '1 week ago',
    photoUrl: 'https://placehold.co/48x48/FCD34D/333333?text=RK',
    icon: XOctagon,
    color: 'text-red-400',
    marksDisplay: '65/100',
    plagiarismPercent: 22,
    extraDetail: 'High Plagiarism',
    details: {
      teacher: 'Prof. Mark Webber',
      deductions: ['Identical segments found in external sources (-25 marks)', 'Statistical model misinterpretation (-10 marks)'],
      reason: 'Submission failed plagiarism check. Resubmission is mandatory and penalized. Focus on original analysis.',
      improvements: ['Rewrite the literature review section entirely.', 'Use direct quotes sparingly and cite properly.', 'Review Hypothesis Testing lectures.'],
    },
  },
  { 
    id: 8, 
    name: 'Kavya Menon', 
    subject: 'Physics Lab Report', 
    assignmentId: 'L-01',
    score: 4, 
    maxScore: 5, 
    status: 'Pass', 
    submissionDate: '2025-11-18', 
    submissionTime: '06:20 PM',
    timeAgo: '1 week ago',
    photoUrl: 'https://placehold.co/48x48/C084FC/FFFFFF?text=KM',
    icon: CheckCircle,
    color: 'text-green-400',
    marksDisplay: '4/5',
    plagiarismPercent: 3,
    extraDetail: 'Experiment 3',
    details: {
      teacher: 'Dr. Arun Singh',
      deductions: ['Small error in calculation of uncertainty (-1 mark)'],
      reason: 'Procedure and results were accurate. Minor calculation mistake prevented a perfect score.',
      improvements: ['Double-check all final calculation steps.', 'Ensure all units are correctly labelled.'],
    },
  },
  { 
    id: 11, 
    name: 'Deepa Verma', 
    subject: 'Modern Art History', 
    assignmentId: 'Q-03',
    score: 3, 
    maxScore: 5, 
    status: 'In Review', 
    submissionDate: '2025-11-15', 
    submissionTime: '02:05 PM',
    timeAgo: '1.5 weeks ago',
    photoUrl: 'https://placehold.co/48x48/EC4899/FFFFFF?text=DV',
    icon: Clock,
    color: 'text-yellow-400',
    marksDisplay: '3/5',
    plagiarismPercent: 4,
    extraDetail: 'Submitted Late',
    details: {
      teacher: 'Ms. Vivian Holt',
      deductions: ['Submitted 2 days late (-1 mark automatic penalty).', 'Vague definition of ' + 'Futurism' + ' (-1 mark)'],
      reason: 'Late submission received. Content quality is acceptable but requires more precision in definitions.',
      improvements: ['Submit all assignments on time.', 'Use technical art history terminology accurately.'],
    },
  },
  { 
    id: 15, 
    name: 'Preeti Rao', 
    subject: 'Political Science', 
    assignmentId: 'T-09',
    score: 1, 
    maxScore: 5, 
    status: 'Fail', 
    submissionDate: '2025-11-11', 
    submissionTime: '07:30 AM',
    timeAgo: '2 weeks ago',
    photoUrl: 'https://placehold.co/48x48/FACC15/000000?text=PR',
    icon: XOctagon,
    color: 'text-red-400',
    marksDisplay: '1/5',
    plagiarismPercent: 45,
    extraDetail: 'Source Citation Issue',
    details: {
      teacher: 'Prof. Anil Gupta',
      deductions: ['High plagiarism detected (45%).', 'No references cited.', 'Incorrect formatting throughout.'],
      reason: 'This score is primarily due to severe citation and originality issues. See the academic handbook.',
      improvements: ['Consult the academic integrity office.', 'Review APA/MLA citation guidelines immediately.', 'Rewrite the entire essay based on critical analysis, not external summaries.'],
    },
  },
];

// --- 2. DETAILS MODAL COMPONENT ---
const DetailsModal = ({ student, onClose }) => {
    if (!student) return null;

    const { details } = student;
    const isPass = student.status === 'Pass';
    const primaryColor = isPass ? 'text-green-400' : 'text-red-400';
    const primaryBg = isPass ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg mx-auto bg-gray-900 rounded-xl shadow-2xl transform transition-all duration-300 scale-100 border border-gray-700">
                
                {/* Header */}
                <div className={`p-5 rounded-t-xl flex justify-between items-center ${primaryBg}`}>
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <FileText className="h-6 w-6 mr-3" />
                        Feedback: {student.subject}
                    </h3>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4 border-b border-gray-700 pb-4">
                        <InfoItem label="Student" value={student.name} icon={User} />
                        <InfoItem label="Assignment ID" value={student.assignmentId} icon={FileText} />
                        <InfoItem label="Marks" value={student.marksDisplay} icon={isPass ? TrendingUp : TrendingDown} color={primaryColor} />
                        <InfoItem label="Plagiarism" value={`${student.plagiarismPercent}%`} icon={AlertTriangle} color={student.plagiarismPercent > 15 ? 'text-red-400' : 'text-gray-400'} />
                        <InfoItem label="Submission Date" value={`${student.submissionDate} @ ${student.submissionTime}`} icon={Clock} />
                        <InfoItem label="Grader" value={details.teacher} icon={User} />
                    </div>

                    {/* Teacher & Overall Reason */}
                    <section>
                        <h4 className="text-lg font-semibold text-white mb-2 border-l-4 border-indigo-500 pl-3">Grader's Summary (Reason)</h4>
                        <div className="text-sm text-gray-300 bg-gray-800 p-4 rounded-lg">
                            <p>{details.reason}</p>
                        </div>
                    </section>

                    {/* Deductions */}
                    {details.deductions && details.deductions.length > 0 && (
                        <section>
                            <h4 className="text-lg font-semibold text-white mb-2 border-l-4 border-yellow-500 pl-3">Mark Deductions (Where marks were cut)</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {details.deductions.map((deduction, index) => (
                                    <li key={index} className="flex items-start">
                                        <TrendingDown className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-1 mr-2" />
                                        <span>{deduction}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Improvements */}
                    <section>
                        <h4 className="text-lg font-semibold text-white mb-2 border-l-4 border-green-500 pl-3">Suggestions for Improvement</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            {details.improvements.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                    <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0 mt-1 mr-2" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Close Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, icon: Icon, color = 'text-gray-400' }) => (
    <div className="flex items-center space-x-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <div className="flex flex-col text-sm">
            <span className="text-gray-400 font-medium">{label}</span>
            <span className="text-white font-semibold">{value}</span>
        </div>
    </div>
);


// --- 3. STUDENT LIST COMPONENT (UPDATED TO SHOW SUBMISSION TIME) ---

const StudentList = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleMoreDetailsClick = useCallback((student, e) => {
        // Stop event propagation to prevent the outer card click handler from firing
        e.stopPropagation();
        setSelectedStudent(student);
    }, []);

    const handleCardClick = (studentName, subject) => {
        console.log(`Navigating to detailed view for ${studentName}'s ${subject} submission (Default card action).`);
    };

    return (
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-3">
                Latest Submissions ({studentData.length} records)
            </h2>
            
            <div className="space-y-4">
                {studentData.map((student) => {
                    const isHighPlagiarism = student.plagiarismPercent > 15;

                    return (
                        <div 
                            key={student.id} 
                            onClick={() => handleCardClick(student.name, student.subject)}
                            className="flex justify-between items-center p-4 sm:p-6 rounded-xl border border-gray-800 bg-gray-900/50 shadow-lg cursor-pointer transition-all duration-200 ease-in-out
                                        hover:bg-gray-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/20"
                        >
                            {/* LEFT SIDE: Photo and Info Block */}
                            <div className="flex items-center space-x-4 sm:space-x-6 w-full">
                                {/* Photo */}
                                <div className="flex-shrink-0">
                                    <img 
                                        className="h-12 w-12 rounded-lg object-cover border border-gray-700 shadow-md" 
                                        src={student.photoUrl} 
                                        alt={`Photo of ${student.name}`} 
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/374151/FFFFFF?text=U'; }} // Fallback
                                    />
                                </div>
                                
                                {/* Name and Subject (Stacked Info) */}
                                <div className="flex flex-col min-w-0">
                                    <div className="text-base font-semibold text-white truncate">{student.name}</div>
                                    {/* Subject display with 'Subject: ' label */}
                                    <div className="text-sm text-gray-400 truncate flex items-center space-x-2">
                                        <FileText className="h-3 w-3 text-indigo-400" />
                                        <span>Subject: <span className="text-gray-300 font-medium">{student.subject}</span></span>
                                        <span className="text-xs text-gray-500 hidden sm:inline-block">({student.assignmentId})</span>
                                    </div>
                                    {/* Submission Time and Date (Updated) */}
                                    <div className="text-xs text-gray-500 mt-0.5 flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span>Submitted: <span className="text-gray-400 font-medium">{student.submissionDate}</span> at <span className="text-gray-400 font-medium">{student.submissionTime}</span></span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* RIGHT SIDE: Results Block (Status, Marks, Plagiarism) */}
                            <div className="flex items-center flex-shrink-0 ml-4 space-x-6">
                                {/* Results Block */}
                                <div className="flex flex-col items-end mr-4">
                                    {/* Marks */}
                                    <div className="text-xl font-extrabold text-white">
                                        {student.marksDisplay}
                                    </div>

                                    {/* Pass/Fail Status */}
                                    <div className={`text-sm font-bold ${student.color} mt-1`}>
                                        {student.status}
                                    </div>

                                    {/* Plagiarism Badge */}
                                    <div 
                                        className={`mt-1 flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                                            ${isHighPlagiarism 
                                                ? 'bg-red-900/50 text-red-300 border border-red-700' 
                                                : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                                            } `}
                                    >
                                        {isHighPlagiarism && <AlertTriangle className="h-3 w-3 mr-1" />}
                                        Plag: {student.plagiarismPercent}%
                                    </div>
                                </div>

                                {/* More Details Button */}
                                <button
                                    onClick={(e) => handleMoreDetailsClick(student, e)}
                                    className="flex items-center justify-center p-3 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
                                    title="View detailed feedback"
                                >
                                    <MessageSquare className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Details Modal (Drawer) */}
            <DetailsModal 
                student={selectedStudent} 
                onClose={() => setSelectedStudent(null)} 
            />
        </div>
    );
};


// --- 4. NAVBAR COMPONENT ---

const Navbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    status: '',
    date: ''
  });

  // Simplified Gradient usage for Tailwind utility classes
  const indigoButtonClass = "bg-indigo-600 hover:bg-indigo-700";

  const categories = ['All Subjects', 'DBMS', 'DSA', 'OOPs', 'Math'];
  const statuses = ['All Status', 'Pending', 'Completed', 'In Review', 'Failed'];
  const dateRanges = ['All Time', 'Today', 'This Week', 'This Month', 'Custom'];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: '',
      status: '',
      date: ''
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-semibold text-white">Datox</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {/* Search Bar */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-gray-700 bg-gray-900/50 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm font-medium text-white transition-all hover:border-indigo-500 hover:bg-gray-800"
            >
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Action Buttons */}
            <button className={`rounded-full ${indigoButtonClass} px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50`}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Filter Dropdown Panel */}
        {isFilterOpen && (
          <div className="absolute left-0 right-0 top-20 border-b border-gray-800 bg-black/95 backdrop-blur-sm shadow-xl">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Category Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Subjects Category
                  </label>
                  <select
                    value={selectedFilters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Status
                  </label>
                  <select
                    value={selectedFilters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Date Range
                  </label>
                  <select
                    value={selectedFilters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {dateRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={clearFilters}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className={`rounded-lg ${indigoButtonClass} px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50`}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


// --- 5. MAIN APP COMPONENT ---

const MyAssignment = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <StudentList />
    </div>
  );
};

export default MyAssignment;