import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getReviews } from '../slices/ReviewsSlice'
import axios from 'axios'

type ReviewsGetType = {
  dispatch: ThunkDispatch<any, any, any>
  movieId: string
}

export type ReviewsPostType = {
  comment: string
  userName: string
  userId: string
  rate: number
  movieId: string
}
const baseUrl = `http://localhost:5119`

export const GetReviews = createAsyncThunk(
  'reviews/get',
  async (obj: ReviewsGetType) => {
    const data = await axios
      .get(`${baseUrl}/v1/Movies/Reviews/${obj.movieId}`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
    obj.dispatch(getReviews(data))
  },
)

export const PostReviews = createAsyncThunk(
  'reviews/post',
  async (obj: ReviewsPostType) => {
    await axios
      .post(`${baseUrl}/v1/Movies/Reviews/${obj.movieId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)
