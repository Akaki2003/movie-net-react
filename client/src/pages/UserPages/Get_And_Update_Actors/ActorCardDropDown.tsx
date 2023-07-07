import { ThunkDispatch } from '@reduxjs/toolkit'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  GetActors,
  deleteActor,
} from '../../../redux/features/Thunks/ActorCrud'
type ActorProp = {
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  id: string
}
const ActorCardDropDown: FC<ActorProp> = ({
  edit,
  setEdit,
  setDropDown,
  id,
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const style = {
    mainDiv: `w-[100%] h-[92%] flex flex-col justify-center px-2 bg-gray-200 absolute rounded-[10px]`,
    redBtn: `text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2`,
    blueBtn: `text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center   mb-2`,
  }
  const handleDelete = async () => {
    await dispatch(deleteActor(id))
    await dispatch(GetActors())
  }
  return (
    <div className={style.mainDiv}>
      <button
        className={style.blueBtn}
        onClick={() => {
          setEdit(!edit), setDropDown(false)
        }}
      >
        Edit
      </button>
      <button className={style.redBtn} onClick={() => handleDelete()}>
        Delete
      </button>
    </div>
  )
}

export default ActorCardDropDown
