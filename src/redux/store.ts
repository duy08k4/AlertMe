import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/admin'
import staffReducer from './reducers/staff'
import reportReducer from './reducers/report'
import userManagementReducer from './reducers/user'

export const store = configureStore({
    reducer: {
        user: userReducer,
        staff: staffReducer,
        report: reportReducer,
        userManagement: userManagementReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch