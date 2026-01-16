import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Step {
  id: number;
  step: string;
  expRes: string;
  action?: string;
  locator?: string;
  dataKey?: string;
  validationAction?: string;
  validationLocator?: string;
}

export interface TestCase {
  name: string;
  steps: Step[];
}

export interface AiTestCaseState {
  testCases: TestCase[];
  loading: boolean;
  error: string | null;
  testCase: TestCase | null;
}

const initialState: AiTestCaseState = {
  testCases: [],
  loading: false,
  error: null,
  testCase: null,
};

export const getAllTestCases = createAsyncThunk(
  "ai-testcase/getAllTestCases",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`api/testcases`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Error response was received");
      const data = await response.json();
      return { data };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Upload failed");
    }
  }
);

export const aiTestCaseSlice = createSlice({
  name: "ai-test-case",
  initialState,
  reducers: {
    getTestcase: (state, action: PayloadAction<{ index: number }>) => {
      state.testCase = state.testCases[action.payload.index];
    },
    updateTestCase: (state, action: PayloadAction<{ data: TestCase }>) => {
      state.testCase = action.payload.data;
    },
  },
});

export const { getTestcase, updateTestCase } = aiTestCaseSlice.actions;
export default aiTestCaseSlice.reducer;
