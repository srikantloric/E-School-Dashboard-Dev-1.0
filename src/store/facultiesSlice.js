import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";


//FETCH
export const fetchteacher = createAsyncThunk(
  "teacher/fetchteacher",
   () => {
    return db
    .collection("Faculty")
    .get()
    .then((snap) => {
      const teachers = [];
        snap.forEach((doc) => {
          teachers.push({ ...doc.data(), id: doc.id });
        });
        return teachers;
      })

   }
);

const facultiesSlice = createSlice({
  name: "teacher",
  initialState: {
    teacherArray: [],
    loading: false,
    error: null,
  },
  extraReducers:{
    [fetchteacher.pending]: (state) => {
      state.loading = true;
    },
    [fetchteacher.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentarray = action.payload;

    },
    [fetchteacher.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  }
});
export default facultiesSlice.reducer;
