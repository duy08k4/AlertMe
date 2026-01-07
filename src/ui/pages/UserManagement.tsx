
// Import libraries
import type React from "react";
import { useEffect, useState } from "react";
import { RefreshCw, Search, ArrowLeftCircle, ArrowRightCircle, UserRound, X, Trash2 } from 'lucide-react';
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { userService } from "../../service/user.serv";
import useDebounce from "../../hooks/Debounce";
import type { userData } from "../../redux/reducer/user";

// Main component
const UserManagement: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<userData | null>(null);

    const handleRowClick = (user: userData) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    // Search
    const [searchContent, setSearchContent] = useState<string>("")
    const debounceSearch = useDebounce(searchContent, 500)

    useEffect(() => {
        userService.getUser(page, debounceSearch)
    }, [debounceSearch])

    // User pagination
    const page = useSelector((state: RootState) => state.user.page)
    const maxPage = useSelector((state: RootState) => state.user.maxPage)
    const amountUser = useSelector((state: RootState) => state.user.amountUser)
    const paginationData = useSelector((state: RootState) => state.user.paginationData.data)

    useEffect(() => {
        (async () => {
            if (page) {
                await userService.getUser(page)
            }
        })()
    }, [page])


    const nextPage = async () => {
        await userService.getUser(page + 1, debounceSearch)
    }

    const prevPage = async () => {
        await userService.getUser(page - 1, debounceSearch)
    }

    const refreshData = async () => {
        await userService.getUser(1, debounceSearch)
    }

    const deleteStaff = async () => {
        if (selectedUser) {
            await userService.removeUser(selectedUser?.id, selectedUser.profilepic)
            setSelectedUser(null)
        }
    }

    return (
        <div className="h-full flex flex-col gap-4 overflow-hidden p-6 bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 w-full flex flex-col gap-6 overflow-y-auto">
                {/* User Table */}
                <div className="mainShadow bg-white p-4 rounded-lg flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-xl font-bold">Danh sách người dùng</h2>
                            <span className="text-gray-500 text-sm">({amountUser} người dùng)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên, email"
                                    value={searchContent}
                                    onChange={(e) => { setSearchContent(e.target.value) }}
                                    className="border-[0.5px] border-lightGray rounded-lg py-2 px-4 pl-10 focus:ring-2 focus:ring-mainRed focus:border-white outline-none"
                                />
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <div className="flex justify-end items-center space-x-2">
                                <button className="btn p-1 disabled:opacity-50" onClick={prevPage} disabled={page === 1}>
                                    <ArrowLeftCircle size={24} className="text-gray-600" />
                                </button>

                                <span className="text-sm font-medium text-gray-700">Trang {page} / {maxPage}</span>

                                <button className="btn p-1 disabled:opacity-50" onClick={nextPage} disabled={page === maxPage}>
                                    <ArrowRightCircle size={24} className="text-gray-600" />
                                </button>
                            </div>

                            <button className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors" onClick={refreshData}>
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">STT</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Họ tên</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Số điện thoại</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Vai trò</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Ngày tham gia</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {paginationData && paginationData.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleRowClick(user)}>
                                        <td className="p-3 whitespace-nowrap">{(index + 1) + (page - 1) * Math.ceil(amountUser / maxPage)}</td>
                                        <td className="p-3 whitespace-nowrap">{user.name}</td>
                                        <td className="p-3 whitespace-nowrap">{user.email}</td>
                                        <td className="p-3 whitespace-nowrap">{user.phone_number ? user.phone_number : "Chưa cập nhật"}</td>
                                        <td className="p-3 whitespace-nowrap">{user.role.name}</td>
                                        <td className="p-3 whitespace-nowrap">{new Date(user.created_at).toLocaleString("vi-VN")}</td>
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
                                <p className="text-md text-gray-500">{selectedUser.role.name}</p>
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
                                    <span className="text-sm font-medium text-gray-500">Tên người dùng</span>
                                    <p>{selectedUser.username || 'Chưa có thông tin'}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Email</span>
                                    <p>{selectedUser.email || 'Chưa có thông tin'}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Số điện thoại</span>
                                    <p>{selectedUser.phone_number || 'Chưa có thông tin'}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Vai trò</span>
                                    <p>{selectedUser.role?.name || 'Chưa có thông tin'}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Địa chỉ</span>
                                    <p>{selectedUser.address || 'Chưa có thông tin'}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Ngày tham gia</span>
                                    <p>{new Date(selectedUser.created_at).toLocaleString("vi-VN") || 'Chưa có thông tin'}</p>
                                </div>

                            </div>
                        </div>

                        {/* Footer/Actions */}
                        <div className="bg-white px-8 py-4 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4">

                            <button
                                onClick={deleteStaff}
                                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                            >
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
