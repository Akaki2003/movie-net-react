import React, { FC } from 'react'
import IMDB from '../../../assets/icons/imdb.png'
import Tomato from '../../../assets/icons/tomato.png'

type RatingPropType = {
  imDb: number
  rottenTomatoes: number
  color2: string
}

const Rating: FC<RatingPropType> = ({ imDb, color2, rottenTomatoes }) => {
  const style = {
    ratingDiv: `flex items-center justify-between px-10     `,
  }
  return (
    <div className={style.ratingDiv}>
      <div className="flex items-center gap-5 justify-center">
        <img className="w-[100px]" src={IMDB} />{' '}
        <p style={{ color: color2 }} className="text-[2rem]">
          {imDb}
        </p>
      </div>
      <div className="flex items-center gap-5 justify-center">
        <img className="w-[90px] h-[70px]" src={Tomato} />
        <p style={{ color: color2 }} className="text-[2rem]">
          {rottenTomatoes}%
        </p>
      </div>
    </div>
  )
}

export default Rating
