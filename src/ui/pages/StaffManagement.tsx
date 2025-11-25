// Import libraries
import type React from "react";
import { useEffect, useState } from "react";
import { Download, RefreshCw, Search, ChevronDown, ChevronUp, Users, UserCheck, UserPlus, FileText, ArrowLeftCircle, ArrowRightCircle, UserRound, X, Lock, Trash2 } from 'lucide-react';
import StaffSignForm from "../components/StaffSignForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { staffService } from "../../service/staff.serv";
import useDebounce from "../../hooks/Debounce";
import type { staffData } from "../../redux/reducer/staff";

// Main component
const StaffManagement: React.FC = () => {
    const [selectedStaff, setSelectedStaff] = useState<(staffData) | null>(null);
    const [isAddStaffFormOpen, setIsAddStaffFormOpen] = useState(false);

    const handleRowClick = (staff: staffData) => {
        setSelectedStaff(staff);
    };

    const closeModal = () => {
        setSelectedStaff(null);
    };

    // Search
    const [searchContent, setSearchContent] = useState<string>("")
    const debounceSearch = useDebounce(searchContent, 500)

    useEffect(() => {
        staffService.getStaff(page, "staff", debounceSearch)
    }, [debounceSearch])

    // Staff data pagination
    const page = useSelector((state: RootState) => state.staff.page)
    const maxPage = useSelector((state: RootState) => state.staff.maxPage)
    const amountStaff = useSelector((state: RootState) => state.staff.amountStaff)
    const paginationData = useSelector((state: RootState) => state.staff.paginationData.data)

    useEffect(() => {
        (async () => {
            if (page) {
                await staffService.getStaff(page, "staff")
            }
        })()
    }, [page])


    const nextPage = async () => {
        await staffService.getStaff(page + 1, "staff", debounceSearch)
    }

    const prevPage = async () => {
        await staffService.getStaff(page - 1, "staff", debounceSearch)
    }

    const deleteStaff = async () => {
        if (selectedStaff) {
            await staffService.deleteStaff(selectedStaff?.id, selectedStaff.profilepic)
        }
    }

    return (
        <div className="h-full flex flex-col gap-4 overflow-hidden p-6 bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 w-full flex flex-col gap-6 overflow-y-auto">

                {/* Staff Table */}
                <div className="flex-1 h-0 mainShadow bg-white p-4 rounded-lg flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-xl font-bold">Danh sách nhân viên</h2>
                            <span className="text-gray-500 text-sm">({amountStaff} nhân viên)</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button onClick={() => setIsAddStaffFormOpen(true)} className="bg-mainRed text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:grayscale-[15%] cursor-pointer transition-colors">
                                Thêm nhân viên
                            </button>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchContent}
                                    onChange={(e) => { setSearchContent(e.target.value) }}
                                    className="border rounded-lg py-2 px-4 pl-10 focus:ring-2 focus:ring-mainRed focus:border-white outline-none"
                                />
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>

                            <div className="flex justify-end items-center space-x-2">
                                <button className="btn p-1 disabled:opacity-50" onClick={prevPage} disabled={page === 1}>
                                    <ArrowLeftCircle size={24} className="" />
                                </button>

                                <span className="text-sm font-medium text-gray-700">Trang {page} / {maxPage}</span>

                                <button className="btn p-1 disabled:opacity-50" onClick={nextPage} disabled={page === maxPage}>
                                    <ArrowRightCircle size={24} className="" />
                                </button>
                            </div>

                            <button className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors">
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto relative">
                            <thead className="sticky top-0 left-0">
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Thứ tự</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Họ tên</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Số điện thoại</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Ngày tham gia</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Nhiệm vụ được giao</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Đã hoàn thành</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 overflow-auto">
                                {paginationData && paginationData.map((staff, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { handleRowClick(staff) }}>
                                            <td className="p-3 whitespace-nowrap">{(index + 1) + (page - 1) * Math.ceil(amountStaff / maxPage)}</td>
                                            <td className="p-3 whitespace-nowrap">{staff.username}</td>
                                            <td className="p-3 whitespace-nowrap">{staff.email}</td>
                                            <td className="p-3 whitespace-nowrap">{staff.phone_number || "___"}</td>
                                            <td className="p-3 whitespace-nowrap">{new Date(staff.created_at).toLocaleString("vi-VN")}</td>
                                            <td className="p-3 whitespace-nowrap">{staff.task_given}</td>
                                            <td className="p-3 whitespace-nowrap">{staff.task_completed}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Staff Detail Modal */}
            {selectedStaff && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="bg-white py-6 px-8 rounded-t-xl border-b border-gray-200 flex items-center space-x-6 relative">
                            <div className="mainShadow h-[100px] aspect-square rounded-full">
                                <img src={selectedStaff.profilepic} alt={selectedStaff.username} loading="lazy" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">Nhân viên: {selectedStaff.username}</h2>
                                <p className="text-csSmall text-gray font-medium"><b>Ngày tham gia:</b> {new Date(selectedStaff.created_at).toLocaleString("vi-VN")}</p>

                                <span className="h-fit w-full flex items-center-safe gap-10">
                                    <p className="font-medium text-csSmall text-mainRed bg-mainRedRGB px-2.5"><b className="">Nhiêm vụ được giao: </b>{selectedStaff.task_given}</p>
                                    <p className="font-medium text-csSmall text-mainRed bg-mainRedRGB px-2.5"><b className="">Đã hoàn thành: </b>{selectedStaff.task_completed}</p>
                                </span>
                            </div>

                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="py-8 px-10">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Thông tin chi tiết</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7 text-gray-800">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Email</span>
                                    <p className="font-medium">{selectedStaff.email}</p>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Số điện thoại</span>
                                    <p className="font-medium">{selectedStaff.phone_number ? selectedStaff.phone_number : "Chưa cung cấp"}</p>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Địa chỉ</span>
                                    <p className="font-medium">{selectedStaff.address ? selectedStaff.address : "Chưa cung cấp"}</p>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Thành phố</span>
                                    <p className="font-medium">{selectedStaff.city ? selectedStaff.city : "Chưa cung cấp"}</p>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Tỉnh/Khu vực</span>
                                    <p className="font-medium">{selectedStaff.state ? selectedStaff.state : "Chưa cung cấp"}</p>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Mã bưu điện</span>
                                    <p className="font-medium">{selectedStaff.postal_code ? selectedStaff.postal_code : "Chưa cung cấp"}</p>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Quốc gia</span>
                                    <p className="font-medium">{selectedStaff.country ? selectedStaff.country : "Chưa cung cấp"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer/Actions */}
                        <div className="bg-white px-8 py-5 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4">
                            <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold" onClick={deleteStaff}>
                                <Trash2 size={16} />
                                <span>Xóa nhân viên</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Staff sign form */}
            {isAddStaffFormOpen && <StaffSignForm onClose={() => setIsAddStaffFormOpen(false)} />}
        </div>);
}

export default StaffManagement;