import React from 'react'

const MovieCardSkeleton = () => {
  const style = {
    mainDiv: ` bg-black/10  animate-pulse relatie w-[360px] h-[600px]  max_sm:w-[300px] relative   flex items-center justify-between flex-col rounded-[20px] rounded-b-[30px] `,
    img: `w-[100%] mb-[12rem] h-[72%] bg-gray-400/10 rounded-t-[20px] `,
    dec: ` cursor-pointer absolute bottom-0   w-[100%] h-[35%] rounded-b-[20px]    `,
    topDiv: ` rounded-t-[20px] text-white flex items-end justify-end p-2 px-5  absolute  bg-opacity-10 w-[100%] `,
    icon: `text-[2rem]  hartHover   cursor-pointer`,
    header: `text-white ml-4 rounded-[9rem] w-[12rem] animate-pulse h-[2rem] bg-gray-300/20  text-[1.5rem] pl-3  `,
    p: `text-gray-400 p-4  text-start pl-3 absolute mb-20 w-[100%]  gradiantCardText   `,
    bottomDiv: `relative flex top-[8rem] left-[1rem] gap-10`,
    metadata: `text-white text-[12px] max_sm:text-[9px] flex items-center gap-2`,
    line: `w-[1px] h-[15px] bg-white`,
  }
  return (
    <div className={style.mainDiv}>
      <div className="overLay"></div>
      <div className={style.topDiv}>
        <button className={style.icon}></button>
      </div>
      {/* <div className={style.img}></div> */}
      {/* <img className={style.img}   /> */}

      <div className={style.dec}>
        <div className={style.header}></div>
        <div className="mt-5 gap-2 flex flex-col">
          <div className="w-[18rem] animate-pulse  h-[1rem] bg-gray-100/20 ml-2 rounded-[9rem] "></div>
          <div className="w-[19rem] animate-pulse  h-[1rem] bg-gray-100/20 ml-2 rounded-[9rem] "></div>
          <div className="w-[15rem] animate-pulse  h-[1rem] bg-gray-100/20 ml-2 rounded-[9rem] "></div>
          <div className="w-[21rem] animate-pulse  h-[1rem] bg-gray-100/20 ml-2 rounded-[9rem] "></div>
          <div className="w-[18rem] animate-pulse  h-[1rem] bg-gray-100/20 ml-2 rounded-[9rem] "></div>
        </div>
        <div className={style.bottomDiv}>
          <div className={style.metadata}>
            <p> </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton
