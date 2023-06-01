import { color } from 'framer-motion'
import React, { useState } from 'react'
import TitleAndDec from './TitleAndDec'
import ImgUpload from './ImgUpload'
import ColorDiv from './ColorDiv'
import { useMainContext } from '../../../context'
import MetaData from './MetaData'
import Actors from './Actors'
import VideoPost from './VideoPost'
import { useSelector, useDispatch } from 'react-redux'
import { FireBasePhotoThunk } from '../../../redux/features/Thunks/FirebaseThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { CreateMovie } from '../../../redux/features/Thunks/MovieCrud'
const PostMovie = () => {
  const { color1, color2, image, htmlImg } = useMainContext()
  const style = {
    mainDiv: `flex   items-center justify-around gap-5 w-[90%] h-[900px]  backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow`,
    TitleAndImg: `flex flex-col gap-2 items-center justify-start`,
  }

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const {
    title,
    description,
    photoUrl,
    length,
    year,
    genere,
    actorName,
    video,
    rottenTomatoes,
    imDb,
    actors,
  } = useSelector((state: any) => state.createMovie)
  React.useEffect(() => {
    console.log(image)
  }, [image])
  const AddMovie = async () => {
    await dispatch(FireBasePhotoThunk({ dispatch, image }))
  }

  React.useEffect(() => {
    if (photoUrl) {
      const movieObj = {
        title,
        color: color1,
        color2,
        video,
        img: photoUrl,
        description,
        rating: {
          imDb: Number(imDb),
          rottenTomatoes: Number(rottenTomatoes),
        },
        actors: actors,
        metadata: {
          hr: length,
          year: Number(year),
          genre: genere,
        },
      }
      dispatch(CreateMovie(movieObj))

      console.log(movieObj)
    }
  }, [photoUrl])
  return (
    <div
      style={{ backgroundColor: `${color1}`, color: `${color2}` }}
      className={style.mainDiv}
    >
      {/* <h1 className="text-[3rem]">Add A Movie</h1> */}
      <div className="flex  w-[100%] justify-around  gap-5">
        <div className={style.TitleAndImg}>
          <div className="flex items-center justify-center gap-2">
            <TitleAndDec />
            <ImgUpload htmlImg={htmlImg} />
          </div>
          <MetaData />
          <div className="flex gap-2">
            <ColorDiv />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Actors />
          <VideoPost />

          <button className="text-white text-[2rem]" onClick={() => AddMovie()}>
            SUBMIT{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostMovie
