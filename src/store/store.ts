import { configureStore } from '@reduxjs/toolkit'
import aiTestCaseReducer from './feature/ai-testcase.ts'

export const store = configureStore({
    reducer: {
        aiTestcases: aiTestCaseReducer
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;