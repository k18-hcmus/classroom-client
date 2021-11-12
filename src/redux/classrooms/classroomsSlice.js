import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from '../../axiosClient'

export const fetchClassrooms = createAsyncThunk(
  'classrooms/fetchClassrooms',
  async () => {
    const response = await axiosClient.get('api/classrooms')
    return response.data
  }
)

const initialState = {
  classrooms: [],
}

const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState,
  reducers: {
    classroomsLoaded(state, action) {},
  },
  extraReducers: {
    [fetchClassrooms.fulfilled]: (state, action) => {
      state.classrooms = [...state.classrooms, ...action.payload]
    },
  },
})

const { actions, reducer } = classroomsSlice

export const { classroomsLoaded } = actions

export default reducer
