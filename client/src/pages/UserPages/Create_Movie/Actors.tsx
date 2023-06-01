import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getActor,
  getImg,
  getActors,
} from '../../../redux/features/slices/CreateMovieSlice'
import { useMainContext } from '../../../context'
import { motion as m } from 'framer-motion'
const Actors = () => {
  const { Actor, setActor } = useMainContext()
  const style = {
    mainDiv: `w-[700px] h-[300px] bg-gray-300 boxshaddow rounded-[12px] flex items-center flex-col justify-center gap-10`,
    input: `outline-none text-gray-400  px-2 rounded-[5px] h-[2.3rem]       outline-none   shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium   `,
    btn: ` w-[90%] text-white  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  }
  const dispatch = useDispatch()
  const { actorName, img } = useSelector((state: any) => state.createMovie)

  //   const [img, setImg] = React.useState<string>('')
  //   const [name, setName] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const AddActor = () => {
    if (Actor.length < 3) {
      if (Actor) {
        setActor([...Actor, actorName])
        dispatch(getActors(Actor))
      } else {
        setError('Fill Both Inputs')
        setTimeout(() => {
          setError('')
        }, 300)
      }
    } else {
      setError('Only 3 actors can be added')
      setTimeout(() => {
        setError('')
      }, 300)
    }
    // dispatch(getActor(''))
    console.log(error)
    console.log(Actor)
  }
  return (
    <div className={style.mainDiv}>
      <div className="flex flex-col gap-5  items-center  ">
        <div className="flex gap-2">
          <m.input
            value={actorName}
            maxLength={35}
            animate={{
              x:
                error === 'Fill Both Inputs'
                  ? [20, 0, -20, 0, 20, 0, -20, 0]
                  : [],
            }}
            transition={{
              duration: 0.2,
            }}
            className={style.input}
            onChange={(e) => dispatch(getActor(e.target.value))}
            type="text"
            placeholder="Actor Name"
          />
          <m.input
            animate={{
              x:
                error === 'Fill Both Inputs'
                  ? [20, 0, -20, 0, 20, 0, -20, 0]
                  : [],
            }}
            transition={{
              duration: 0.2,
            }}
            className={style.input}
            onChange={(e) => dispatch(getImg(e.target.value))}
            type="text"
            placeholder="Photo URL"
          />
        </div>
        <button className={style.btn} onClick={() => AddActor()}>
          ADD
        </button>
      </div>
      <div className="flex gap-5 ">
        {Actor.map((val: any) => {
          return (
            <div
              key={val}
              className="flex items-center justify-center flex-col"
            >
              <img
                className="w-[100px] h-[100px] boxshaddow rounded-[10px]"
                src={val.img}
              />
              <h1 className="text-[1.6rem] text-gray-800">{val.name}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Actors
