import React, { useEffect } from 'react'
import { getCookies, LogOut } from '../../redux/features/slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { Link, useNavigate } from 'react-router-dom'
import PostMovie from './Create_Movie/PostMovie'
const UserPanel = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()

  const hanndleLogout = () => {
    dispatch(LogOut())
    navigate('/login')
  }
  const [loading, setLoading] = React.useState<string>('Loading...')

  const userData = useSelector((state: any) => state.auth.userDecoded)

  // useEffect(() => {
  //   dispatch(getCookies())
  // }, [])
  if (userData?.unique_name) {
    return (
      <div className="w-[100%] h-[1200px] flex-col flex items-center  justify-start py-20">
        <h1 className="text-white text-[4rem]"> {userData.unique_name}</h1>
        {/* <button
          className="text-red-600 text-[2rem]"
          onClick={() => hanndleLogout()}
        >
          LOG OUT
        </button> */}
        <PostMovie />
      </div>
    )
  } else {
    setTimeout(() => {
      setLoading('to accsess this page')
    }, 3000)

    return (
      <div className="w-[100%] h-[100vh] flex items-center justify-center">
        {loading === 'Loading...' ? (
          <h1 className="text-white text-[2rem]"> {loading}</h1>
        ) : (
          <span className="text-white text-[2rem] ">
            <Link
              className="text-blue-400 hover:underline text-blue-500"
              to="/login"
            >
              Log in
            </Link>
            {loading}
          </span>
        )}
      </div>
    )
  }
}

export default UserPanel
