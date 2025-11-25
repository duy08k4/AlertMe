import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { reportStatus } from '../../configs/reportStatus'

export type staffData = {
  id: string,
  email: string,
  username: string,
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
  paginationData: staffListPagination
}

const initialState: StaffState = {
  page: 1,
  maxPage: 1,
  amountStaff: 0,
  paginationData: {} as staffListPagination
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

        if (state.paginationData.data.length > state.paginationData.pagination.limit) {
          state.paginationData.data.pop()
          state.maxPage += 1
        }

      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPage, setMaxPage, setAmountStaff, setPaginationData, addNewStaff } = staffSlice.actions

export default staffSlice.reducer