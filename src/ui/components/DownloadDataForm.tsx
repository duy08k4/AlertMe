import type React from 'react';
import { useState } from 'react';
import ConfirmationPopup from './ConfirmationPopup';

const incidentTypes = [
    "Tắc nghẽn và tai nạn",
    "Hạ tầng giao thông",
    "Thời tiết",
    "Khác"
];

type DownloadDataFormProps = {
    onClose: () => void;
};

const DownloadDataForm: React.FC<DownloadDataFormProps> = ({ onClose }) => {
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    const handleDownloadAll = () => {
        setIsConfirmationVisible(true);
    };

    const handleConfirmDownloadAll = () => {
        // Placeholder for download logic
        console.log("Downloading all data...");
        setIsConfirmationVisible(false);
        onClose(); // Close the main form after confirmation
    };

    return (
        <>
            <div className="absolute inset-0 z-[1000] bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col animate-fade-in-down">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-lightGray">
                        <h2 className="text-csBig font-semibold text-black">Tải dữ liệu sự cố</h2>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-light-background">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-darkGray">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form Body */}
                    <div className="p-5 flex flex-col gap-6">
                        <fieldset className="flex flex-col gap-3">
                            <legend className="font-semibold text-csNormal text-black mb-1">Khoảng thời gian</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="startTime" className="text-csSmall text-darkGray">Từ ngày</label>
                                    <input id="startTime" type="datetime-local" className="outline-none w-full border border-lightGray rounded-small px-2.5 py-2 text-csNormal" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="endTime" className="text-csSmall text-darkGray">Đến ngày</label>
                                    <input id="endTime" type="datetime-local" className="outline-none w-full border border-lightGray rounded-small px-2.5 py-2 text-csNormal" />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="flex flex-col gap-3">
                            <legend className="font-semibold text-csNormal text-black">Loại sự cố</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                {incidentTypes.map(type => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-mainRed">
                                        <input type="checkbox" className="size-4 rounded border-lightGray text-mainRed focus:ring-mainRed focus:ring-1" />
                                        <span className="text-csNormal text-black">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row justify-end items-center gap-3 p-4 bg-gray-50 rounded-b-lg">
                        <button onClick={handleDownloadAll} className="w-full sm:w-auto bg-gray-200 text-black font-semibold px-6 py-2.5 rounded-small hover:bg-gray-300 transition-colors">
                            Tải toàn bộ dữ liệu
                        </button>
                        <button className="w-full sm:w-auto bg-mainDark text-white font-semibold px-6 py-2.5 rounded-small hover:opacity-90 transition-opacity">
                            Tải dữ liệu
                        </button>
                    </div>
                </div>
            </div>

            {isConfirmationVisible && (
                <ConfirmationPopup
                    title="Xác nhận tải toàn bộ dữ liệu"
                    message="Dữ liệu có thể rất lớn và quá trình tải có thể mất nhiều thời gian. Bạn có muốn tiếp tục không?"
                    onConfirm={handleConfirmDownloadAll}
                    onCancel={() => setIsConfirmationVisible(false)}
                    confirmText="Tải xuống"
                    cancelText="Hủy bỏ"
                />
            )}
        </>
    );
};

export default DownloadDataForm;