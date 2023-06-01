import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  index: 0,
}

const slideSlice = createSlice({
  name: 'slid',
  initialState,
  reducers: {
    increment: (state, { payload }: { payload: number }) => {
      // console.log(payload, state.index)
      if (state.index > payload - 2) {
        state.index = 0
      } else {
        state.index++
      }
    },
    decrement: (state, { payload }: { payload: number }) => {
      if (state.index <= 0) {
        state.index = payload - 1
      } else {
        state.index--
      }
    },
    selectorHanddler: (state, { payload }: { payload: number }) => {
      state.index = payload
    },
  },
})

export default slideSlice.reducer

export const { increment, decrement, selectorHanddler } = slideSlice.actions
