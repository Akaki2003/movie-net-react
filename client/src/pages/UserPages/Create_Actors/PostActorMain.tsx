import React, { useState, useRef, useEffect } from 'react'
import Actors from './Actors'
import { useSelector, useDispatch } from 'react-redux'
import { CreateActor } from '../../../redux/features/Thunks/ActorCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'
import ActorsListView from '../Get_And_Update_Actors/ActorsListView'
import { GetActors } from '../../../redux/features/Thunks/ActorCrud'
import LoadingComponent from '../../../components/Loading'
import { useMainContext } from '../../../context'
import { removePhotoUrl } from '../../../redux/features/slices/CreateMovieSlice'
const PostActorMain = () => {
  const { removeImgFromHtml } = useMainContext()
  const style = {
    section: `w-[100%] h-[100%] py-20 flex justify-center items-center`,
    mainDiv: ` h-[100%] gap-5 py-10 w-[100%] flex flex-col items-center  z-10  ZindexMinus   backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow flex   `,
    btn:
      'text-white w-[55%] boxshaddow h-[3rem] text-[1.2rem] bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-[20px]   px-5 py-2.5 text-center mr-2 mb-2',
    btn2: `text-white w-[55%] boxshaddow h-[3rem] text-[1.2rem] bg-gradient-to-br from-gray-400 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-800 font-medium rounded-[20px]   px-5 py-2.5 text-center mr-2 mb-2`,
  }
  const { actorName, img, actors } = useSelector(
    (state: any) => state.createMovie,
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [scrollTrigger, setScrollTrigger] = useState<boolean>(false)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const url = useSelector((state: any) => state.createMovie.photoUrl)
  const topScrollRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = topScrollRef.current as HTMLDivElement
    element?.scrollIntoView({ behavior: 'smooth' })
  }, [scrollTrigger])
  const handleActorPost = async () => {
    const obj = {
      name: actorName,
      img: url,
    }

    if (actorName && url) {
      setIsLoading(true)
      await dispatch(CreateActor(obj))
      await dispatch(GetActors())
      removeImgFromHtml()
      dispatch(removePhotoUrl())
      setIsLoading(false)
      setScrollTrigger(!scrollTrigger)
    } else {
      setError('Please Upload Image')

      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  return (
    <section className={style.section}>
      <LoadingComponent loading={isLoading} />

      <div className={style.mainDiv}>
        <Actors />

        <button
          onClick={() => handleActorPost()}
          className={url ? style.btn : style.btn2}
        >
          {error ? <span className="text-red-600">{error}</span> : 'Add Actor'}
        </button>
        <section className="w-[100%] items-center justify-center flex ">
          <ActorsListView />
          <span ref={topScrollRef}></span>
        </section>
      </div>
    </section>
  )
}

export default PostActorMain
