import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { reportStatus } from '../../configs/reportStatus'

export type reportPagination = {
    id: string,
    name: string,
    details: string,
    status: keyof typeof reportStatus,
    attachment_paths: string[],
    lat: number,
    lng: number,
    user_id: string,
    created_at: string,
    updated_at: string,
    user: {
        id: string,
        username: string,
        phone_number: null,
        address: null,
        city: null,
        state: null,
        postal_code: null,
        country: null,
        profilepic: null,
        created_at: string,
        updated_at: string
    },
    tasks: [],
    responses: []
}

export type reportListPagination = {
    data: reportPagination[]
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}

export interface ReportState {
    page: number,
    maxPage: number,
    amountReports: number
    paginationData: reportListPagination

}

const initialState: ReportState = {
    page: 1,
    maxPage: 1,
    amountReports: 0,
    paginationData: {} as reportListPagination
}

export const reportSlice = createSlice({
    name: 'report',
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

        setAmountReports: (state, action: PayloadAction<number>) => {
            const amount = action.payload
            if (!amount || amount < 1) return
            state.amountReports = amount
        },

        setPaginationData: (state, action: PayloadAction<reportListPagination>) => {
            const pageData = action.payload

            if(!pageData) return
            state.paginationData = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPage, setMaxPage, setAmountReports, setPaginationData } = reportSlice.actions

export default reportSlice.reducer