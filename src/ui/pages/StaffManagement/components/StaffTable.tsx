import type React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { StaffMember } from "../../../../types/staff.types";

const SortableHeader = ({
  label,
  sortKey,
  sortConfig,
  requestSort,
}: {
  label: string;
  sortKey: keyof StaffMember;
  sortConfig: {
    key: keyof StaffMember | null;
    direction: "ascending" | "descending";
  };
  requestSort: (key: keyof StaffMember) => void;
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

interface StaffTableProps {
  staff: StaffMember[];
  handleRowClick: (staff: StaffMember) => void;
  sortConfig: {
    key: keyof StaffMember | null;
    direction: "ascending" | "descending";
  };
  requestSort: (key: keyof StaffMember) => void;
}

const StaffTable: React.FC<StaffTableProps> = ({
  staff,
  handleRowClick,
  sortConfig,
  requestSort,
}) => {
  return (
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
            <SortableHeader
              label="Trạng thái"
              sortKey="status"
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
            <SortableHeader
              label="Ngày tham gia"
              sortKey="joinDate"
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
            <SortableHeader
              label="Số nhiệm vụ"
              sortKey="tasks"
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {staff.map((staffMember, index) => (
            <tr
              key={staffMember.id}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick(staffMember)}
            >
              <td className="p-3 whitespace-nowrap">{index + 1}</td>
              <td className="p-3 whitespace-nowrap">{staffMember.name}</td>
              <td className="p-3 whitespace-nowrap">{staffMember.email}</td>
              <td className="p-3 whitespace-nowrap">{staffMember.phone}</td>
              <td className="p-3 whitespace-nowrap">{staffMember.role}</td>
              <td className="p-3 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    staffMember.status === "Hoạt động"
                      ? "bg-green-100 text-green-800"
                      : staffMember.status === "Nghỉ phép"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {staffMember.status}
                </span>
              </td>
              <td className="p-3 whitespace-nowrap">{staffMember.joinDate}</td>
              <td className="p-3 whitespace-nowrap">{staffMember.tasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
