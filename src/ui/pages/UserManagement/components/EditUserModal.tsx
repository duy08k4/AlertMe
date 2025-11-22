import type React from "react";
import { X, Save, RefreshCw } from "lucide-react";

interface EditUserModalProps {
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  editLoading: boolean;
  editError: string | null;
  editUserData: {
    username: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    profilepic: string;
  };
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateUser: () => void;
  userEmail: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  showEditModal,
  setShowEditModal,
  editLoading,
  editError,
  editUserData,
  handleEditInputChange,
  handleUpdateUser,
  userEmail,
}) => {
  if (!showEditModal) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShowEditModal(false)}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Chỉnh sửa thông tin
          </h2>
          <button
            onClick={() => setShowEditModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {editError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {editError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userEmail}
                disabled
                className="border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editUserData.username}
                onChange={handleEditInputChange}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
             <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone_number"
                value={editUserData.phone_number}
                onChange={handleEditInputChange}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
             <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={editUserData.address}
                onChange={handleEditInputChange}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
             <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Thành phố
              </label>
              <input
                type="text"
                name="city"
                value={editUserData.city}
                onChange={handleEditInputChange}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
             <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Quốc gia
              </label>
              <input
                type="text"
                name="country"
                value={editUserData.country}
                onChange={handleEditInputChange}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateUser}
            disabled={editLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {editLoading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save size={18} />
                Lưu thay đổi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
