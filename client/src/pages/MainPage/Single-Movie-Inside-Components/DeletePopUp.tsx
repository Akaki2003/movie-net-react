import React from 'react'
import { popUpDelete } from '../../../redux/features/slices/movieInner'
import { useDispatch } from 'react-redux'
import {
  DeleteMovie,
  GetAllMovies,
} from '../../../redux/features/Thunks/MovieCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

const DeletePopUp = ({ _id }: { _id: string }) => {
  const style = {
    mainDiv: `bg-gray-100 boxshaddow w-[400px] h-[220px] rounded-[20px] absolute z-50 top-[30rem] flex items-center  justify-around`,
    redBtn: `text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
    blueBtn: `text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()
  const handdleDelete = async () => {
    _id
    if (_id) {
      await dispatch(DeleteMovie(_id))

      dispatch(popUpDelete())

      navigate('/')

      await dispatch(GetAllMovies({ pages: 1, year: '', genre: '', sort: '' }))
    }
  }
  return (
    <div className={style.mainDiv}>
      <button onClick={handdleDelete} className={style.redBtn}>
        Delete
      </button>
      <button onClick={() => dispatch(popUpDelete())} className={style.blueBtn}>
        Cancel
      </button>
    </div>
  )
}

export default DeletePopUp
