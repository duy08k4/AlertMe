import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface StaffState {

}

const initialState: StaffState = {

}

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {  } = staffSlice.actions

export default staffSlice.reducer