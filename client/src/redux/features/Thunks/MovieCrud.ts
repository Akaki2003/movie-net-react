import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovieData } from '../slices/dataSlice'
import { baseUrl } from '../../../global-vars'

import axios from 'axios'
import { UpdatedValuesType } from '../../../pages/UserPages/UpdateMovie/UpdateMovie'
export type MovieObjectType = {
  title: string
  color: string
  color2: string
  img: string
  video: string
  description: string

  rating: {
    IMDb: number
    RottenTomatos: number
  }
  actors: {
    name: string
    img: string
    _id: string
  }[]
  metadata: {
    hr: string
    year: number
    genre: string
  }
  userId: string
}

type GetMoviesType = {
  pages: number
  year: string
  genre: string
  sort: string
}

const CreateMovie = createAsyncThunk(
  'movie/post',
  async (obj: MovieObjectType) => {
    const apiKey = `${baseUrl}/v1/Movies/AddMovie`
    await axios
      .post(apiKey, obj)
      .then((res) => res)
      .catch((err) => err)
  },
)

const GetAllMovies = createAsyncThunk(
  'movie/get',
  async (val: GetMoviesType) => {
    const apiKey = `${baseUrl}/v1/Movies/GetAllMovies?PageNumber=${String(
      val.pages,
    )}&PageSize=6&sortBy=${val.sort}&genre=${val.genre}&year=${val.year}`
    // /GetAllMovies?PageNumber=3&PageSize=5&sortBy=Year&genre=ujas&year=2008&isDeleted=false
    const data = await axios
      .get(apiKey)
      .then((res) => res.data)
      .catch((err) => err)
    return data
  },
)

const DeleteMovie = createAsyncThunk('movie/delete', async (_id: string) => {
  const apiUrl = `${baseUrl}/v1/Movies/DeleteMovie/${String(_id)}`

  await axios
    .delete(apiUrl)
    .then((res) => res)
    .catch((err) => err)
})

const UpdateMovieThunk = createAsyncThunk(
  'movie/put',
  async ({ _id, obj }: { _id: string; obj: UpdatedValuesType }) => {
    const id = _id
    const apiUrl = `${baseUrl}/v1/Movies/UpdateMovie/${id}`

    // obj.actors = [
    //   {
    //     id: 0,
    //     name: 'Tim Robbins',
    //     img: 'https://www.example.com/images/tim_robbins.jpg',
    //   },
    // ]
    await axios
      .patch(apiUrl, obj)
      .then((res) => res)
      .then((err) => err)
  },
)
export { CreateMovie, GetAllMovies, DeleteMovie, UpdateMovieThunk }
