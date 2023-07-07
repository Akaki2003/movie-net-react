import React from 'react'
import Length from './MetaData/Length'
import Genre from './MetaData/Genre'
import Year from './MetaData/Year'
import Rating from './MetaData/Rating'
const MetaData = () => {
  const style = {
    mainDiv: `w-[90%] h-[340px]  bg-gray-300 boxshaddow rounded-[10px] flex flex-col items-center justify-around py-10`,
  }

  return (
    <div className={style.mainDiv}>
      <div className="flex justify-around px-10 w-[100%]">
        <Rating />
        <Length />
      </div>
      <div className="flex justify-around w-[100%]">
        <Year />
        <Genre />
      </div>
    </div>
  )
}

export default MetaData
