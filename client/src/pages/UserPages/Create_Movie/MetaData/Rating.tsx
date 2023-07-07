import React, { useState } from 'react'
import IMDb from '../../../../assets/icons/IMDb.png'
import tomato from '../../../../assets/icons/tomato.png'
import { useDispatch } from 'react-redux'
import {
  getIMDb,
  getTomatos,
} from '../../../../redux/features/slices/CreateMovieSlice'
const Rating = () => {
  const style = {
    mainDiv: ``,
    tomatos: ``,
  }
  const dispatch = useDispatch()
  const [tomatoRating, setTomatoRating] = useState<number>(0)
  const [IMDbRating, setIMDbRating] = useState<number>(0)

  const handleTomatoRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTomatoRating(Number(e.target.value))
    dispatch(getTomatos(String(e.target.value)))
  }

  const handleIMDbRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIMDbRating(Number(e.target.value))
    dispatch(getIMDb(String(e.target.value)))
  }

  return (
    <div className={style.mainDiv}>
      <div className="flex gap-2 items-center justify-center w-[200px]">
        <input
          value={tomatoRating}
          type="range"
          min={1}
          max={100}
          onChange={handleTomatoRatingChange}
        />
        <img className="w-[30px]" src={tomato} alt="Tomato" />
        <div className="w-[5rem]   text-center flex items-center justify-center text-red-700">
          {tomatoRating}%
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center w-[200px]">
        <input
          value={IMDbRating}
          type="range"
          min={1.0}
          max={10.0}
          step={0.1}
          onChange={handleIMDbRatingChange}
        />
        <img className="w-[30px]" src={IMDb} alt="IMDb" />
        <div className="w-[5rem]  text-center flex items-center justify-center text-yellow-700">
          {IMDbRating}
          /10
        </div>
      </div>
    </div>
  )
}

export default Rating
