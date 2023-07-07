import { createSlice } from '@reduxjs/toolkit'
import { GetReviews } from '../Thunks/ReviewsCrud'
const initialState = {
  reviews: [],
}

const ReviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    getReviews: (state, actions) => {
      state.reviews = actions.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetReviews.fulfilled, (state, action) => {
      state.reviews = action.payload
    })
  },
})

export default ReviewsSlice.reducer
export const { getReviews } = ReviewsSlice.actions
