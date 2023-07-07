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
  if (userData.user && userData.user.username) {
    return (
      <div className="w-[100%]  max_lg:h-[100%]  h-[1200px] flex-col flex items-center  justify-start py-20">
        <div className="flex flex-col items-start">
          <h1
            className="text-white text-[1.5rem] max_lg:"
            onClick={() => userData}
          >
            {userData.user.username}
          </h1>
          <h1 className="text-white  text-[1.5rem]">
            Role: <span className="text-yellow-600">{userData.user.role}</span>
          </h1>
        </div>
        {/* <button
          className="text-red-600 text-[2rem]"
          onClick={() => hanndleLogout()}
        >
          LOG OUT
        </button> */}
        {userData.user.role === 'admin' && <PostMovie />}
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
