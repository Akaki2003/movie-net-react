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
    section: `signupbg flex items-end justify-between `,
    form: `w-[50%]  h-[100%] flex items-center justify-center   `,
    inputDiv: `flex flex-col gap-2 bg-[#232323] w-[50%] h-[50%] rounded-[70px] items-center justify-center `,
    input: `h-[3.3rem] w-[22rem] shadow-inner py-2   flex items-center justify-between bg-[#ec2b58]  outline-none rounded-[30px] px-10`,
    icon: `text-white  text-[1.5rem]`,
    btn: `h-[3.3rem] w-[22rem] bg-[#ec2b58] rounded-[30px] text-white  hover:bg-pink-700 text-[1.2rem]`,
  }
  if (!userData.unique_name) {
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
        {/* <img className="w-[500px] h-[500px]  bretImg" src={bret} /> */}
      </section>
    )
  } else {
    return <Navigate to="/user-main" />
  }
}

export default LogIn
