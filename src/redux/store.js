import { configureStore } from '@reduxjs/toolkit'
import classroomsReducer from './classrooms/classroomsSlice'

export const store = configureStore({
  reducer: {
    classrooms: classroomsReducer,
  },
})
