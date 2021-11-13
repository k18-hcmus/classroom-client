import { configureStore } from '@reduxjs/toolkit'
import classroomsReducer from './components/classroom/classroomsSlice'

export const store = configureStore({
  reducer: {
    classrooms: classroomsReducer,
  },
})
