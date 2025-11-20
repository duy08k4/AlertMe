
import type React from "react"
import { Users, UserCheck, UserPlus, FileText } from "lucide-react"

interface DashboardCardProps {
    title: string
    value: number | string
    unit: string
    icon: React.ReactNode
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, unit, icon }) => (
    <div className="mainShadow bg-white p-5 rounded-lg flex items-center justify-between">
        <div className="flex flex-col gap-1">
            <h2 className="text-gray-500">{title}</h2>
            <p className="text-2xl font-bold">
                {value} <span className="text-sm font-normal">{unit}</span>
            </p>
        </div>
        <div className="text-gray-700">{icon}</div>
    </div>
)

interface StaffDashboardProps {
    totalStaff: number
    activeStaff: number
    newStaffThisMonth: number
    avgTasksPerStaff: number | string
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({
    totalStaff,
    activeStaff,
    newStaffThisMonth,
    avgTasksPerStaff,
}) => {
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
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
                <DashboardCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    unit={card.unit}
                    icon={card.icon}
                />
            ))}
        </div>
    )
}

export default StaffDashboard
