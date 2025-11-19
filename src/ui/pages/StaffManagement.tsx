// Import libraries
import type React from "react";
import { useState, useEffect } from "react";
import {
  Download,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  UserCheck,
  UserPlus,
  FileText,
  ArrowLeftCircle,
  ArrowRightCircle,
  UserRound,
  X,
  Lock,
  Trash2,
} from "lucide-react";
import api from "../../configs/gateway";
import type {
  StaffMember,
  StaffListApiResponse,
  StaffApiResponse,
} from "../../types/staff.types";
import { ROLE_MAP, STATUS_MAP } from "../../types/staff.types";

// Transform API response to component format
const transformStaffData = (apiStaff: StaffApiResponse): StaffMember => {
  return {
    id: apiStaff.id,
    name: apiStaff.name,
    email: apiStaff.email,
    phone: apiStaff.profile?.phone_number || "N/A",
    role: ROLE_MAP[apiStaff.role_id] || "Nhân viên",
    status: STATUS_MAP.ACTIVE, // Default status, adjust based on your logic
    joinDate: new Date(apiStaff.created_at).toISOString().split("T")[0],
    tasks: apiStaff.task_given,
    taskCompleted: apiStaff.task_completed,
    staffId: apiStaff.id.substring(0, 8).toUpperCase(),
    address: apiStaff.profile?.address,
    city: apiStaff.profile?.city,
    state: apiStaff.profile?.state,
    postalCode: apiStaff.profile?.postal_code,
    country: apiStaff.profile?.country,
    profilePic: apiStaff.profile?.profilepic,
    username: apiStaff.profile?.username,
  };
};

