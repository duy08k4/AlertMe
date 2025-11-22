import type React from "react";
import { Users, UserPlus, FileText } from "lucide-react";

interface UserDashboardProps {
  totalUsers: number;
  newUsersThisMonth: number;
  avgReportsPerUser: number | string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  totalUsers,
  newUsersThisMonth,
  avgReportsPerUser,
}) => {
  const dashboardCards = [
    {
      title: "Tổng user",
      value: totalUsers,
      unit: "user",
      icon: <Users size={32} />,
    },
    // {
    //   title: "Users đang hoạt động",
    //   value: activeUsers,
    //   unit: "user",
    //   icon: <UserCheck size={32} />,
    // },
    {
      title: "User mới (tháng này)",
      value: newUsersThisMonth,
      unit: "user",
      icon: <UserPlus size={32} />,
    },
    {
      title: "Báo cáo / user",
      value: avgReportsPerUser,
      unit: "báo cáo",
      icon: <FileText size={32} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardCards.map((card, index) => (
        <div
          key={index}
          className="mainShadow bg-white p-5 rounded-lg flex items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-500">{card.title}</h2>
            <p className="text-2xl font-bold">
              {card.value} <span className="text-sm font-normal">{card.unit}</span>
            </p>
          </div>
          <div className="text-gray-700">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
