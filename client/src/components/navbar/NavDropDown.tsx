import React, { FC } from 'react'
import Navbtn from './Navbtn'
import { MdFavorite } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'
import { LogOut } from '../../redux/features/slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { CgProfile } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
type NavDropDownProp = {
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
}

const NavDropDown: FC<NavDropDownProp> = ({ setDropDown }) => {
  const userData = useSelector((state: any) => state.auth.userDecoded)

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const style = {
    mainDiv: `w-[300px]    py-2 max-h-[370px] pb-10  bg-gray-900/80   Zindex  boxshaddow absolute right-3 top-[6rem] flex flex-col items-center pl-8 justify-start pt-10 gap-5     rounded-[20px]`,
  }
  const navigate = useNavigate()
  return (
    <div className={style.mainDiv}>
      <Navbtn
        fun={() => navigate('/user-main')}
        title="Profile"
        Icon={CgProfile}
      />
      {userData.user.role === 'admin' && (
        <Navbtn
          fun={() => navigate('/user-main')}
          title="Add Movie"
          Icon={IoMdAdd}
        />
      )}
      {userData.user.role === 'admin' && (
        <Navbtn
          fun={() => navigate('/add-actor')}
          title="Add Actor"
          Icon={AiFillStar}
        />
      )}
      <Navbtn
        fun={() => navigate('/favorite')}
        title="Favorite Movies"
        Icon={MdFavorite}
      />
      <button
        onClick={() => {
          dispatch(LogOut()), setDropDown(false)
        }}
      >
        <Navbtn fun={LogOut} title="Log out" Icon={RiLogoutCircleLine} />
      </button>
    </div>
  )
}

export default NavDropDown
