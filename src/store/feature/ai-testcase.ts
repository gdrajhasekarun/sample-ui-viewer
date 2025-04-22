import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface Step {
    id: number
    step: string,
    expRes: string,
    action?: string,
    locator?: string,
    dataKey?: string,
    validationAction?: string,
    validationLocator?: string,
}

export interface TestCase {
    name: string,
    steps: Step[]
}

export interface AiTestCaseState {
    testCases: TestCase[]
    loading: boolean
    error: string | null
    testCase: TestCase | null
}

const initialState: AiTestCaseState = {
    testCases: []
    , loading: false
    , error: null,
    testCase: null
}

export const getAllTestCases = createAsyncThunk(
    "ai-testcase/getAllTestCases",
    async (_, {rejectWithValue}) => {
        try{
            const response = await fetch(`api/testcases`, {
                method: 'GET'
            })
            if (!response.ok)
                throw new Error('Error response was received');
            const data = await response.json();
            return {data};
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch (error) {
            return rejectWithValue("Upload failed");
        }
    }
)


export const aiTestCaseSlice = createSlice({
    name: "ai-test-case",
    initialState,
    reducers: {
        getTestcase: (state, action: PayloadAction<{index: number}>) => {
            state.testCase = state.testCases[action.payload.index]
        },
        updateTestCase: (state, action: PayloadAction<{ data: TestCase }>) => {
            state.testCase = action.payload.data
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTestCases.pending, state => {
                state.loading = true
                state.testCases = []
                state.error = ''
                state.testCase = null
            })
            .addCase(getAllTestCases.fulfilled, (state, action) => {
                state.loading = false
                state.testCases = action.payload.data
            })
            .addCase(getAllTestCases.rejected, (state) => {
                state.loading = false
                state.testCases = []
                state.error = 'Unable to retrive the Test cases'
            })
    }
})

export const { getTestcase, updateTestCase } = aiTestCaseSlice.actions;
export default aiTestCaseSlice.reducer;