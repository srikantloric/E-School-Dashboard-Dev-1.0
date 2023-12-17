import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchstudent = createAsyncThunk(
  "teacher/fetchteacher",
  async () => {}
);

const facultiesSlice = createSlice({
  name: "teacher",
  initialState: {
    teacherArray: [],
    loading: false,
    error: null,
  },
});
export default facultiesSlice.reducer;
