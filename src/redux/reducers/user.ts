import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../configs/gateway";
import type { UserMember, UserApiResponse, UserUpdateRequest } from "../../types/user.types";

interface UsersState {
    userList: UserMember[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    userList: [],
    loading: false,
    error: null,
};

// Helper to transform API response to component data
const transformUserData = (user: UserApiResponse): UserMember => {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role.name,
        joinDate: new Date(user.created_at).toLocaleDateString("vi-VN"),
        phone: user.phone_number || "N/A",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        postalCode: user.postal_code || "",
        country: user.country || "",
        profilePic: user.profilepic || "",
    };
};

export const fetchUserList = createAsyncThunk(
    "userManagement/fetchUserList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/users");
            return response.data.data.map(transformUserData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Không thể tải danh sách người dùng"
                );
            }
            return rejectWithValue("Đã xảy ra lỗi không xác định");
        }
    }
);

export const updateUser = createAsyncThunk(
    "userManagement/updateUser",
    async (
        { id, data }: { id: string; data: UserUpdateRequest },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.put(`/users/${id}`, data);

            // The update endpoint returns the user directly in response.data, not response.data.data
            const userData = response.data.data || response.data;

            const transformed = transformUserData(userData);
            return transformed;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Không thể cập nhật thông tin người dùng"
                );
            }
            return rejectWithValue("Đã xảy ra lỗi không xác định");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "userManagement/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/users/${id}`);
            return id;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Không thể xóa người dùng"
                );
            }
            return rejectWithValue("Đã xảy ra lỗi không xác định");
        }
    }
);

const userManagementSlice = createSlice({
    name: "userManagement",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch User List
        builder
            .addCase(fetchUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action.payload;
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update User
        builder
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.userList.findIndex(
                    (user) => user.id === action.payload.id
                );
                if (index !== -1) {
                    state.userList[index] = action.payload;
                }
            });

        // Delete User
        builder
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.userList = state.userList.filter(
                    (user) => user.id !== action.payload
                );
            });
    },
});

export const { clearError } = userManagementSlice.actions;
export default userManagementSlice.reducer;
