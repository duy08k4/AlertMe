import type React from "react";
import {
  Download,
  RefreshCw,
  Search,
  ArrowLeftCircle,
  ArrowRightCircle,
  X,
} from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import { useUserManagement } from "../../../hooks/useUserManagement";
import UserDashboard from "./components/UserDashboard";
import UserTable from "./components/UserTable";
import EditUserModal from "./components/EditUserModal";
import UserDetailsModal from "./components/UserDetailsModal";
import type { UserMember } from "../../../types/user.types";

const UserManagement: React.FC = () => {
  const {
    loading,
    error,
    searchTerm,
    sortConfig,
    selectedUser,
    showEditModal,
    editLoading,
    editError,
    editUserData,
    showDeleteConfirm,
    fetchUserData,
    handleDeleteUser,
    executeDeleteUser,
    handleEditClick,
    handleEditInputChange,
    handleUpdateUser,
    handleSearch,
    requestSort,
    filteredUsers,
    totalUsers,
    newUsersThisMonth,
    avgReportsPerUser,
    setSelectedUser,
    setShowEditModal,
    setShowDeleteConfirm,
  } = useUserManagement();

  const handleRowClick = (user: UserMember) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-black text-2xl capitalize">
          Quản lý người dùng
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
              onClick={fetchUserData}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Thử lại
            </button>
          </div>
        )}

        {/* Dashboard Cards */}
        {!loading && !error && (
          <UserDashboard
            totalUsers={totalUsers}
            // activeUsers={activeUsers}
            newUsersThisMonth={newUsersThisMonth}
            avgReportsPerUser={avgReportsPerUser}
          />
        )}

        {/* User Table */}
        {!loading && !error && (
          <div className="mainShadow bg-white p-4 rounded-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">Danh sách người dùng</h2>
                <span className="text-gray-500 text-sm">
                  ({filteredUsers.length} người dùng)
                </span>
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
                <button
                  onClick={fetchUserData}
                  className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                  title="Làm mới dữ liệu"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>

            <UserTable
              users={filteredUsers}
              handleRowClick={handleRowClick}
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
          </div>
        )}
      </div>

      {selectedUser && (
        <EditUserModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editLoading={editLoading}
          editError={editError}
          editUserData={editUserData}
          handleEditInputChange={handleEditInputChange}
          handleUpdateUser={handleUpdateUser}
          userEmail={selectedUser?.email || ""}
        />
      )}

      {selectedUser && !showEditModal && (
        <UserDetailsModal
          selectedUser={selectedUser}
          closeModal={closeModal}
          handleEditClick={handleEditClick}
          handleDeleteUser={handleDeleteUser}
        />
      )}

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={executeDeleteUser}
        title="Xóa người dùng"
        message={`Bạn có chắc chắn muốn xóa người dùng ${selectedUser?.username}? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
};

export default UserManagement;
