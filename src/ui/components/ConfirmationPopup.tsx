import type React from 'react';

type ConfirmationPopupProps = {
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
};

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
    title = "Bạn có chắc chắn?",
    message,
    onConfirm,
    onCancel,
    confirmText = "Tiếp tục",
    cancelText = "Hủy"
}) => {
    return (
        <div className="fixed inset-0 z-[1100] bg-[rgba(0,0,0,0.75)] bg-opacity-50 flex items-center justify-center p-4" onClick={onCancel}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md flex flex-col animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 flex items-start gap-4">
                    {/* Warning Icon */}
                    <div className="flex-shrink-0 size-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-mainRed">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.007H12v-.007Z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black">{title}</h3>
                        <p className="text-csNormal text-darkGray mt-1">{message}</p>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-3 p-4 bg-gray-50 rounded-b-lg">
                    <button onClick={onCancel} className="px-4 py-2 text-csNormal font-semibold text-darkGray hover:bg-gray-200 rounded-md transition-colors">
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 text-csNormal font-semibold text-white bg-mainRed hover:opacity-90 rounded-md transition-opacity">
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;