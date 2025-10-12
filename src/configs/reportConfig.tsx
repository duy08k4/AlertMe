export const reportConfig = {
    state: {
        waiting: { label: "Chờ xử lý", api_param: "waiting", color: "#808080" },
        pending: { label: "Đang xử lý", api_param: "pending", color: "#FF6600" },
        successful: { label: "Đã xử lý", api_param: "successful", color: "#33CC00" }
    },
    level: {
        low: { label: "Nhẹ", api_param: "low", color: "#FFD700" },
        medium: { label: "Trung bình", api_param: "medium", color: "#FF9966" },
        high: { label: "Nặng", api_param: "high", color: "#FF3300" },
        emergency: { label: "Rất nặng", api_param: "emergency", color: "#BB0000" },
    }
}