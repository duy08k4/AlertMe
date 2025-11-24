import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './reducer/admin'
import staffReducer from './reducer/staff'
import userReducer from './reducer/user'
import reportReducer from './reducer/report'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        staf: staffReducer,
        user: userReducer,
        report: reportReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch