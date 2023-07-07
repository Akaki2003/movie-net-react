import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import {
  getPassword,
  getEmail,
  getCookies,
} from '../../redux/features/slices/AuthSlice'
import { Login } from '../../redux/features/Thunks/AuthThunk'
import { useNavigate, Navigate } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import Input from './Input'
import { RiLockPasswordFill } from 'react-icons/ri'
import patrik from '../../assets/background/patrik.png'

const LogIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const userData = useSelector((state: any) => state.auth.userDecoded)
  const [password, setPassword] = React.useState<string>('')
  const [username, setUserName] = React.useState<string>('')
  // const { username, password, jwt } = useSelector((state: any) => state.auth)
  const loginhanddler = async () => {
    if (username && password) {
      await dispatch(Login({ dispatch, password, username }))
      dispatch(getCookies())
      navigate('/user-main')
    }
  }
  const style = {
    section: `signupbg flex items-end justify-between  max_lg:bg-gray-800  max_lg:items-center max_lg:justify-center    `,
    form: `w-[50%]  h-[100%] max_lg:bg-gray-800   max_lg:w-[100%] flex items-center justify-center   `,
    inputDiv: `flex flex-col gap-4 bg-[#232323] w-[60%] max_lg:rounded-[20px] max_lg:gap-5 max_lg:bg-gray-100  max_Xll:w-[70%] max_lg:w-[400px]  max_smm:w-[95%] backdrop-blur-sm bg-white/10  boxshaddow h-[50%] rounded-[70px] items-center justify-center `,
    input: `h-[3.3rem] w-[80%] shadow-inner py-2  max_lg:rounded-[20px] boxshaddow flex items-center justify-between bg-[#ec2b58] max_lg:bg-blue-300 max_lg:text-[#ec2b58]  outline-none rounded-[30px] px-10`,
    icon: `text-white  text-[1.5rem]    `,
    btn: `h-[3.3rem] w-[80%] bg-[#ec2b58] boxshaddow max_lg:rounded-[20px]  rounded-[30px] text-white  hover:bg-pink-700 text-[1.2rem] max_lg:bg-blue-300`,
    header: `text-white absolute  top-80 right-[17rem] max_Xll:right-[10rem] max_lg:hidden  max_Xll:text-[2rem] text-[3rem] flex  items-center flex-col max_Xll:w-[30rem] w-[37rem]`,
  }
  if (!userData?.user && !userData?.user?.username) {
    return (
      <section className={style.section}>
        <div className={style.form}>
          <div className={style.inputDiv}>
            <div className={style.input}>
              <AiOutlineMail className={style.icon} />{' '}
              <Input fun={setUserName} placeholder="EMAIL" type="email" />
            </div>
            <div className={style.input}>
              <RiLockPasswordFill className={style.icon} />{' '}
              <Input fun={setPassword} placeholder="PASSWPRD" type="password" />
            </div>

            <button onClick={() => loginhanddler()} className={style.btn}>
              Log in
            </button>
          </div>
        </div>
        <h1 className={style.header}>
          <span className={'text-[4rem]  max_Xll:text-[3rem]'}>
            Welcome back
          </span>{' '}
          <span> my sinister companion. </span>
        </h1>
        <img
          className="w-[500px] h-[500px] max_Xll:w-[400px] max_lg:hidden bretImg"
          src={patrik}
        />
      </section>
    )
  } else {
    return <Navigate to="/user-main" />
  }
}

export default LogIn
