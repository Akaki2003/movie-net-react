import React, { FC } from 'react'
import IMDb from '../../../assets/icons/IMDb.png'
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
      </div> */}
    </div>
  )
}

export default Rating
