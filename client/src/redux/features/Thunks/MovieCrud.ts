import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovieData } from '../dataSlice'
import axios from 'axios'
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
    const apiKey = `http://localhost:5119/v1/Movies/GetAllMovies`

    const data = await axios
      .get(apiKey)
      .then((res) => res.data)
      .catch((err) => console.log(err))
    val.dispatch(getMovieData(data))
    console.log(data)
  },
)

export { CreateMovie, GetAllMovies }
