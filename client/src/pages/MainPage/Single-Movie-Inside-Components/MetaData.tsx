import React, { FC } from 'react'
import { BsCalendarDate } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
type MetaDataType = {
  year: number
  hr: string
  genre: string
}

const MetaData: FC<MetaDataType> = ({ year, hr, genre }) => {
  const style = {
    metaData: `flex justify-around      items-start   text-[1.1rem]   bg-gray-300/20 w-[95%] text-white p-5 rounded-[20px]`,
    p: `flex items-center justify-center gap-10`,
  }
  return (
    <div className={style.metaData}>
      <p className={style.p}>{year}</p>
      <p className={style.p}>{hr}</p>
      <p className={style.p}>{genre}</p>
    </div>
  )
}

export default MetaData
