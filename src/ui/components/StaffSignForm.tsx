
import type React from 'react';
import { useState } from 'react';
import { X, UserPlus, ImageUp } from 'lucide-react';
import { toastConfig } from '../../configs/toastConfig';
import { staffService } from '../../service/staff.serv';

interface StaffSignFormProps {
    onClose: () => void;
}

const InputField = ({ label, name, type = 'text', value, onChange, required = true }: {
    label: string,
    name: string,
    type?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="text-sm font-medium text-gray-500 mb-1">{label}{required && <span className="text-mainRed">*</span>}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="border rounded-lg py-2 px-3 focus:ring-2 focus:ring-mainRed focus:border-white outline-none transition-colors"
        />
    </div>
);

const StaffSignForm: React.FC<StaffSignFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        name: '',
        phone_number: '',
        address: '',
        state: '',
        city: '',
        postal_code: '',
        country: '',
    });
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePic(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profilePic) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng cung cấp hình ảnh'
            })
            return;
        }

        const imgUrl = await staffService.uploadImage(profilePic)

        if (imgUrl) {
            await staffService.signStaff(
                imgUrl, formData.name, formData.username, formData.email, formData.password,
                formData.phone_number, formData.address, formData.city, formData.state, formData.postal_code, formData.country
            )
        } else {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể thêm nhân viên'
            })
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-4xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white p-6 rounded-t-xl border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <UserPlus size={28} className="text-mainRed" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Tạo tài khoản nhân viên mới</h2>
                                <p className="text-sm text-gray-500">Vui lòng điền đầy đủ thông tin bên dưới.</p>
                            </div>
                        </div>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1 flex flex-col items-center gap-4">
                            <h3 className="font-semibold text-gray-700">Ảnh đại diện</h3>
                            <label htmlFor="profilePic" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 w-full">
                                {profilePicPreview ? (
                                    <img src={profilePicPreview} alt="Preview" className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md" />
                                ) : (
                                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed hover:border-mainRed transition-colors">
                                        <ImageUp size={48} className="text-gray-400" />
                                    </div>
                                )}
                                <span className="text-xs text-center text-gray-500 mt-2">Nhấp để tải ảnh lên</span>
                            </label>
                            <input
                                type="file"
                                id="profilePic"
                                name="profilePic"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div className="sm:col-span-2">
                                <h3 className="font-semibold text-gray-700">Thông tin tài khoản</h3>
                            </div>
                            <InputField label="Họ và tên" name="name" value={formData.name} onChange={handleInputChange} />
                            <InputField label="Tên đăng nhập" name="username" value={formData.username} onChange={handleInputChange} />
                            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                            <InputField label="Mật khẩu" name="password" type="password" value={formData.password} onChange={handleInputChange} />

                            <div className="sm:col-span-2 mt-4">
                                <h3 className="font-semibold text-gray-700">Thông tin liên hệ</h3>
                            </div>
                            <InputField label="Số điện thoại" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required={false} />
                            <InputField label="Địa chỉ" name="address" value={formData.address} onChange={handleInputChange} required={false} />
                            <InputField label="Thành phố" name="city" value={formData.city} onChange={handleInputChange} required={false} />
                            <InputField label="Tỉnh / Khu vực" name="state" value={formData.state} onChange={handleInputChange} required={false} />
                            <InputField label="Mã bưu điện" name="postal_code" value={formData.postal_code} onChange={handleInputChange} required={false} />
                            <InputField label="Quốc gia" name="country" value={formData.country} onChange={handleInputChange} required={false} />
                        </div>
                    </div>

                    <div className="bg-white px-8 py-4 rounded-b-xl border-t border-gray-200 flex justify-end space-x-4 sticky bottom-0 z-10">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                            Hủy
                        </button>
                        <button type="submit" className="bg-mainRed text-white px-5 py-2.5 rounded-lg hover:grayscale-[15%] transition-colors font-semibold flex items-center space-x-2">
                            <UserPlus size={18} />
                            <span>Tạo tài khoản</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StaffSignForm;
