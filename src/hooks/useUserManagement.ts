import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
    fetchUserList,
    updateUser,
    deleteUser,
    clearError,
} from "../redux/reducers/user";
import type { UserMember } from "../types/user.types";
import { toastConfig } from "../configs/toastConfig";

export const useUserManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    // @ts-ignore - userManagement slice is added dynamically
    const { userList, loading, error } = useSelector(
        (state: RootState) => state.userManagement
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: keyof UserMember | null;
        direction: "ascending" | "descending";
    }>({ key: null, direction: "ascending" });
    const [selectedUser, setSelectedUser] = useState<UserMember | null>(null);

    // Edit user modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);
    const [editUserData, setEditUserData] = useState({
        username: "",
        phone_number: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        profilepic: "",
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Fetch user data on mount
    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    const fetchUserData = () => {
        dispatch(fetchUserList());
    };

    const handleDeleteUser = () => {
        if (!selectedUser) return;
        setShowDeleteConfirm(true);
    };

    const executeDeleteUser = async () => {
        if (!selectedUser) return;

        try {
            dispatch(clearError());
            const resultAction = await dispatch(deleteUser(selectedUser.id));
            if (deleteUser.fulfilled.match(resultAction)) {
                setSelectedUser(null);
                setShowDeleteConfirm(false);
                toastConfig({
                    toastMessage: "Xóa người dùng thành công",
                    toastType: "success",
                });
            } else {
                toastConfig({
                    toastMessage: resultAction.payload as string,
                    toastType: "error",
                });
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            toastConfig({
                toastMessage: "Không thể xóa người dùng. Vui lòng thử lại.",
                toastType: "error",
            });
        }
    };

    const handleEditClick = () => {
        if (!selectedUser) return;
        setEditUserData({
            username: selectedUser.username || "",
            phone_number: selectedUser.phone || "",
            address: selectedUser.address || "",
            city: selectedUser.city || "",
            state: selectedUser.state || "",
            postal_code: selectedUser.postalCode || "",
            country: selectedUser.country || "",
            profilepic: selectedUser.profilePic || "",
        });
        setShowEditModal(true);
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;
        try {
            setEditLoading(true);
            setEditError(null);
            dispatch(clearError());
            const resultAction = await dispatch(updateUser({ id: selectedUser.id, data: editUserData }));
            if (updateUser.fulfilled.match(resultAction)) {
                setShowEditModal(false);
                setSelectedUser(null);
                toastConfig({
                    toastMessage: "Cập nhật thông tin thành công",
                    toastType: "success",
                });
            } else {
                setEditError(resultAction.payload as string);
                toastConfig({
                    toastMessage: resultAction.payload as string || "Đã xảy ra lỗi không xác định",
                    toastType: "error",
                });
            }
        } catch (err) {
            toastConfig({
                toastMessage: "Đã xảy ra lỗi không xác định",
                toastType: "error",
            });
        } finally {
            setEditLoading(false);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const requestSort = (key: keyof UserMember) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...userList].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue !== undefined && bValue !== undefined) {
                if (aValue < bValue) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
            }
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(
        (user) =>
            (user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalUsers = userList.length;
    const newUsersThisMonth = userList.filter((u) => {
        const joinDate = new Date(u.joinDate); // Assuming joinDate is parseable
        const now = new Date();
        // Need to handle date parsing carefully if format varies
        return (
            joinDate.getMonth() === now.getMonth() &&
            joinDate.getFullYear() === now.getFullYear()
        );
    }).length;

    // Placeholder for reports logic if available in API
    const avgReportsPerUser = 0;

    return {
        userList,
        loading,
        error,
        searchTerm,
        sortConfig,
        selectedUser,
        showEditModal,
        editLoading,
        editError,
        editUserData,
        showDeleteConfirm,
        fetchUserData,
        handleDeleteUser,
        executeDeleteUser,
        handleEditClick,
        handleEditInputChange,
        handleUpdateUser,
        handleSearch,
        requestSort,
        filteredUsers,
        totalUsers,
        newUsersThisMonth,
        avgReportsPerUser,
        setSelectedUser,
        setShowEditModal,
        setShowDeleteConfirm,
    };
};
