import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import api from '../../configs/gateway'
import type { StaffMember, StaffListApiResponse, StaffApiResponse, StaffSignUpRequest, StaffUpdateRequest } from '../../types/staff.types'
import { ROLE_MAP, STATUS_MAP } from '../../types/staff.types'

// Error interface for API errors
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Type-safe action interfaces for matchers
interface FulfilledAction {
  type: string;
  payload: StaffMember[];
}

interface RejectedAction {
  type: string;
  payload?: string;
}

const transformStaffData = (apiStaff: StaffApiResponse): StaffMember => {
  return {
    id: apiStaff.id,
    name: apiStaff.name,
    email: apiStaff.email,
    phone: apiStaff.profile?.phone_number || "N/A",
    role: ROLE_MAP[apiStaff.role_id] || "Nhân viên",
    status: STATUS_MAP.ACTIVE,
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

export interface StaffState {
    staffList: StaffMember[],
    loading: boolean,
    error: string | null,
    singleStaff: StaffMember | null,
    isAuth: boolean,
}

const initialState: StaffState = {
    staffList: [],
    loading: false,
    error: null,
    singleStaff: null,
    isAuth: false
}

// Async thunks for API calls
export const fetchStaffList = createAsyncThunk(
    'staff/fetchList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<StaffListApiResponse>("/staff");
            return response.data.data.map(transformStaffData);
        } catch (err) {
            const error = err as ApiError;
            return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách nhân viên");
        }
    }
);

export const addStaff = createAsyncThunk(
    'staff/add',
    async (staffData: StaffSignUpRequest, { rejectWithValue }) => {
        try {
            await api.post("/auth/staff/sign-up", staffData);
            // Refetch the list after adding
            const response = await api.get<StaffListApiResponse>("/staff");
            return response.data.data.map(transformStaffData);
        } catch (err) {
            const error = err as ApiError;
            return rejectWithValue(error.response?.data?.message || "Không thể thêm nhân viên");
        }
    }
);

export const updateStaff = createAsyncThunk(
    'staff/update',
    async ({ id, data }: { id: string, data: StaffUpdateRequest }, { rejectWithValue }) => {
        try {
            await api.put(`/staff/${id}`, data);
            // Refetch the list after updating
            const response = await api.get<StaffListApiResponse>("/staff");
            return response.data.data.map(transformStaffData);
        } catch (err) {
            const error = err as ApiError;
            return rejectWithValue(error.response?.data?.message || "Không thể cập nhật nhân viên");
        }
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/staff/${id}`);
            // Refetch the list after deleting
            const response = await api.get<StaffListApiResponse>("/staff");
            return response.data.data.map(transformStaffData);
        } catch {
            return rejectWithValue("Không thể xóa nhân viên");
        }
    }
);

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaff: (state, action: PayloadAction<StaffMember>) => {
            state.singleStaff = action.payload
        },

        setStaffAuth: (state, action: PayloadAction<boolean>)=> {
            state.isAuth = action.payload
        },

        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle all staff-related async actions with single state updates
            .addMatcher(
                (action) => action.type.endsWith('/pending') && action.type.startsWith('staff/'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') && action.type.startsWith('staff/'),
                (state, action) => {
                    state.loading = false;
                    const fulfilledAction = action as FulfilledAction;
                    state.staffList = fulfilledAction.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && action.type.startsWith('staff/'),
                (state, action) => {
                    state.loading = false;
                    const rejectedAction = action as RejectedAction;
                    state.error = typeof rejectedAction.payload === 'string' ? rejectedAction.payload : "Đã xảy ra lỗi không xác định";
                }
            );
    },
})

// Action creators are generated for each case reducer function
export const { setStaff, setStaffAuth, clearError } = staffSlice.actions

export default staffSlice.reducer