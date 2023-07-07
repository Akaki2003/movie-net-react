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
    metaData: `flex justify-around    absolute bottom-0   items-start  shaddow-md text-[15px]   bg-white/40 w-[100%] text-white p-5   rounded-b-[20px]`,
    p: `flex items-center justify-center text-gray-700 gap-1 font-bold  `,
  }
  return (
    <div className={style.metaData}>
      <p className={style.p}>
        Relase Year <span className="text-red-400">{year}</span>
      </p>
      <p className={style.p}>
        Length <span className="text-green-400">{hr}</span>
      </p>
      <p className={style.p}>
        Genere <span className="text-yellow-400">{genre}</span>
      </p>
    </div>
  )
}

export default MetaData
