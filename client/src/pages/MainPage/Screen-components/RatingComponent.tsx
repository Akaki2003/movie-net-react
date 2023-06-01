import React, { FC } from 'react'
type RatingComponentProps = {
  img: string
  num: number
  color: string
  secVal: string
}
const RatingComponent: FC<RatingComponentProps> = ({
  img,
  num,
  color,
  secVal,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={img} className="w-[40px]" />{' '}
      <p className="font-bold" style={{ color: `${color}` }}>
        {num}
        {secVal}
      </p>
    </div>
  )
}

export default RatingComponent
