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
  IMDb: number
  RottenTomatos: string
  video: string
  actors: {
    name: string
    img: string
  }[]
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
  IMDb: 0,
  RottenTomatos: '',
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
    removePhotoUrl: (state) => {
      state.photoUrl = ''
    },
    getLength: (state, action) => {
      state.length = action.payload
      // (action.payload)
    },
    getYear: (state, action) => {
      action.payload
      state.year = action.payload
    },
    getGenre: (state, action) => {
      // (action.payload)
      state.genere = action.payload
    },
    getActor: (state, action) => {
      state.actorName = action.payload
    },
    getImg: (state, action) => {
      state.img = action.payload
    },
    getIMDb: (state, action) => {
      state.IMDb = action.payload
    },
    getTomatos: (state, action) => {
      state.RottenTomatos = action.payload
    },
    getVideo: (state, action) => {
      state.video = action.payload
    },
    getActors: (state, action) => {
      action.payload(state.actors)
      state.actors = action.payload
    },
  },
})

export default CreateMovieSlice.reducer
export const {
  getTitle,
  getDescription,
  getPhotoUrl,
  removePhotoUrl,
  getLength,
  getYear,
  getGenre,
  getActor,
  getImg,
  getIMDb,
  getTomatos,
  getVideo,
  getActors,
} = CreateMovieSlice.actions
