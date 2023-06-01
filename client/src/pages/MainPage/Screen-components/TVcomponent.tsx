import React from 'react'
import Screen from './Screen'

import { motion as m } from 'framer-motion'
const TVcomponent = () => {
  const style = {
    mainDiv: `w-[90%] h-[700px]  gap-20 flex items-start justify-start mt-40 rounded-[4px]`,
  }

  return (
    <div className={style.mainDiv}>
      <Screen />
    </div>
  )
}

export default TVcomponent
