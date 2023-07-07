import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/exports'
import ActorMappedCard from './ActorMappedCard'
import ActorCardSkeleton from '../../../components/loading-skeletons/ActorCardSkeleton'
export type ActorMapProp = {
  _id: string
  name: string
  img: string
}
const ActorsListView = () => {
  const actorsData = useSelector((state: any) => state.actorsReducer.actorData)
  const style = {
    section: `w-[100%]   h-[100vh] flex  items-center justify-center`,
    mainDiv: `py-10 w-[60%] ZindexMinus max_md:bg-transparent    md:boxshaddow   gridSystem  gap-2 items-center justify-center md:backdrop-blur-sm md:bg-white/10 rounded-[12px]     `,
  }
  const [autoLoader, setAutoLoader] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setAutoLoader(true)
    }, 2000)
  }, [])
  if (autoLoader && actorsData) {
    return (
      <div className={style.mainDiv}>
        {actorsData?.actorsData?.map((val: ActorMapProp) => (
          <ActorMappedCard key={val._id} data={val} />
        ))}
      </div>
    )
  } else {
    return (
      <div className={`${style.mainDiv} `}>
        {new Array(6).fill(ActorCardSkeleton).map((Val: any, i: number) => (
          <Val key={i} />
        ))}
      </div>
    )
  }
}

export default ActorsListView
