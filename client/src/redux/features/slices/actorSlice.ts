import { createSlice } from '@reduxjs/toolkit'
import { GetActors } from '../Thunks/ActorCrud'

const initialState = {
  actorData: [],
}

const ActorSlice = createSlice({
  name: 'actor-data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetActors.fulfilled, (state, action) => {
      state.actorData = action.payload
    })
  },
})

export default ActorSlice.reducer
