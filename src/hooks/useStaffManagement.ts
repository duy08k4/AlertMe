import { useState, useEffect } from "react";
import api from "../configs/gateway";
import type {
  StaffMember,
  StaffListApiResponse,
  StaffApiResponse,
} from "../types/staff.types";
import { ROLE_MAP, STATUS_MAP } from "../types/staff.types";
import { toastConfig } from "../configs/toastConfig";

const transformStaffData = (apiStaff: StaffApiResponse): StaffMember => {
  return {
    id: apiStaff.id,
    name: apiStaff.name,
    email: apiStaff.email,
    phone: apiStaff.profile?.phone_number || "N/A",
    role: ROLE_MAP[apiStaff.role_id] || "Nhân viên",
    status: STATUS_MAP.ACTIVE, // Default status, adjust based on your logic
    joinDate: new Date(apiStaff.created_at).toISOString().split("T")[0],
    tasks: apiStaff.task_given,
    taskCompleted: apiStaff.task_completed,
    staffId: apiStaff.id.substring(0, 8).toUpperCase(),
    address: apiStaff.profile?.address,
    city: apiStaff.profile?.city,
    state: apiStaff.profile?.state,
    postalCode: apiStaff.profile?.postal_code,
    country: apiStaff.profile?.country,
    profilePic: apiStaff.profile?.profilepic,
    username: apiStaff.profile?.username,
  };
};

export const useStaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof StaffMember | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Add staff modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [newStaffData, setNewStaffData] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    profilepic: "",
  });

  // Edit staff modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editStaffData, setEditStaffData] = useState({
    email: "",
    name: "",
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

  // Fetch staff data from API
  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<StaffListApiResponse>("/staff");
      const transformedData = response.data.data.map(transformStaffData);
      setStaffMembers(transformedData);
    } catch (err) {
      console.error("Error fetching staff data:", err);
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Không thể tải danh sách nhân viên",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async () => {
    try {
      setAddLoading(true);
      setAddError(null);
      await api.post("/auth/staff/sign-up", newStaffData);
      // Refresh the staff list
      await fetchStaffData();
      // Close modal and reset form
      setShowAddModal(false);
      setNewStaffData({
        email: "",
        name: "",
        password: "",
        username: "",
        phone_number: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        profilepic: "",
      });
    } catch (err) {
      console.error("Error adding staff:", err);
      const error = err as { response?: { data?: { message?: string } } };
      setAddError(error.response?.data?.message || "Không thể thêm nhân viên");
    } finally {
      setAddLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStaffData({
      ...newStaffData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteStaff = () => {
    if (!selectedStaff) return;
    setShowDeleteConfirm(true);
  };

  const executeDeleteStaff = async () => {
    if (!selectedStaff) return;

    try {
      setLoading(true);
      await api.delete(`/staff/${selectedStaff.id}`);
      await fetchStaffData();
      setSelectedStaff(null);
      toastConfig({
        toastMessage: "Xóa nhân viên thành công",
        toastType: "success",
      });
    } catch (err) {
      console.error("Error deleting staff:", err);
      toastConfig({
        toastMessage: "Không thể xóa nhân viên. Vui lòng thử lại.",
        toastType: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    if (!selectedStaff) return;
    setEditStaffData({
      email: selectedStaff.email,
      name: selectedStaff.name,
      username: selectedStaff.username || "",
      phone_number: selectedStaff.phone !== "N/A" ? selectedStaff.phone : "",
      address: selectedStaff.address || "",
      city: selectedStaff.city || "",
      state: selectedStaff.state || "",
      postal_code: selectedStaff.postalCode || "",
      country: selectedStaff.country || "",
      profilepic: selectedStaff.profilePic || "",
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditStaffData({
      ...editStaffData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateStaff = async () => {
    if (!selectedStaff) return;
    try {
      setEditLoading(true);
      setEditError(null);
      await api.put(`/staff/${selectedStaff.id}`, editStaffData);
      await fetchStaffData();
      setShowEditModal(false);
      setSelectedStaff(null);
    } catch (err) {
      console.error("Error updating staff:", err);
      const error = err as { response?: { data?: { message?: string } } };
      setEditError(
        error.response?.data?.message ||
          "Không thể cập nhật thông tin nhân viên",
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const requestSort = (key: keyof StaffMember) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedStaff = [...staffMembers].sort((a, b) => {
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

  const filteredStaff = sortedStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm) ||
      staff.staffId.includes(searchTerm),
  );

  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter(
    (u) => u.status === "Hoạt động",
  ).length;
  const newStaffThisMonth = staffMembers.filter((u) => {
    const joinDate = new Date(u.joinDate);
    const now = new Date();
    return (
      joinDate.getMonth() === now.getMonth() &&
      joinDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const totalTasks = staffMembers.reduce((acc, u) => acc + u.tasks, 0);
  const avgTasksPerStaff =
    totalStaff > 0 ? (totalTasks / totalStaff).toFixed(2) : 0;

  return {
    staffMembers,
    loading,
    error,
    searchTerm,
    sortConfig,
    selectedStaff,
    showAddModal,
    addLoading,
    addError,
    newStaffData,
    showEditModal,
    editLoading,
    editError,
    editStaffData,
    showDeleteConfirm,
    fetchStaffData,
    handleAddStaff,
    handleInputChange,
    handleDeleteStaff,
    executeDeleteStaff,
    handleEditClick,
    handleEditInputChange,
    handleUpdateStaff,
    handleSearch,
    requestSort,
    filteredStaff,
    totalStaff,
    activeStaff,
    newStaffThisMonth,
    avgTasksPerStaff,
    setSelectedStaff,
    setShowAddModal,
    setShowEditModal,
    setShowDeleteConfirm,
  };
};
