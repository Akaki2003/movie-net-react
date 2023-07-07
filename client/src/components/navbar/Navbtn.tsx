import { ThunkDispatch } from '@reduxjs/toolkit'
import React, { FC, useEffect } from 'react'
import { IconType } from 'react-icons'

type NavBtwnProp = {
  title: string
  fun: () => void
  Icon: IconType
}

const Navbtn: FC<NavBtwnProp> = ({ title, fun, Icon }) => {
  return (
    <div
      className="w-[270px] z-50 gap-1 h-[2.3rem]flex items-center justify-center flex-col cursor-pointer   rounded-[20px]"
      onClick={fun}
    >
      <button className="  text-[1.2rem] flex items-center  justify-around  w-[90%]  hover:text-red-600 hover:bg-gray-900 rounded-t-[10px] pt-2  text-[#cf1b4e] ">
        <Icon className="text-[1.4rem]" />
        <span className="w-[9rem] text-start">{title}</span>
      </button>
      <div className="w-[90%] bg-pink-800 h-[1px]"></div>
    </div>
  )
}

export default Navbtn
