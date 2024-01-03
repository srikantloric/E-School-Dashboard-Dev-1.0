import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from './counterSlice'
import studentslice from "./studentSlice";
import facultiesSlice from "./facultiesSlice";
import studentPaymentSlice from "./studentPaymentSlice";

export const store = configureStore({
  reducer: {
    students: studentslice,
    teachers: facultiesSlice,
    studentPayemnt:studentPaymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
