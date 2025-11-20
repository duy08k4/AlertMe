import React from "react"
import { X, AlertTriangle } from "lucide-react"

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    type?: "danger" | "info" | "warning"
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    type = "danger",
}) => {
    if (!isOpen) return null

    const getButtonColor = () => {
        switch (type) {
            case "danger":
                return "bg-red-500 hover:bg-red-600"
            case "warning":
                return "bg-yellow-500 hover:bg-yellow-600"
            case "info":
            default:
                return "bg-blue-500 hover:bg-blue-600"
        }
    }

    return (
        <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex justify-center items-center z-[100]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all p-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={`p-2 rounded-full ${
                                type === "danger"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-blue-100 text-blue-600"
                            }`}
                        >
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                            {title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <p className="text-gray-600 mb-8">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                        className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${getButtonColor()}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
