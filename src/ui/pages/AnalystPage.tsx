// Import libraries
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Types
type analystLimitation_type = {
    label: string,
    value: string
}

type dashboardCard_type = {
    title: string,
    value: string,
    unit: string,
    changeRate_title: string,
    changeRate: string,
    trend: "up" | "down",
    color: "text-mainRed" | "text-lime"
}

type ChartDataSet = {
    report: any[];
    reportAndSOS: any[];
    traffic: any[];
    avgResponse: any[];
};

// --- HARDCODED MOCK DATA ---

// HOURLY DATA
const hourlyData: ChartDataSet = {
    report: Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, 'Báo cáo': Math.floor(Math.random() * 20) + 5, 'Đã giải quyết': Math.floor(Math.random() * 15) })),
    reportAndSOS: Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, 'Báo cáo': Math.floor(Math.random() * 20) + 5, 'SOS': Math.floor(Math.random() * 5) })),
    traffic: Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, 'Tai nạn': Math.floor(Math.random() * 5), 'Sụt lún': Math.floor(Math.random() * 2), 'Ùn tắc': Math.floor(Math.random() * 10), 'Đèn tín hiệu': Math.floor(Math.random() * 3), 'Khác': Math.floor(Math.random() * 4) })),
    avgResponse: Array.from({ length: 24 }, (_, i) => ({ time: `${i}:00`, 'Thời gian (phút)': Math.floor(Math.random() * 30) + 10 }))
};

// 7-DAY DATA
const daily7DayData: ChartDataSet = {
    report: Array.from({ length: 7 }, (_, i) => ({ name: `Ngày ${i + 1}`, 'Báo cáo': Math.floor(Math.random() * 150) + 50, 'Đã giải quyết': Math.floor(Math.random() * 120) })),
    reportAndSOS: Array.from({ length: 7 }, (_, i) => ({ name: `Ngày ${i + 1}`, 'Báo cáo': Math.floor(Math.random() * 150) + 50, 'SOS': Math.floor(Math.random() * 20) })),
    traffic: Array.from({ length: 7 }, (_, i) => ({ name: `Ngày ${i + 1}`, 'Tai nạn': Math.floor(Math.random() * 20), 'Sụt lún': Math.floor(Math.random() * 5), 'Ùn tắc': Math.floor(Math.random() * 30), 'Đèn tín hiệu': Math.floor(Math.random() * 10), 'Khác': Math.floor(Math.random() * 15) })),
    avgResponse: Array.from({ length: 7 }, (_, i) => ({ time: `Ngày ${i + 1}`, 'Thời gian (phút)': Math.floor(Math.random() * 45) + 15 }))
};

// 30-DAY DATA
const daily30DayData: ChartDataSet = {
    report: Array.from({ length: 30 }, (_, i) => ({ name: `Ngày ${i + 1}`, 'Báo cáo': Math.floor(Math.random() * 160) + 40, 'Đã giải quyết': Math.floor(Math.random() * 130) })),
    reportAndSOS: Array.from({ length: 30 }, (_, i) => ({ name: `Ngày ${i + 1}`, 'Báo cáo': Math.floor(Math.random() * 160) + 40, 'SOS': Math.floor(Math.random() * 25) })),
    traffic: Array.from({ length: 30 }, (_, i) => ({ name: `Ngày ${i + 1}`, 'Tai nạn': Math.floor(Math.random() * 25), 'Sụt lún': Math.floor(Math.random() * 8), 'Ùn tắc': Math.floor(Math.random() * 35), 'Đèn tín hiệu': Math.floor(Math.random() * 12), 'Khác': Math.floor(Math.random() * 20) })),
    avgResponse: Array.from({ length: 30 }, (_, i) => ({ time: `Ngày ${i + 1}`, 'Thời gian (phút)': Math.floor(Math.random() * 50) + 10 }))
};


