import React, { FC } from 'react'
import { motion as m } from 'framer-motion'
import { Action } from '../pages/MainPage/Screen-components/Screen'
type ButtonTypeProp = {
  color: string
  spec: string
  title: string
  clickEvent: React.Dispatch<Action>
  type: string
}

const Button: FC<ButtonTypeProp> = ({
  color,
  spec,
  title,
  clickEvent,
  type,
}) => {
  const style = {
    btn: `border-b-[1px]  text-[1rem]   w-[9rem] py-1 font-medium tracking-widest`,
  }
  return (
    <m.button
      onClick={() => clickEvent({ type })}
      initial={{
        outlineWidth: 0,
      }}
      whileHover={{
        scale: 0.9,
      }}
      transition={{
        duration: 0.1,
      }}
      style={{
        padding: '1rem',
        border: 'none',
        outline: 'none',
        borderRadius: '4rem',
        boxShadow: `0 0.25rem 0.5rem ${color}`,
        color: `${color}`,
        borderColor: `${color}`,
      }}
      className={`${style.btn} ${spec}`}
    >
      {title}
    </m.button>
  )
}

export default Button
