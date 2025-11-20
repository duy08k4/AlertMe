import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  fetchStaffList,
  addStaff,
  updateStaff,
  deleteStaff,
  clearError,
} from "../redux/reducers/staff";
import type { StaffMember } from "../types/staff.types";
import { toastConfig } from "../configs/toastConfig";

export const useStaffManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { staffList, loading, error } = useSelector(
    (state: RootState) => state.staff
  );

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

  // Fetch staff data on mount
  useEffect(() => {
    dispatch(fetchStaffList());
  }, [dispatch]);

  const fetchStaffData = () => {
    dispatch(fetchStaffList());
  };

  const handleAddStaff = async () => {
    try {
      setAddLoading(true);
      setAddError(null);
      dispatch(clearError());
      const resultAction = await dispatch(addStaff(newStaffData));
      if (addStaff.fulfilled.match(resultAction)) {
        // Success - close modal and reset form
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
      } else {
        // Error
        setAddError(resultAction.payload as string);
      }
    } catch (err) {
      console.error("Error adding staff:", err);
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
      dispatch(clearError());
      const resultAction = await dispatch(deleteStaff(selectedStaff.id));
      if (deleteStaff.fulfilled.match(resultAction)) {
        setSelectedStaff(null);
        setShowDeleteConfirm(false);
        toastConfig({
          toastMessage: "Xóa nhân viên thành công",
          toastType: "success",
        });
      } else {
        toastConfig({
          toastMessage: resultAction.payload as string,
          toastType: "error",
        });
      }
    } catch (err) {
      console.error("Error deleting staff:", err);
      toastConfig({
        toastMessage: "Không thể xóa nhân viên. Vui lòng thử lại.",
        toastType: "error",
      });
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
      dispatch(clearError());
      const resultAction = await dispatch(updateStaff({ id: selectedStaff.id, data: editStaffData }));
      if (updateStaff.fulfilled.match(resultAction)) {
        setShowEditModal(false);
        setSelectedStaff(null);
      } else {
        setEditError(resultAction.payload as string);
      }
    } catch (err) {
      console.error("Error updating staff:", err);
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

  const sortedStaff = [...staffList].sort((a, b) => {
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

  const totalStaff = staffList.length;
  const activeStaff = staffList.filter(
    (u) => u.status === "Hoạt động",
  ).length;
  const newStaffThisMonth = staffList.filter((u) => {
    const joinDate = new Date(u.joinDate);
    const now = new Date();
    return (
      joinDate.getMonth() === now.getMonth() &&
      joinDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const totalTasks = staffList.reduce((acc, u) => acc + u.tasks, 0);
  const avgTasksPerStaff =
    totalStaff > 0 ? (totalTasks / totalStaff).toFixed(2) : 0;

  return {
    staffMembers: staffList,
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
