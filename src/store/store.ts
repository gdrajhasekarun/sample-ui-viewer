import { configureStore } from "@reduxjs/toolkit";
import aiTestCaseReducer from "./feature/ai-testcase.ts";
import { authApi } from "./api/auth.api.slice.ts";
import authReducer from "./feature/auth.slice.ts";

export const store = configureStore({
  reducer: {
    aiTestcases: aiTestCaseReducer,
    authState: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
