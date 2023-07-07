import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deletePopUp: false,
}

const MovieInnerSlice = createSlice({
  name: 'movie-inner',
  initialState,
  reducers: {
    popUpDelete: (state) => {
      state.deletePopUp = !state.deletePopUp
    },
  },
})

export default MovieInnerSlice.reducer

export const { popUpDelete } = MovieInnerSlice.actions
