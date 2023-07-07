import React, { FC } from 'react'
import { movieDataType } from '../../assets/dummydata/data'
import RatingComponent from './Screen-components/RatingComponent'
import imbd from '../../assets/icons/IMDb.png'
import { AiOutlineHeart } from 'react-icons/ai'
import { motion as m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from '../../context'
const MovieCard: FC<movieDataType> = (data) => {
  const { addToFav, favoriteMovies } = useMainContext()
  const style = {
    mainDiv: ` relatie w-[360px] h-[600px]  max_sm:w-[300px] relative   flex items-center justify-between flex-col rounded-[20px] rounded-b-[30px] `,
    img: `w-[100%] h-[72%] rounded-t-[20px] `,
    dec: ` cursor-pointer absolute bottom-0   w-[100%] h-[35%] rounded-b-[20px]    `,
    topDiv: ` rounded-t-[20px] text-white flex items-end justify-end p-2 px-5  absolute  bg-opacity-10 w-[100%] `,
    icon: `text-[2rem]  hartHover   cursor-pointer`,
    header: `text-white    text-[1.5rem] pl-3  `,
    p: `text-gray-400 p-4  text-start pl-3 absolute mb-20 w-[100%]  gradiantCardText   `,
    bottomDiv: `relative flex top-[8rem] left-[1rem] gap-10`,
    metadata: `text-white text-[12px] max_sm:text-[9px] flex items-center gap-2`,
    line: `w-[1px] h-[15px] bg-white`,
  }

  const favoriteExist = favoriteMovies.some((val) => val._id === data._id)

  const navigate = useNavigate()
  return (
    <m.div className={style.mainDiv} style={{ backgroundColor: data.color2 }}>
      <div className="overLay"></div>
      <div className={style.topDiv}>
        <button disabled={favoriteExist}>
          <AiOutlineHeart
            onClick={() => addToFav(data)}
            style={{
              color: favoriteExist && '#FF10F0',
            }}
            className={style.icon}
          />
        </button>
      </div>
      <img className={style.img} src={data.img} />

      <div
        onClick={() => navigate(`/movie/${String(data._id)}`)}
        className={style.dec}
      >
        <h1 className={style.header} style={{ color: `${data.color2}` }}>
          {data.title}
        </h1>
        <p className={style.p}>{data?.description?.slice(0, 150)}...</p>

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
              <p>{data.metadata.genre}</p>
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
