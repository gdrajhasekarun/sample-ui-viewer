import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionResponse } from "../model/auth.model";

interface Authentication {
  sessionResponse: SessionResponse | undefined;
  createdTime?: Date;
}

export const initialState: Authentication = {
  sessionResponse: undefined,
  createdTime: undefined,
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveSession: (state, action: PayloadAction<{ token: SessionResponse }>) => {
      state.sessionResponse = action.payload.token;
      state.createdTime = new Date(); // Set to current time
    },
  },
});

export const { saveSession } = AuthSlice.actions;
export default AuthSlice.reducer;
