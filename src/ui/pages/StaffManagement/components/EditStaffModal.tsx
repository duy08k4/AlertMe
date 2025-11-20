import type React from "react";
import { Edit, X, RefreshCw } from "lucide-react";

import type { StaffUpdateRequest } from "../../../../types/staff.types";

interface EditStaffModalProps {
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  editLoading: boolean;
  editError: string | null;
  editStaffData: StaffUpdateRequest;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateStaff: () => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  showEditModal,
  setShowEditModal,
  editLoading,
  editError,
  editStaffData,
  handleEditInputChange,
  handleUpdateStaff,
}) => {
  if (!showEditModal) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShowEditModal(false)}
    >
      <div
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white p-6 rounded-t-xl border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Edit size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Sửa thông tin nhân viên
            </h2>
          </div>
          <button
            onClick={() => setShowEditModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {editError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-3">
              <X size={20} className="text-red-500" />
              <p className="text-red-600">{editError}</p>
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
                value={editStaffData.email}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
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
                value={editStaffData.name}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={editStaffData.username}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
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
                value={editStaffData.phone_number}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
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
                value={editStaffData.address}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
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
                value={editStaffData.city}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
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
                value={editStaffData.state}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
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
                value={editStaffData.postal_code}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="200000"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Quốc gia
              </label>
              <input
                type="text"
                name="country"
                value={editStaffData.country}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
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
                value={editStaffData.profilepic}
                onChange={handleEditInputChange}
                className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-8 py-4 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4 sticky bottom-0">
          <button
            onClick={() => setShowEditModal(false)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            disabled={editLoading}
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateStaff}
            disabled={
              editLoading ||
              !editStaffData.email ||
              !editStaffData.name ||
              !editStaffData.username ||
              !editStaffData.phone_number
            }
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {editLoading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Đang cập nhật...</span>
              </>
            ) : (
              <>
                <Edit size={16} />
                <span>Cập nhật</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStaffModal;
