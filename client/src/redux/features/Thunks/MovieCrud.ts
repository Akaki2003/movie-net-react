import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovieData } from '../slices/dataSlice'

import axios from 'axios'
import { UpdatedValuesType } from '../../../pages/UserPages/UpdateMovie/UpdateMovie'
type MovieObjectType = {
  title: string
  color: string
  color2: string
  img: string
  video: string
  description: string

  rating: {
    imDb: number
    rottenTomatoes: number
  }
  actors: string[]
  metadata: {
    hr: string
    year: number
    genre: string
  }
}

type GetMoviesType = {
  dispatch: ThunkDispatch<any, any, any>
}
const CreateMovie = createAsyncThunk(
  'movie/post',
  async (obj: MovieObjectType) => {
    const apiKey = `http://localhost:5119/v1/Movies/AddMovie`
    await axios
      .post(apiKey, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

const GetAllMovies = createAsyncThunk(
  'movie/get',
  async (val: GetMoviesType) => {
    const apiKey = `http://localhost:5119/v1/Movies/GetAllMovies?isDeleted=false`

    const data = await axios
      .get(apiKey)
      .then((res) => res.data)
      .catch((err) => console.log(err))
    val.dispatch(getMovieData(data))
    console.log(data)
  },
)

const DeleteMovie = createAsyncThunk('movie/delete', async (id: number) => {
  const apiUrl = `http://localhost:5119/v1/Movies/DeleteMovie/?id=${id}`

  await axios
    .delete(apiUrl)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
})

const UpdateMovieThunk = createAsyncThunk(
  'movie/patch',
  async ({ id, obj }: { id: string; obj: UpdatedValuesType }) => {
    const apiUrl = `http://localhost:5119/v1/Movies/UpdateMovie`

    // obj.actors = [
    //   {
    //     id: 0,
    //     name: 'Tim Robbins',
    //     img: 'https://www.example.com/images/tim_robbins.jpg',
    //   },
    // ]
    await axios
      .put(apiUrl, obj)
      .then((res) => console.log(res))
      .then((err) => console.log(err))
  },
)
export { CreateMovie, GetAllMovies, DeleteMovie, UpdateMovieThunk }
