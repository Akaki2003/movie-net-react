import React, { FC } from 'react'
import { movieDataType } from '../assets/dummydata/data'
import RatingComponent from './RatingComponent'
import imbd from '../assets/icons/imdb.png'
import { AiOutlineHeart } from 'react-icons/ai'
import { motion as m } from 'framer-motion'
const MovieCard: FC<movieDataType> = (data) => {
  const style = {
    mainDiv: ` relatie w-[360px] h-[600px] relative   flex items-center justify-between flex-col rounded-[20px] rounded-b-[30px] `,
    img: `w-[100%] h-[72%] rounded-t-[20px] `,
    dec: `  absolute bottom-0   w-[100%] h-[35%] rounded-b-[20px]    `,
    topDiv: ` rounded-t-[20px] text-white flex items-end justify-end p-2 px-5  absolute  bg-opacity-10 w-[100%] `,
    icon: `text-[2rem] text-white hover:text-pink-600 cursor-pointer`,
    header: `text-white    text-[1.5rem] pl-3  `,
    p: `text-gray-400 p-4  text-start pl-3 absolute mb-20 w-[100%]  gradiantCardText   `,
    bottomDiv: `relative flex top-[8rem] left-[1rem] gap-4`,
    metadata: `text-white flex items-center gap-2`,
    line: `w-[1px] h-[15px] bg-white`,
  }
  return (
    <m.div className={style.mainDiv} style={{ backgroundColor: data.color2 }}>
      <div className="overLay"></div>
      <div className={style.topDiv}>
        <AiOutlineHeart className={style.icon} />
      </div>
      <img className={style.img} src={data.img} />

      <div className={style.dec}>
        <h1 className={style.header} style={{ color: `${data.color2}` }}>
          {data.title}
        </h1>
        <p className={style.p}>{data.dec.slice(0, 150)}...</p>

        <div className={style.bottomDiv}>
          <RatingComponent
            img={imbd}
            num={data.rating.IMDb}
            color={data.color2}
            secVal={`/10`}
          />
          <div className={style.metadata}>
            <p>{data.metadata.hr}</p>
            <div className={style.line}></div>
            <div className="flex gap-1 ">
              {data.metadata.genre.map((val: string, index: number) => (
                <p>
                  {val}
                  {index === 0 && ','}
                </p>
              ))}
            </div>
            <div className={style.line}></div>
            <p> {data.metadata.year}</p>
          </div>
        </div>
      </div>
    </m.div>
  )
}

export default MovieCard