// Main component
const AnalystPage: React.FC = () => {
    // State for dropdown and date picker
    const [selectedLimitation, setSelectedLimitation] = useState("today");
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [chartData, setChartData] = useState<ChartDataSet>(hourlyData);
    const [chartTitle, setChartTitle] = useState("theo giờ");

    // Analyst's limitation
    const analystLimitation: analystLimitation_type[] = [
        { label: "Hôm nay", value: "today" },
        { label: "24 giờ qua", value: "in24h" },
        { label: "7 ngày qua", value: "in7d" },
        { label: "30 ngày qua", value: "in30d" },
        { label: "Chọn ngày", value: "day" },
    ]

    useEffect(() => {
        const isHourly = ['today', 'in24h', 'day'].includes(selectedLimitation);
        
        if (isHourly) {
            setChartData(hourlyData);
            setChartTitle("theo giờ");
        } else if (selectedLimitation === 'in7d') {
            setChartData(daily7DayData);
            setChartTitle("theo ngày (7 ngày qua)");
        } else if (selectedLimitation === 'in30d') {
            setChartData(daily30DayData);
            setChartTitle("theo ngày (30 ngày qua)");
        }
    }, [selectedLimitation, selectedDate]);


    const handleLimitationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedLimitation(value);
        if (value === 'day') {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    // Dashboard card
    const dashboardCard: dashboardCard_type[] = [
        { title: "Tổng số báo cáo", value: "1,000", unit: "báo cáo", changeRate_title: "So với tháng trước", changeRate: "8.2", trend: "up", color: "text-lime" },
        { title: "Nhân viên hoạt động", value: "1,000", unit: "nhân viên", changeRate_title: "Hiệu suất", changeRate: "95", trend: "up", color: "text-lime" },
        { title: "Đã giải quyết hôm nay", value: "900", unit: "báo cáo", changeRate_title: "Tỷ lệ hoàn thành", changeRate: "90", trend: "up", color: "text-lime" },
        { title: "Thời gian trung bình xử lý sự cố", value: "25", unit: "phút", changeRate_title: "Cải thiện", changeRate: "2.3", trend: "up", color: "text-mainRed" },
    ]

    const icons = [
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    ]

    return (
        <div className="h-full flex flex-col gap-4 overflow-hidden">
            {/* Section */}
            <div className="flex items-center justify-between px-mainTwoSidePadding">
                <span className="">
                    <h1 className="font-semibold text-black text-csLarge capitalize">Bảng thống kê</h1>
                </span>

                <span className="flex items-center gap-2">
                    <p className="text-gray-600">Thống kê:</p>
                    <select
                        name="analystLimitation"
                        id="analystLimitation"
                        className="p-2 border rounded-md mainShadow"
                        value={selectedLimitation}
                        onChange={handleLimitationChange}
                    >
                        {analystLimitation.map((lim, index) => {
                            return (
                                <option key={index} value={lim.value}>{lim.label}</option>
                            )
                        })}
                    </select>
                    {showCalendar && (
                        <input
                            type="date"
                            className="p-2 border rounded-md mainShadow"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    )}
                </span>
            </div>

            {/* Dashboard */}
            <div className="flex-1 w-full flex flex-col gap-4 px-mainTwoSidePadding overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dashboardCard.map((card, index) => (
                        <div key={index} className="mainShadow bg-white p-4 rounded-lg flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-gray-500">{card.title}</h2>
                                <p className="text-2xl font-bold">{card.value} <span className="text-sm font-normal">{card.unit}</span></p>
                                <p className={`text-sm ${card.color}`}>
                                    {card.changeRate_title} {card.changeRate && `${card.trend === 'up' ? '+' : '-'}${card.changeRate}%`}
                                </p>
                            </div>
                            <div className="text-gray-700">
                                {icons[index]}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[600px]">
                    {/* Biểu đồ cột đôi thể hiện số lượng báo cáo và số lượng báo cáo đã giải quyết */}
                    <div className="mainShadow bg-white p-4 rounded-lg flex flex-col min-h-[300px]">
                        <h3 className="font-semibold mb-4">{`Số lượng báo cáo ${chartTitle}`}</h3>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData.report}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Báo cáo" fill="#808080" />
                                    <Bar dataKey="Đã giải quyết" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Biểu đồ đường thể hiện thời gian phản hồi trung bình */}
                    <div className="mainShadow bg-white p-4 rounded-lg flex flex-col min-h-[300px]">
                        <h3 className="font-semibold mb-4">{`Thời gian phản hồi trung bình ${chartTitle}`}</h3>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData.avgResponse}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Thời gian (phút)" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Biểu đồ cột đôi thể hiện số lượng báo cáo và số lượng SOS */}
                    <div className="mainShadow bg-white p-4 rounded-lg flex flex-col min-h-[300px]">
                        <h3 className="font-semibold mb-4">{`Số lượng báo cáo và SOS ${chartTitle}`}</h3>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData.reportAndSOS}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Báo cáo" fill="#808080" />
                                    <Bar dataKey="SOS" fill="#f25255" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Biểu đồ đường thể hiện các loại báo cáo giao thông */}
                    <div className="mainShadow bg-white p-4 rounded-lg flex flex-col min-h-[300px]">
                        <h3 className="font-semibold mb-4">{`Các loại báo cáo giao thông ${chartTitle}`}</h3>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData.traffic}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Tai nạn" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="Sụt lún" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="Ùn tắc" stroke="#ffc658" />
                                    <Line type="monotone" dataKey="Đèn tín hiệu" stroke="#FF8042" />
                                    <Line type="monotone" dataKey="Khác" stroke="#3e3f46" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalystPage