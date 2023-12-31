import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import teachersArray from "../Teachers";

//FETCH
export const fetchTeacher = createAsyncThunk("teachers/fetchTeacher", () => {
  // return teachersArray;
  return db
    .collection("FACULTIES")
    .get()
    .then((snap) => {
      const teachers = [];
      snap.forEach((doc) => {
        teachers.push({ ...doc.data(), id: doc.id });
      });
      return teachers;
      // return teachersArray;
    });
});

const facultiesSlice = createSlice({
  name: "teachers",
  initialState: {
    teacherArray: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchTeacher.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTeacher.fulfilled]: (state, action) => {
      state.loading = false;
      state.teacherArray = action.payload;
    },
    [fetchTeacher.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});
export default facultiesSlice.reducer;
