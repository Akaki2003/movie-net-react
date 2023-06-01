import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type ObjType = {
  name: string
  img: string
}

export const CreateActor = createAsyncThunk(
  'actor/post',
  async (obj: ObjType) => {
    const apiUrl = `http://localhost:5119/v1/Actors/AddActor`

    await axios
      .post(apiUrl, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)
