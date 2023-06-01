import React from 'react'
import { motion as m } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { DeleteMovie } from '../../../redux/features/Thunks/MovieCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

const EditDeleteDropDown = ({
  dropDown,
  id,
}: {
  dropDown: boolean
  id: number
}) => {
  const style = {
    mainDiv: ` flex flex-col justfy-center items-center  gap-2  absolute w-[200px] h-[125px] bg-gray-600/90  right-0 top-10 rounded-[20px]`,
    btn: `py-3 px-4 w-[90%] mt-2 inline-flex justify-center items-center gap-2 rounded-[20px] bg-gray-100 border border-transparent font-semibold text-gray-800 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-white`,
  }
  const mainDivVariants = {
    hidden: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0 },
  }

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()
  return (
    <m.div
      animate={!dropDown ? 'hidden' : 'visible'}
      variants={mainDivVariants}
      transition={{ duration: 0.2 }}
      className={style.mainDiv}
    >
      <button
        onClick={() => navigate(`/movie-edit/${id}`)}
        className={style.btn}
      >
        Edit
      </button>
      <button onClick={() => dispatch(DeleteMovie(id))} className={style.btn}>
        Delete
      </button>
    </m.div>
  )
}

export default EditDeleteDropDown
