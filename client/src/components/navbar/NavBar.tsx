import React, { useEffect, useState } from 'react'
import Auth from './Auth'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import NavDropDown from './NavDropDown'
import Cookies from 'universal-cookie'
import { getCookies } from '../../redux/features/slices/AuthSlice'
// import jwt from 'jwt-decode'
import { FaBars } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import Menu from './Menu'
const NavBar = () => {
  const navigate = useNavigate()
  const style = {
    nav: `w-[100%] relative   Zindex  h-[100px] max_smm1:px-5 backdrop-blur-sm bg-white/10  flex items-center justify-between px-20`,
    icno: `text-[3rem] text-white bg-pink-600 rounded-[50%] cursor-pointer`,
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  // const cookies = new Cookies()

  const userData = useSelector((state: any) => state.auth.userDecoded)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [dropDownNav, setDropDownNav] = useState<boolean>(false)
  useEffect(() => {
    if (userData?.user && userData?.user.username) {
      dispatch(getCookies())
    }
  }, [])
  React.useEffect(() => {
    const handleOutclick = (e: { target: any }) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', handleOutclick)
    return () => {
      document.removeEventListener('mousedown', handleOutclick)
    }
  }, [dropDownRef])
  return (
    <nav onClick={() => userData.user} ref={dropDownRef} className={style.nav}>
      <div className="flex gap-20 max_smm1:hidden">
        <button className="text-white" onClick={() => navigate('/')}>
          HOME
        </button>
        <button className="text-white" onClick={() => navigate('/actors')}>
          ACTORS
        </button>
      </div>
      <FaBars
        onClick={() => setDropDownNav(!dropDownNav)}
        className="text-[2rem] text-white  min_smm1:hidden"
      />
      {dropDownNav && <Menu />}
      {/* <button onClick={() => (userData)}>LOg</button> */}
      {userData?.user && userData.user.username ? (
        <p style={{ cursor: 'pointer' }} className="cursor-pointer ">
          <FaUserCircle
            onClick={() => setDropDown(!dropDown)}
            className={style.icno}
          />
        </p>
      ) : (
        <Auth />
      )}
      {dropDown && <NavDropDown setDropDown={setDropDown} />}
    </nav>
  )
}

export default NavBar
