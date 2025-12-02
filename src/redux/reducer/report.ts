import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { reportStatus, TaskStatusKey } from '../../configs/reportStatus'

export type taskObject = {
    id: string,
    report_id: string,
    assigned_by: string,
    task_details: string,
    status: TaskStatusKey,
    created_at: string,
    updated_at: string,
    assignedBy: {
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
    },
    assignedStaff: [
        {
            id: string,
            username: string,
            name: string | null,
            email: string | null,
            phone_number: string,
            address: string,
            city: string,
            state: string,
            postal_code: string,
            country: string,
            profilepic: string,
            created_at: string,
            updated_at: string
        }
    ]
}

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
    tasks: taskObject[],
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

export type sosReport = {
    id: string,
    user_id: string,
    lat: number,
    lng: number,
    created_at: string
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
    paginationData: {} as reportListPagination,

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

            if (!pageData) return
            state.paginationData = action.payload
        },

        addNewReport: (state, action: PayloadAction<reportPagination>) => {
            const reportData = action.payload

            if (reportData && Object.keys(reportData).length > 0 && state.page === 1) {
                state.paginationData.data.unshift(reportData)
                state.amountReports += 1
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

        updateReportStatus: (state, action: PayloadAction<{ reportId: string; status: keyof typeof reportStatus }>) => {
            const { reportId, status } = action.payload;

            state.paginationData.data = state.paginationData.data.map(report =>
                report.id === reportId
                    ? { ...report, status }
                    : report
            );
        }

    },
})

// Action creators are generated for each case reducer function
export const { setPage, setMaxPage, setAmountReports, setPaginationData, addNewReport, updateReportStatus } = reportSlice.actions

export default reportSlice.reducer
