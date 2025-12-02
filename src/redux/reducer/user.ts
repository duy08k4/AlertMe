import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export type userData = {
  id: string,
  email: string,
  username: string,
  role: {
    id: string,
    name: string
  },
  phone_number: string,
  address: string | null,
  city: string | null,
  state: string | null,
  postal_code: string | null,
  country: string | null,
  profilepic: string | null,
  created_at: string,
  updated_at: string
}

export type userListPagination = {
  data: userData[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

export interface UserState {
  page: number,
  maxPage: number,
  amountUser: number
  paginationData: userListPagination,
}

const initialState: UserState = {
  page: 1,
  maxPage: 1,
  amountUser: 0,
  paginationData: {} as userListPagination,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPage_user: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },

    setPaginationData_user: (state, action: PayloadAction<userListPagination>) => {
      state.paginationData = action.payload
    },

    setMaxPage_user: (state, action: PayloadAction<number>) => {
      state.maxPage = action.payload
    },

    setAmountUser: (state, action: PayloadAction<number>) => {
      state.amountUser = action.payload
    },

    removeUser: (state, action: PayloadAction<{ userId: string }>) => {
      const initialLength = state.paginationData.data.length;
      state.paginationData.data = state.paginationData.data.filter(user => user.id != action.payload.userId)
      const finalLength = state.paginationData.data.length;

      if (initialLength > finalLength) {
        state.amountUser -= 1;
        state.paginationData.pagination.total -= 1;
        state.paginationData.pagination.totalPages = Math.ceil(
          state.paginationData.pagination.total /
          state.paginationData.pagination.limit
        );
        state.maxPage = state.paginationData.pagination.totalPages;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPage_user, setPaginationData_user, setMaxPage_user, setAmountUser, removeUser } = userSlice.actions

export default userSlice.reducer