import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import MovieCard from '../MovieCard'
import { movieDataType } from '../../../assets/dummydata/data'
import { ActorType } from '../../../context'
import { GetActors } from '../../../redux/features/Thunks/ActorCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'

const ActorsMoviesMain = () => {
  const { actorName } = useParams()
  const style = {
    mainDiv: `w-[100%]      ZindexMinuss pb-10 gap-20 flex  flex-col items-center justify-center  `,
    actorInfo: `flex   max_smm1:flex-col w-[100%] backdrop-blur-sm  bg-[#655c70]/40 p-10 boxshaddow items-center justify-around`,
    img: `w-[300px] h-[300px] rounded-[10px] shadow-md`,
    header: `text-[4rem] text-yellow-400`,
    moviesWrapper: `gridSystem gap-20  max_smm1:  w-[90%] items-center justify-center gap-2    backdrop-blur-sm bg-blue-300/10 rounded-[12px] boxshaddow py-20     `,
  }
  const actorsData = useSelector((state: any) => state.actorsReducer.actorData)

  let currentActor = actorsData?.actorsData?.find((val: any) => {
    console.log(actorName)
    console.log(val.name === actorName)
    return val.name == actorName
  })
  // const FindActorInfo = async () => {
  //   await dispatch(GetActors())
  //   currentActor = actorsData?.actorsData?.find((val: any) => {
  //     return val.name == actorName
  //   })
  // }

  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const movieData = useSelector((state: any) => state.data.movieData)
  const ActorMovies = movieData?.data?.filter((val: any) =>
    val.actors.some((actor: ActorType) => actor.name === actorName),
  )
  useEffect(() => {
    console.log(actorName === 'Christian Bale')
  }, [])
  const { img, name } = currentActor || {}
  if (currentActor) {
    return (
      <div onClick={() => console.log(ActorMovies)} className={style.mainDiv}>
        <section className={style.actorInfo}>
          <img onClick={() => ActorMovies} className={style.img} src={img} />
          <h1 className={style.header}>{name}</h1>
        </section>
        <section className={style.moviesWrapper}>
          {ActorMovies?.map((val: movieDataType) => (
            <MovieCard key={val._id} {...val} />
          ))}
        </section>
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}

export default ActorsMoviesMain
