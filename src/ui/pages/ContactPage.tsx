import type React from "react";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     alert("Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ sớm liên hệ với bạn.");
    //     event.currentTarget.reset();
    // };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white min-h-full py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
        >
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="p-6 sm:p-8 lg:p-12 bg-[#f25255] text-white"
                    >
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
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                    <p className="text-red-100">22166013@st.hcmuaf.edu.vn</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <i className="fa-brands fa-github text-2xl text-red-200 mt-1"></i>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="font-bold text-lg">GitHub Project</h3>
                                    <a href="https://github.com/duy08k4/AlertMe.git" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white underline transition flex items-center-safe gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clipRule="evenodd" />
                                        </svg>

                                        AlertMe Admin
                                    </a>

                                    <a href="https://github.com/duy08k4/AlertMe_Mobile.git" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white underline transition flex items-center-safe gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                                            <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
                                        </svg>

                                        AlertMe Mobile
                                    </a>

                                    <a href="https://github.com/y0shih/AlertMe-Nest.git" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white underline transition flex items-center-safe gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                                            <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                                            <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                                            <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                                        </svg>

                                        AlertMe Server
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="p-6 sm:p-8 lg:p-12"
                    >
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md mainShadow focus:outline-none focus:ring-0 focus:border-[#f25255] resize-none"
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
                    </motion.div> */}
                </div>
            </div>
        </motion.div>
    );
};

export default ContactPage;