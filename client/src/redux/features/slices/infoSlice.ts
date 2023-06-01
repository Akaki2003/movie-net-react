import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showMoreDec: false,
  showMoreActor: false,
}

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    openDec: (state) => {
      state.showMoreDec = !state.showMoreDec
    },
    openActor: (state) => {
      state.showMoreActor = !state.showMoreActor
    },
  },
})

export default infoSlice.reducer
export const { openDec, openActor } = infoSlice.actions
