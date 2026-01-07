import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { taskStatus } from '../../configs/reportStatus'

export type staffFullData = {
  id: string,
  email: string,
  name: string,
  role_id: string,
  is_new_user: boolean,
  profile: {
    id: string,
    username: string,
    phone_number: string,
    address: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
    profilepic: string
  },
  task_given: string,
  task_completed: string,
  created_at: string,
  updated_at: string,
  assigned_tasks: [
    {
      id: string,
      report_id: string,
      task_details: string,
      status: keyof typeof taskStatus,
      created_at: string,
      updated_at: string,
      report: {
        id: string,
        name: string,
        details: string,
        status: keyof typeof taskStatus
      }
    }
  ]
}

export type staffData = {
  id: string,
  email: string,
  username: string,
  name: string,
  is_new_user: boolean,
  role: {
    id: string,
    name: string
  },
  phone_number: string,
  address: string,
  city: string,
  state: string,
  postal_code: string,
  country: string,
  profilepic: string,
  task_given: number,
  task_completed: number,
  created_at: string,
  updated_at: string
}

export type staffShortData = {
  id: string,
  name: string,
  email: string,
  haveTask: boolean,
  lat: number,
  lng: number
}

export type staffListPagination = {
  data: staffData[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
export interface StaffState {
  page: number,
  maxPage: number,
  amountStaff: number
  paginationData: staffListPagination,
  staffLocation: staffShortData[]
}

const initialState: StaffState = {
  page: 1,
  maxPage: 1,
  amountStaff: 0,
  paginationData: {} as staffListPagination,
  staffLocation: [] as staffShortData[]
}

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      const pageNumber = action.payload
      if (!pageNumber || pageNumber < 1) return
      state.page = pageNumber
    },

    setMaxPage: (state, action: PayloadAction<number>) => {
      const pageNumber = action.payload
      if (!pageNumber || pageNumber < 1) return
      state.maxPage = pageNumber
    },

    setAmountStaff: (state, action: PayloadAction<number>) => {
      const amount = action.payload
      if (!amount || amount < 1) return
      state.amountStaff = amount
    },

    setPaginationData: (state, action: PayloadAction<staffListPagination>) => {
      const pageData = action.payload

      if (!pageData) return
      state.paginationData = action.payload
    },

    addNewStaff: (state, action: PayloadAction<staffData>) => {
      const staffData = action.payload

      if (staffData && Object.keys(staffData).length > 0 && state.page === 1) {
        state.paginationData.data.unshift(staffData)
        state.amountStaff += 1
        state.paginationData.pagination.total += 1
        state.paginationData.pagination.totalPages = Math.ceil(
          state.paginationData.pagination.total /
          state.paginationData.pagination.limit
        )
        state.maxPage = state.paginationData.pagination.totalPages

        if (state.paginationData.data.length > state.paginationData.pagination.limit) {
          state.paginationData.data.pop()
        }

      }
    },

    removeStaff: (state, action: PayloadAction<{ staffId: string }>) => {
      const initialLength = state.paginationData.data.length;
      state.paginationData.data = state.paginationData.data.filter(staff => staff.id != action.payload.staffId)
      const finalLength = state.paginationData.data.length;

      if (initialLength > finalLength) {
        state.amountStaff -= 1;
        state.paginationData.pagination.total -= 1;
        state.paginationData.pagination.totalPages = Math.ceil(
          state.paginationData.pagination.total /
          state.paginationData.pagination.limit
        );
        state.maxPage = state.paginationData.pagination.totalPages;
      }
    },

    addStaffLoc: (state, action: PayloadAction<staffShortData>) => {
      const staffLoc = action.payload

      if (staffLoc.id) {
        const index = state.staffLocation.findIndex(s => s.id === staffLoc.id)

        if (index !== -1) {
          state.staffLocation[index] = staffLoc
        } else {
          state.staffLocation.push(staffLoc)
        }
      }
    },

    removeStaffLoc: (state, action: PayloadAction<{ staffId: string }>) => {
      const staffId = action.payload.staffId
      state.staffLocation = state.staffLocation.filter(staff => staff.id !== staffId)
    },

    setStaffStatus: (state, action: PayloadAction<{ staffId: string[], status: boolean }>) => {
      const { staffId, status } = action.payload

      state.staffLocation = state.staffLocation.map(staff => {
        if (staffId.includes(staff.id)) {
          return { ...staff, haveTask: status }
        }
        return staff
      })
    }


  }
})

// Action creators are generated for each case reducer function
export const {
  setPage,
  setMaxPage,
  setAmountStaff,
  setPaginationData,
  removeStaff,
  addNewStaff,
  addStaffLoc,
  removeStaffLoc,
  setStaffStatus
} = staffSlice.actions

export default staffSlice.reducer