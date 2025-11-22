import type React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { UserMember } from "../../../../types/user.types";

interface UserTableProps {
  users: UserMember[];
  handleRowClick: (user: UserMember) => void;
  sortConfig: {
    key: keyof UserMember | null;
    direction: "ascending" | "descending";
  };
  requestSort: (key: keyof UserMember) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  handleRowClick,
  sortConfig,
  requestSort,
}) => {
  const SortableHeader = ({
    label,
    sortKey,
  }: {
    label: string;
    sortKey: keyof UserMember;
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
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Vai trò
            </th>
            <SortableHeader label="Ngày tham gia" sortKey="joinDate" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick(user)}
            >
              <td className="p-3 whitespace-nowrap">{index + 1}</td>
              <td className="p-3 whitespace-nowrap">{user.username}</td>
              <td className="p-3 whitespace-nowrap">{user.email}</td>
              <td className="p-3 whitespace-nowrap">{user.role}</td>
              <td className="p-3 whitespace-nowrap">{user.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
