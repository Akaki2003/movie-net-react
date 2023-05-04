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
      state.showMoreDec = true
      state.showMoreActor = false
    },
    openActor: (state) => {
      state.showMoreDec = false
      state.showMoreActor = true
    },
  },
})

export default infoSlice.reducer
export const { openDec, openActor } = infoSlice.actions