// Main component
const StaffManagement: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof StaffMember | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Add staff modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [newStaffData, setNewStaffData] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    profilepic: "",
  });

  // Fetch staff data from API
  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<StaffListApiResponse>("/staff");
      const transformedData = response.data.data.map(transformStaffData);
      setStaffMembers(transformedData);
    } catch (err) {
      console.error("Error fetching staff data:", err);
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Không thể tải danh sách nhân viên",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async () => {
    try {
      setAddLoading(true);
      setAddError(null);
      await api.post("/auth/staff/sign-up", newStaffData);
      // Refresh the staff list
      await fetchStaffData();
      // Close modal and reset form
      setShowAddModal(false);
      setNewStaffData({
        email: "",
        name: "",
        password: "",
        username: "",
        phone_number: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        profilepic: "",
      });
    } catch (err) {
      console.error("Error adding staff:", err);
      const error = err as { response?: { data?: { message?: string } } };
      setAddError(error.response?.data?.message || "Không thể thêm nhân viên");
    } finally {
      setAddLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStaffData({
      ...newStaffData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const requestSort = (key: keyof StaffMember) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedStaff = [...staffMembers].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue !== undefined && bValue !== undefined) {
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
    }
    return 0;
  });

  const filteredStaff = sortedStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm) ||
      staff.staffId.includes(searchTerm),
  );

  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter(
    (u) => u.status === "Hoạt động",
  ).length;
  const newStaffThisMonth = staffMembers.filter((u) => {
    const joinDate = new Date(u.joinDate);
    const now = new Date();
    return (
      joinDate.getMonth() === now.getMonth() &&
      joinDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const totalTasks = staffMembers.reduce((acc, u) => acc + u.tasks, 0);
  const avgTasksPerStaff =
    totalStaff > 0 ? (totalTasks / totalStaff).toFixed(2) : 0;

  const dashboardCards = [
    {
      title: "Tổng nhân viên",
      value: totalStaff,
      unit: "nhân viên",
      icon: <Users size={32} />,
    },
    {
      title: "Nhân viên đang hoạt động",
      value: activeStaff,
      unit: "nhân viên",
      icon: <UserCheck size={32} />,
    },
    {
      title: "Nhân viên mới (tháng này)",
      value: newStaffThisMonth,
      unit: "nhân viên",
      icon: <UserPlus size={32} />,
    },
    {
      title: "Nhiệm vụ / nhân viên",
      value: avgTasksPerStaff,
      unit: "nhiệm vụ",
      icon: <FileText size={32} />,
    },
  ];

  const handleRowClick = (staff: StaffMember) => {
    setSelectedStaff(staff);
  };

  const closeModal = () => {
    setSelectedStaff(null);
  };

  const SortableHeader = ({
    label,
    sortKey,
  }: {
    label: string;
    sortKey: keyof StaffMember;
  }) => (
    <th
      className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        {sortConfig.key === sortKey ? (
          sortConfig.direction === "ascending" ? (
            <ChevronUp size={16} className="ml-1" />
          ) : (
            <ChevronDown size={16} className="ml-1" />
          )
        ) : (
          <div className="w-4 ml-1"></div>
        )}
      </div>
    </th>
  );

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-black text-2xl capitalize">
          Quản lý nhân viên
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col gap-6 overflow-y-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw size={32} className="animate-spin text-blue-500" />
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-red-500">
                <X size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Lỗi</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
            <button
              onClick={fetchStaffData}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Thử lại
            </button>
          </div>
        )}

        {/* Dashboard Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <div
                key={index}
                className="mainShadow bg-white p-5 rounded-lg flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-gray-500">{card.title}</h2>
                  <p className="text-2xl font-bold">
                    {card.value}{" "}
                    <span className="text-sm font-normal">{card.unit}</span>
                  </p>
                </div>
                <div className="text-gray-700">{card.icon}</div>
              </div>
            ))}
          </div>
        )}

        {/* Staff Table */}
        {!loading && !error && (
          <div className="mainShadow bg-white p-4 rounded-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">Danh sách nhân viên</h2>
                <span className="text-gray-500 text-sm">
                  ({filteredStaff.length} nhân viên)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors font-semibold"
                >
                  <UserPlus size={18} />
                  <span>Thêm nhân viên</span>
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border rounded-lg py-2 px-4 pl-10 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="flex justify-end items-center space-x-2">
                  <button className="btn p-1 disabled:opacity-50" disabled>
                    <ArrowLeftCircle size={24} className="text-gray-600" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    Trang 1 / 1
                  </span>
                  <button className="btn p-1 disabled:opacity-50" disabled>
                    <ArrowRightCircle size={24} className="text-gray-600" />
                  </button>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors">
                  <Download size={18} />
                  <span>Tải file</span>
                </button>
                <button
                  onClick={fetchStaffData}
                  className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                  title="Làm mới dữ liệu"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Họ tên
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Số điện thoại
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <SortableHeader label="Trạng thái" sortKey="status" />
                    <SortableHeader label="Ngày tham gia" sortKey="joinDate" />
                    <SortableHeader label="Số nhiệm vụ" sortKey="tasks" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStaff.map((staff, index) => (
                    <tr
                      key={staff.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleRowClick(staff)}
                    >
                      <td className="p-3 whitespace-nowrap">{index + 1}</td>
                      <td className="p-3 whitespace-nowrap">{staff.name}</td>
                      <td className="p-3 whitespace-nowrap">{staff.email}</td>
                      <td className="p-3 whitespace-nowrap">{staff.phone}</td>
                      <td className="p-3 whitespace-nowrap">{staff.role}</td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${staff.status === "Hoạt động" ? "bg-green-100 text-green-800" : staff.status === "Nghỉ phép" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                        >
                          {staff.status}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {staff.joinDate}
                      </td>
                      <td className="p-3 whitespace-nowrap">{staff.tasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white p-6 rounded-t-xl border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <UserPlus size={32} className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Thêm nhân viên mới
                </h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8">
              {addError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-3">
                  <X size={20} className="text-red-500" />
                  <p className="text-red-600">{addError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newStaffData.email}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="staff@example.com"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newStaffData.name}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={newStaffData.password}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Tối thiểu 6 ký tự"
                    required
                    minLength={6}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Tên đăng nhập <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={newStaffData.username}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="staff001"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={newStaffData.phone_number}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="+84123456789"
                    required
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={newStaffData.address}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="123 Đường ABC"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Thành phố
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={newStaffData.city}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Hồ Chí Minh"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Tỉnh/Bang
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={newStaffData.state}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="TP.HCM"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Mã bưu điện
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={newStaffData.postal_code}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="700000"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Quốc gia
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={newStaffData.country}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Việt Nam"
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    URL ảnh đại diện
                  </label>
                  <input
                    type="url"
                    name="profilepic"
                    value={newStaffData.profilepic}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white px-8 py-4 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4 sticky bottom-0">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                disabled={addLoading}
              >
                Hủy
              </button>
              <button
                onClick={handleAddStaff}
                disabled={
                  addLoading ||
                  !newStaffData.email ||
                  !newStaffData.name ||
                  !newStaffData.password ||
                  newStaffData.password.length < 6 ||
                  !newStaffData.username ||
                  !newStaffData.phone_number
                }
                className="bg-red-500 text-white! px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {addLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Đang thêm...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    <span>Thêm nhân viên</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white p-6 rounded-t-xl border-b border-gray-200 flex items-center space-x-6 relative">
              <div className="p-4 bg-blue-100 rounded-full">
                <UserRound size={48} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedStaff.name}
                </h2>
                <p className="text-md text-gray-500">{selectedStaff.role}</p>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Thông tin chi tiết
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-800">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Email
                  </span>
                  <p>{selectedStaff.email}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Số điện thoại
                  </span>
                  <p>{selectedStaff.phone}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Mã nhân viên
                  </span>
                  <p>{selectedStaff.staffId}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Tên đăng nhập
                  </span>
                  <p>{selectedStaff.username || "N/A"}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Địa chỉ
                  </span>
                  <p>{selectedStaff.address || "N/A"}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Thành phố
                  </span>
                  <p>{selectedStaff.city || "N/A"}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Nhiệm vụ hoàn thành
                  </span>
                  <p>
                    {selectedStaff.taskCompleted} / {selectedStaff.tasks}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </span>
                  <p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${selectedStaff.status === "Hoạt động" ? "bg-green-100 text-green-800" : selectedStaff.status === "Nghỉ phép" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      {selectedStaff.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer/Actions */}
            <div className="bg-white px-8 py-4 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4">
              <button className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
                <Lock size={16} />
                <span>Đình chỉ</span>
              </button>
              <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                <Trash2 size={16} />
                <span>Xóa nhân viên</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
