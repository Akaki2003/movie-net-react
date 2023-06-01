import React from 'react'
import Actors from '../Create_Movie/Actors'
import { useSelector, useDispatch } from 'react-redux'
import { CreateActor } from '../../../redux/features/Thunks/ActorCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'
const PostActorMain = () => {
  const style = {
    section: `w-[100%] h-[100%] py-20 flex justify-center  items-center`,
    mainDiv: ` h-[1300px] gap-5 py-10 w-[60%] flex flex-col items-center    backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow flex   `,
    btn:
      'text-white w-[55%] boxshaddow h-[3rem] text-[1.2rem] bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-[20px]   px-5 py-2.5 text-center mr-2 mb-2',
  }
  const { actorName, img, actors } = useSelector(
    (state: any) => state.createMovie,
  )
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const handleActorPost = () => {
    const obj = {
      name: actorName,
      img,
    }
    console.log(obj)
    if (actorName && img) {
      dispatch(CreateActor(obj))
    }
  }

  return (
    <section className={style.section}>
      <div className={style.mainDiv}>
        <Actors />
        <button onClick={() => handleActorPost()} className={style.btn}>
          Add actors
        </button>
      </div>
    </section>
  )
}

export default PostActorMain
