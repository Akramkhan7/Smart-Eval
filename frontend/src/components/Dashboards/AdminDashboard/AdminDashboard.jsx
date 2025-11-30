import React, { useState } from 'react';
import { 
    Users, User, Clock, Settings, Bell, Lock, RefreshCw, Layers 
} from 'lucide-react';
import Card from '../Shared/Card';

// --- Dummy Data ---
const adminStats = {
    totalStudents: 1500,
    totalTeachers: 45,
    pendingEnrollments: 8,
    systemStatus: 'Operational'
};

const initialAnnouncements = [
    { id: 1, date: '2025-11-28', content: 'System maintenance scheduled for Dec 5th, 1 AM - 3 AM. Submissions will be blocked.' },
    { id: 2, date: '2025-11-20', content: 'New plagiarism detection model activated. Please review the updated policy.' },
];

const initialUsers = [
    { id: 'T001', name: 'Dr. Evelyn Sharp', role: 'Teacher', email: 'evelyn@uni.edu', status: 'Active' },
    { id: 'T002', name: 'Ms. Chloe Bennet', role: 'Teacher', email: 'chloe@uni.edu', status: 'Active' },
    { id: 'S1001', name: 'Alex Johnson', role: 'Student', email: 'alex.j@uni.edu', status: 'Active' },
    { id: 'S1002', name: 'Maria Lopez', role: 'Student', email: 'maria.l@uni.edu', status: 'Blocked' },
    { id: 'S1003', name: 'Chen Wei', role: 'Student', email: 'chen.w@uni.edu', status: 'Active' },
];

const AdminDashboard = () => {
    const [announcementText, setAnnouncementText] = useState('');
    const [userToBlock, setUserToBlock] = useState('');
    const [users, setUsers] = useState(initialUsers);
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    
    // Handle Posting Announcement
    const handleAnnouncement = () => {
        if (announcementText.trim()) {
            const newAnnouncement = {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                content: announcementText
            };
            setAnnouncements([newAnnouncement, ...announcements]);
            setAnnouncementText('');
            alert("Announcement Posted Successfully!");
        }
    };

    // Handle Blocking/Unblocking Logic
    const handleAction = (actionType) => {
        if (!userToBlock) return;
        
        // In a real app, you would verify the ID exists here
        alert(`User ${userToBlock} has been ${actionType === 'block' ? 'BLOCKED' : 'UNBLOCKED'} successfully.`);
        setUserToBlock('');
    };

    const toggleUserStatus = (id) => {
        setUsers(users.map(user => 
            user.id === id 
                ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' } 
                : user
        ));
    };

    return (
        <div className="relative z-10 bg-gray-950 min-h-screen p-4 md:p-8 lg:p-10 space-y-8 text-white font-sans">
            
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-white">Administrator Panel</h2>
                {/* Fixed subtext to match second image if needed, or keep generic */}
                <p className="text-gray-400 mt-2">Manage users, system settings, and announcements</p>
            </div>
            
            {/* System Stats Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card title="Total Students" value={adminStats.totalStudents} icon={Users} colorClass="text-indigo-400" />
                <Card title="Total Teachers" value={adminStats.totalTeachers} icon={User} colorClass="text-green-400" />
                <Card title="Pending Enrollments" value={adminStats.pendingEnrollments} icon={Clock} colorClass="text-yellow-400" />
                <Card title="System Status" value={adminStats.systemStatus} icon={Settings} colorClass="text-emerald-400" />
            </div>

            {/* Core Admin Actions Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                
                {/* 1. Announcement Panel */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-4 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-white flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-yellow-400" /> Make Global Announcement
                    </h4>
                    <textarea
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        rows="3"
                        className="w-full rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500 transition-colors placeholder-gray-600"
                        placeholder="Enter announcement text for all users..."
                    />
                    <button 
                        onClick={handleAnnouncement} 
                        className="w-full py-2.5 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors shadow-lg shadow-yellow-600/20"
                    >
                        Post Announcement
                    </button>
                    
                    <div className="pt-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-3">Recent Announcements:</h5>
                        <ul className="space-y-2">
                            {announcements.map(a => (
                                <li key={a.id} className="p-3 bg-gray-950/30 rounded-md border-l-2 border-yellow-500 text-sm text-gray-300">
                                    <span className="font-bold text-white block text-xs mb-1">[{a.date}]</span> 
                                    {a.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 2. User Management Panel - REBUILT to match First Image */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-6 backdrop-blur-sm">
                    
                    {/* Block/Unblock Section */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white flex items-center">
                            <Lock className="h-5 w-5 mr-2 text-red-400" /> Block/Unblock User
                        </h4>
                        
                        <input
                            type="text"
                            value={userToBlock}
                            onChange={(e) => setUserToBlock(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-gray-950/50 px-4 py-3 text-white outline-none focus:border-indigo-500 placeholder-gray-600"
                            placeholder="Enter User ID or Email to Block/Unblock"
                        />
                        
                        {/* Two separate buttons layout */}
                        <div className="flex gap-4">
                            <button 
                                onClick={() => handleAction('block')}
                                className="w-1/2 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center shadow-lg shadow-red-600/20"
                            >
                                <Lock className="h-4 w-4 mr-2" /> Block User
                            </button>
                            <button 
                                onClick={() => handleAction('unblock')} 
                                className="w-1/2 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center shadow-lg shadow-green-600/20"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" /> Unblock User
                            </button>
                        </div>
                    </div>

                    {/* Teacher Allocation Section */}
                    <div className="pt-2">
                        <h4 className="text-xl font-semibold text-white flex items-center mb-2">
                            <Layers className="h-5 w-5 mr-2 text-indigo-400" /> Teacher Assignment Allocation
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">Current allocation: T001 gets MATH-101 & CS-205. This can be managed here.</p>
                    </div>
                </div>
            </div>

            {/* Registered Users Table */}
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-semibold text-white pt-4 border-t border-gray-800 mb-6">User Database ({users.length})</h3>
                <div className="overflow-hidden bg-gray-900/50 rounded-xl border border-gray-800 shadow-xl">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-950">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-800/40 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full ${user.role === 'Teacher' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`text-xs font-medium ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <button 
                                            onClick={() => toggleUserStatus(user.id)}
                                            className={`${user.status === 'Active' ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'} transition-colors text-xs font-bold uppercase tracking-wide`}
                                        >
                                            {user.status === 'Active' ? 'Block' : 'Unblock'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;