import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { reportStatus } from '../../configs/reportStatus'

export type staffDataList = {
  data: [
    {
      id: string,
      email: string,
      name: string,
      role_id: string,
      is_new_user: true,
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
          status: keyof typeof reportStatus,
          created_at: string,
          updated_at: string,
          report: {
            id: string,
            name: string,
            details: string,
            status: keyof typeof reportStatus
          }
        }
      ]
    }
  ],
  total: number,
  page: number,
  limit: number
}

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
export const { } = staffSlice.actions

export default staffSlice.reducer