import { createSlice } from '@reduxjs/toolkit'
import { movieDataType } from '../../../assets/dummydata/data'
import { RootState } from '../../store/store'
import { createSelector } from '@reduxjs/toolkit'
import { GetAllMovies } from '../Thunks/MovieCrud'
export const initialState = {
  movieData: [],
}

const dataSlice = createSlice({
  name: 'film-data',
  initialState,
  reducers: {
    getMovieData: (state, action) => {
      state.movieData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllMovies.fulfilled, (state, action) => {
      state.movieData = action.payload
    })
  },
})

export const selectData = createSelector(
  (state: RootState) => state.data.movieData,
  (movieData: any) => movieData,
)

export default dataSlice.reducer
export const { getMovieData } = dataSlice.actions
