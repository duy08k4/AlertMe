// Import libraries
import type React from "react"

// Dummy data for support teams
const supportTeams = [
    {
        name: "Đội cứu hộ số 1",
        type: "Cứu hộ giao thông",
        status: "Sẵn sàng",
        members: 5,
    },
    {
        name: "Đội y tế khẩn cấp",
        type: "Y tế",
        status: "Đang bận",
        members: 8,
    },
    {
        name: "Đội phòng cháy chữa cháy",
        type: "Cứu hỏa",
        status: "Sẵn sàng",
        members: 12,
    },
    {
        name: "Đội hỗ trợ tâm lý",
        type: "Tâm lý",
        status: "Ngoại tuyến",
        members: 3,
    }
];

// Support Team Card Component
const SupportTeamCard: React.FC<{ team: typeof supportTeams[0] }> = ({ team }) => {
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Sẵn sàng":
                return "bg-green-100 text-green-800";
            case "Đang bận":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="w-full flex items-start gap-4 p-3 border border-lightGray rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex-shrink-0 size-12 bg-light-background rounded-full flex items-center justify-center">
                {/* Icon placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-darkGray">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962A3.75 3.75 0 0 1 9 10.5V9A2.25 2.25 0 0 1 11.25 6.75v-1.5a3.75 3.75 0 0 1 7.5 0v1.5A2.25 2.25 0 0 1 16.5 9v1.5m-6.086 5.82A3.75 3.75 0 0 1 6.75 18v-1.5a2.25 2.25 0 0 1 2.25-2.25v-1.5A3.75 3.75 0 0 1 13.5 9v1.5" />
                </svg>
            </div>
            <div className="flex-1 flex flex-col gap-0.5">
                <h3 className="font-semibold text-csNormal text-black">{team.name}</h3>
                <p className="text-csSmall text-darkGray">{team.type}</p>
                <p className="text-csSmall text-darkGray">{team.members} thành viên</p>
                <span className={`mt-1 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${getStatusClass(team.status)} w-fit`}>
                    {team.status}
                </span>
            </div>
        </div>
    );
};


// Main component
const ReportViewLayout_ListSupportTeams: React.FC = () => {
    return (
        <div className="absolute z-[900] bg-white flex flex-col gap-2.5 px-mainTwoSidePadding py-2.5 transition-transform duration-300 ease-in-out w-full h-4/5 bottom-0 rounded-t-2xl md:w-[350px] md:h-full md:top-0 md:right-0 md:left-auto md:bottom-auto md:rounded-none md:border-l md:border-lightGray">
            <div className="w-full flex flex-col gap-2.5">
                <h2 className="text-csBig text-black font-semibold">Danh sách đội cứu hộ</h2>

                <div className="h-fit w-full">
                    <div className="flex items-center gap-2 border border-lightGray rounded-small px-2.5 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-darkGray">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <input
                            className="outline-none h-full w-full flex-1 text-black text-csNormal bg-transparent"
                            type="text"
                            placeholder="Tìm kiếm đội cứu hộ..."
                        />
                    </div>
                </div>
            </div>

            {/* List of support teams */}
            <div className="w-full flex-1 flex flex-col gap-2.5 overflow-y-auto pr-1.5">
                {supportTeams.map((team, index) => (
                    <SupportTeamCard key={index} team={team} />
                ))}
            </div>
        </div>
    )
}

export default ReportViewLayout_ListSupportTeams