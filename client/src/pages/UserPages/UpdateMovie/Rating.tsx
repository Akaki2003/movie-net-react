import React, { FC } from 'react'
import imdb from '../../../assets/icons/imdb.png'
import tomato from '../../../assets/icons/tomato.png'
import { UpdatedValuesType } from './UpdateMovie'

type inputProps = {
  updateValues: UpdatedValuesType
  type: keyof UpdatedValuesType
  setUpdatedValues: React.Dispatch<React.SetStateAction<UpdatedValuesType>>
}

const Rating: FC<inputProps> = ({ updateValues, type, setUpdatedValues }) => {
  const value = updateValues[type]
  return (
    <div>
      <div className="flex gap-2 items-center justify-center w-[200px]">
        <input
          type="range"
          min={1}
          max={100}
          onChange={(e) =>
            setUpdatedValues({
              ...updateValues,
              [type]: e.target.value,
            })
          }
        />
        <img className="w-[30px]" src={tomato} alt="Tomato" />
        <div className="w-[5rem]   text-center flex items-center justify-center text-red-700">
          {Number([type])}%
        </div>
      </div>
      {/* <div className="flex gap-2 items-center justify-center w-[200px]">
        <input
          value={imdbRating}
          type="range"
          min={1.0}
          max={10.0}
          step={0.1}
          onChange={handleImdbRatingChange}
        />
        <img className="w-[30px]" src={imdb} alt="IMDb" />
        <div className="w-[5rem]  text-center flex items-center justify-center text-yellow-700">
          {imdbRating}
          /10
        </div>
      </div> */}
    </div>
  )
}

export default Rating
