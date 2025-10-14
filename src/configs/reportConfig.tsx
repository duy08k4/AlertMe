export const reportConfig = {
    state: {
        waiting: { label: "Chờ xử lý", api_param: "waiting", color: "#808080", rgba_color: "rgba(128,128,128,0.2)" },
        pending: { label: "Đang xử lý", api_param: "pending", color: "#FF6600", rgba_color: "rgba(255,102,0,0.2)" },
        successful: { label: "Đã xử lý", api_param: "successful", color: "#33CC00", rgba_color: "rgba(51,204,0,0.2)" }
    },
    level: {
        low: { label: "Nhẹ", api_param: "low", color: "#FFD700" },
        medium: { label: "Trung bình", api_param: "medium", color: "#FF9966" },
        high: { label: "Nặng", api_param: "high", color: "#FF3300" },
        emergency: { label: "Rất nặng", api_param: "emergency", color: "#BB0000" },
    }
}