import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type adminData = {
    access_token: string,
    refresh_token: string,
    user: {
        id: string,
        email: string,
        supabase_id: string,
        role_id: string,
        created_at: string, // 2025-11-18T23:59:33.379Z
        updated_at: string, // 2025-11-18T23:59:33.379Z
        role: {
            id: string,
            name: string
        },
        profile: {
            id: string,
            username: string,
            phone_number: string | null,
            address: string | null,
            city: string | null,
            state: string | null,
            postal_code: string | null,
            country: string | null,
            profilepic: string | null,
            created_at: string,
            updated_at: string
        }
    },
    expires_in: number,
    expires_at: number
}

export interface AdminState {
    profile: adminData['user']
}

const initialState: AdminState = {
    profile: {} as adminData['user']
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminProfile: (state, action: PayloadAction<adminData['user']>) => {
            const adminDataInput = action.payload
            if (Object.keys(adminDataInput).length === 0) return
            state.profile = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAdminProfile } = adminSlice.actions

export default adminSlice.reducer