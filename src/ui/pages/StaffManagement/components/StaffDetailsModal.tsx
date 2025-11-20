import type React from "react";
import { UserRound, X, Trash2, Edit } from "lucide-react";
import type { StaffMember } from "../../../../types/staff.types";

interface StaffDetailsModalProps {
  selectedStaff: StaffMember | null;
  closeModal: () => void;
  handleEditClick: () => void;
  handleDeleteStaff: () => void;
}

const StaffDetailsModal: React.FC<StaffDetailsModalProps> = ({
  selectedStaff,
  closeModal,
  handleEditClick,
  handleDeleteStaff,
}) => {
  if (!selectedStaff) return null;

  return (
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
              <span className="text-sm font-medium text-gray-500">Email</span>
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
              <span className="text-sm font-medium text-gray-500">Địa chỉ</span>
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
                  className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                    selectedStaff.status === "Hoạt động"
                      ? "bg-green-100 text-green-800"
                      : selectedStaff.status === "Nghỉ phép"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedStaff.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer/Actions */}
        <div className="bg-white px-8 py-4 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={handleEditClick}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            <Edit size={16} />
            <span>Sửa thông tin</span>
          </button>
          <button
            onClick={handleDeleteStaff}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            <Trash2 size={16} />
            <span>Xóa nhân viên</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsModal;
