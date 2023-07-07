import React from 'react'

const ActorCardSkeleton = () => {
  const style = {
    mainDiv: `w-[280px]  animate-pulse h-[310px] pt-2 gap-2 flex flex-col items-center justify-center bg-gray-300/30 boxshaddow  rounded-[10px] relative`,
    img: `w-[250px] h-[250px] animate-pulse bg-gray-200/20 rounded-[10px]`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.img}></div>

      <div></div>

      <div className="w-[13rem] h-[2.2rem] animate-pulse mb-4 rounded-[12px] bg-gray-100/20"></div>
    </div>
  )
}

export default ActorCardSkeleton
