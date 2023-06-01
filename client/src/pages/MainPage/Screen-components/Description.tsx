import React, { FC } from 'react'
import { motion as m } from 'framer-motion'
type DescriptionTypeProps = {
  dec: string
  color1: string
  color2: string
}

const Description: FC<DescriptionTypeProps> = ({ dec, color2, color1 }) => {
  return (
    <m.div
      className="absolute  w-[500px] text-[14px]  text-start font-medium  "
      style={{ backgroundColor: `${color1}` }}
    >
      <p style={{ color: color2 }}>{dec}</p>
    </m.div>
  )
}

export default Description
