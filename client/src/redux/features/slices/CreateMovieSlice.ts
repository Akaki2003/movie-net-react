import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  title: string
  description: string
  photoUrl: string
  length: string
  year: string
  genere: string
  actorName: string
  img: string
  imDb: number
  rottenTomatoes: string
  video: string
  actors: string[]
}

const initialState: initialStateType = {
  title: '',
  description: '',
  photoUrl: '',
  length: ``,
  year: '',
  genere: '',
  actorName: '',
  img: '',
  imDb: 0,
  rottenTomatoes: '',
  video: '',
  actors: [],
}

const CreateMovieSlice = createSlice({
  name: 'create-movie',
  initialState,
  reducers: {
    getTitle: (state, action) => {
      state.title = action.payload
    },
    getDescription: (state, action) => {
      state.description = action.payload
    },
    getPhotoUrl: (state, action) => {
      state.photoUrl = action.payload
    },
    getLength: (state, action) => {
      state.length = action.payload
      // console.log(action.payload)
    },
    getYear: (state, action) => {
      console.log(action.payload)
      state.year = action.payload
    },
    getGenre: (state, action) => {
      // console.log(action.payload)
      state.genere = action.payload
    },
    getActor: (state, action) => {
      state.actorName = action.payload
    },
    getImg: (state, action) => {
      state.img = action.payload
    },
    getImDb: (state, action) => {
      state.imDb = action.payload
    },
    getTomatos: (state, action) => {
      state.rottenTomatoes = action.payload
    },
    getVideo: (state, action) => {
      state.video = action.payload
    },
    getActors: (state, action) => {
      state.actors = action.payload
    },
  },
})

export default CreateMovieSlice.reducer
export const {
  getTitle,
  getDescription,
  getPhotoUrl,
  getLength,
  getYear,
  getGenre,
  getActor,
  getImg,
  getImDb,
  getTomatos,
  getVideo,
  getActors,
} = CreateMovieSlice.actions
