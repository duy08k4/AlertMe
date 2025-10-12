
// Import libraries
import type React from "react";
import { useState } from "react";
import { Download, RefreshCw, Search, ChevronDown, ChevronUp, Users, UserCheck, UserPlus, FileText, ArrowLeftCircle, ArrowRightCircle, UserRound, X, Lock, Trash2 } from 'lucide-react';

// Mock data for users
const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0123456789', role: 'Admin', status: 'Hoạt động', joinDate: '2023-01-15', reports: 12, cccd: '123456789012', address: '123 Đường ABC, Quận 1, TP. HCM' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0987654321', role: 'User', status: 'Bị khóa', joinDate: '2023-03-22', reports: 5, cccd: '210987654321', address: '456 Đường XYZ, Quận 2, TP. HCM' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', phone: '0123987456', role: 'User', status: 'Hoạt động', joinDate: '2023-05-10', reports: 8, cccd: '321654987012', address: '789 Đường DEF, Quận 3, TP. HCM' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', phone: '0321654987', role: 'Staff', status: 'Hoạt động', joinDate: '2024-09-01', reports: 2, cccd: '456789012321', address: '101 Đường GHI, Quận 4, TP. HCM' },
    { id: 5, name: 'Võ Văn E', email: 'vovane@example.com', phone: '0912345678', role: 'User', status: 'Hoạt động', joinDate: '2024-10-01', reports: 1, cccd: '567890123456', address: '212 Đường JKL, Quận 5, TP. HCM' },
];

// Main component
const UserManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof users[0] | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
    const [selectedUser, setSelectedUser] = useState<(typeof users[0] & { cccd: string; address: string }) | null>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const requestSort = (key: keyof typeof users[0]) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.cccd.includes(searchTerm)
    );

    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'Hoạt động').length;
    const newUsersThisMonth = users.filter(u => {
        const joinDate = new Date(u.joinDate);
        const now = new Date();
        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length;
    const totalReports = users.reduce((acc, u) => acc + u.reports, 0);
    const avgReportsPerUser = totalUsers > 0 ? (totalReports / totalUsers).toFixed(2) : 0;

    const dashboardCards = [
        { title: "Tổng user", value: totalUsers, unit: "user", icon: <Users size={32} /> },
        { title: "Users đang hoạt động", value: activeUsers, unit: "user", icon: <UserCheck size={32} /> },
        { title: "User mới (tháng này)", value: newUsersThisMonth, unit: "user", icon: <UserPlus size={32} /> },
        { title: "Báo cáo / user", value: avgReportsPerUser, unit: "báo cáo", icon: <FileText size={32} /> },
    ];

    const handleRowClick = (user: typeof users[0]) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const SortableHeader = ({ label, sortKey }: { label: string; sortKey: keyof typeof users[0] }) => (
        <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => requestSort(sortKey)}>
            <div className="flex items-center">
                {label}
                {sortConfig.key === sortKey ? (
                    sortConfig.direction === 'ascending' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                ) : <div className="w-4 ml-1"></div>}
            </div>
        </th>
    );

    return (
        <div className="h-full flex flex-col gap-4 overflow-hidden p-6 bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-black text-2xl capitalize">Quản lý người dùng</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full flex flex-col gap-6 overflow-y-auto">
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardCards.map((card, index) => (
                        <div key={index} className="mainShadow bg-white p-5 rounded-lg flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-gray-500">{card.title}</h2>
                                <p className="text-2xl font-bold">{card.value} <span className="text-sm font-normal">{card.unit}</span></p>
                            </div>
                            <div className="text-gray-700">
                                {card.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Table */}
                <div className="mainShadow bg-white p-4 rounded-lg flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-xl font-bold">Danh sách người dùng</h2>
                            <span className="text-gray-500 text-sm">({filteredUsers.length} người dùng)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="border rounded-lg py-2 px-4 pl-10 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <div className="flex justify-end items-center space-x-2">
                                <button className="btn p-1 disabled:opacity-50" disabled>
                                    <ArrowLeftCircle size={24} className="text-gray-600" />
                                </button>
                                <span className="text-sm font-medium text-gray-700">Trang 1 / 1</span>
                                <button className="btn p-1 disabled:opacity-50" disabled>
                                    <ArrowRightCircle size={24} className="text-gray-600" />
                                </button>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors">
                                <Download size={18} />
                                <span>Tải file</span>
                            </button>
                            <button className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors">
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Họ tên</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Số điện thoại</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Vai trò</th>
                                    <SortableHeader label="Trạng thái" sortKey="status" />
                                    <SortableHeader label="Ngày tham gia" sortKey="joinDate" />
                                    <SortableHeader label="Số báo cáo" sortKey="reports" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredUsers.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleRowClick(user)}>
                                        <td className="p-3 whitespace-nowrap">{index + 1}</td>
                                        <td className="p-3 whitespace-nowrap">{user.name}</td>
                                        <td className="p-3 whitespace-nowrap">{user.email}</td>
                                        <td className="p-3 whitespace-nowrap">{user.phone}</td>
                                        <td className="p-3 whitespace-nowrap">{user.role}</td>
                                        <td className="p-3 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-3 whitespace-nowrap">{user.joinDate}</td>
                                        <td className="p-3 whitespace-nowrap">{user.reports}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
                    <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="bg-white p-6 rounded-t-xl border-b border-gray-200 flex items-center space-x-6 relative">
                            <div className="p-4 bg-blue-100 rounded-full">
                                <UserRound size={48} className="text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h2>
                                <p className="text-md text-gray-500">{selectedUser.role}</p>
                            </div>
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông tin chi tiết</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-800">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Email</span>
                                    <p>{selectedUser.email}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Số điện thoại</span>
                                    <p>{selectedUser.phone}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">CCCD</span>
                                    <p>{selectedUser.cccd}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Địa chỉ</span>
                                    <p>{selectedUser.address}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Trạng thái</span>
                                    <p>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${selectedUser.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {selectedUser.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer/Actions */}
                        <div className="bg-white px-8 py-4 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4">
                            <button className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
                                <Lock size={16} />
                                <span>Khóa tài khoản</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                                <Trash2 size={16} />
                                <span>Xóa user</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;
