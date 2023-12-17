import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './counterSlice'
import studentslice from './studentSlice'
import facultiesSlice from './facultiesSlice'






export const store = configureStore({
    reducer: {
      student:studentslice,
      teacher:facultiesSlice,
      
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    
    serializableCheck: false,
  }),
})