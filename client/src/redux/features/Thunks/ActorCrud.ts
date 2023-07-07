import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../global-vars'
type ObjType = {
  name: string
  img: string
  _id?: string
}

export const CreateActor = createAsyncThunk(
  'actor/post',
  async (obj: ObjType) => {
    const apiUrl = `${baseUrl}/v1/Actors/AddActor`

    await axios
      .post(apiUrl, obj)
      .then((res) => res)
      .catch((err) => err)
  },
)

export const GetActors = createAsyncThunk('actor/get', async () => {
  const apiUrl = `${baseUrl}/v1/Actors/GetAllActors`

  const data = await axios
    .get(apiUrl)
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => err)
  return data
})

export const updateActor = createAsyncThunk(
  'actor/update',
  async (obj: ObjType) => {
    const apiUrl = `${baseUrl}/v1/Actors/CRUD/${obj._id}`
    await axios
      .patch(apiUrl, obj)
      .then((res) => res)
      .then((err) => err)
  },
)

export const deleteActor = createAsyncThunk(
  'actor/delete',
  async (id: string) => {
    const apiUlr = `${baseUrl}/v1/Actors/CRUD/${id}`

    await axios
      .delete(apiUlr)
      .then((res) => res)
      .catch((err) => err)
  },
)
