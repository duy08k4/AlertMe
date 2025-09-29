import type React from "react";

const ContactPage: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert("Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ sớm liên hệ với bạn. (Đây là thông báo giả lập)");
        event.currentTarget.reset();
    };

    return (
        <div className="bg-gray-50 min-h-full py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Contact Information Section */}
                    <div className="p-6 sm:p-8 lg:p-12 bg-[#f25255] text-white">
                        <h2 className="text-xl sm:text-2xl font-extrabold mb-4">Thông tin liên hệ</h2>
                        <p className="mb-8 text-red-100">
                            Nếu bạn có bất kỳ câu hỏi, góp ý hoặc muốn hợp tác, đừng ngần ngại liên hệ với nhóm phát triển AlertMe.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <i className="fa-solid fa-map-marker-alt text-2xl text-red-200 mt-1"></i>
                                <div>
                                    <h3 className="font-bold text-lg">Địa chỉ</h3>
                                    <p className="text-red-100">Trường Đại học Nông Lâm Thành phố Hồ Chí Minh</p>
                                    <p className="text-red-100">Khu Phố 33, Phường Linh Xuân, TP. Hồ Chí Minh, Việt Nam</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <i className="fa-solid fa-envelope text-2xl text-red-200 mt-1"></i>
                                <div>
                                    <h3 className="font-bold text-lg">Email (Môn học)</h3>
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <i className="fa-brands fa-github text-2xl text-red-200 mt-1"></i>
                                <div>
                                    <h3 className="font-bold text-lg">GitHub Project</h3>
                                    <a href="https://github.com/TngDy/AlertMe" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white underline transition">github.com/TngDy/AlertMe</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="p-6 sm:p-8 lg:p-12">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ
                                    </label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md mainShadow focus:outline-none focus:ring-0 focus:border-[#f25255]"
                                        placeholder="Nguyễn Văn"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tên
                                    </label>
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md mainShadow focus:outline-none focus:ring-0 focus:border-[#f25255]"
                                        placeholder="A"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md mainShadow focus:outline-none focus:ring-0 focus:border-[#f25255]"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Chủ đề
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md mainShadow focus:outline-none focus:ring-0 focus:border-[#f25255]"
                                    placeholder="Chủ đề mà bạn quan tâm..."
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tin nhắn
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md mainShadow focus:outline-none focus:ring-0 focus:border-[#f25255]"
                                    placeholder="Nội dung tin nhắn của bạn..."
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md mainShadow text-base font-medium text-white bg-[#f25255] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f25255] transition"
                                >
                                    Gửi đi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;