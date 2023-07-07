import React, { FC } from 'react'
type ActorPropType = {
  actors: {
    name: string
    img: string
  }[]
  color1: string
  color2: string
}
const Actors: FC<ActorPropType> = ({ actors, color1, color2 }) => {
  const style = {
    img: `w-[190px] h-[190px] rounded-[20px] boxshaddow`,
  }
  return (
    <div className="flex justify-between items-center w-[600px] gap0 h-[400px] absolute  ">
      {actors.map((val: { name: string; img: string }) => {
        return (
          <div
            className="flex flex-col items-center gap-2"
            style={{ color: color2 }}
          >
            <img className={style.img} src={val.img} />
            <h1 className="text-[1.5rem] font-medium">{val.name}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default Actors
