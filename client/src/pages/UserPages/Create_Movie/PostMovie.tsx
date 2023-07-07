import { color } from 'framer-motion'
import React, { useState } from 'react'
import TitleAndDec from './TitleAndDec'
import ImgUpload from './ImgUpload'
import ColorDiv from './ColorDiv'
import { useMainContext } from '../../../context'
import MetaData from './MetaData'
import MovieActors from './MovieActors'
import VideoPost from './VideoPost'
import { useSelector, useDispatch } from 'react-redux'
import { FireBasePhotoThunk } from '../../../redux/features/Thunks/FirebaseThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import LoadingComponent from '../../../components/Loading'
import {
  CreateMovie,
  GetAllMovies,
} from '../../../redux/features/Thunks/MovieCrud'
import { motion as m } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
const PostMovie = () => {
  const { color1, color2, image, htmlImg, ActorsForDB } = useMainContext()
  const style = {
    mainDiv: `flex   z-10 ZindexMinus items-center justify-around gap-5 w-[90%] h-[900px]  max_lg:h-[1800px]  max_lg:items-center  max_lg:justify-center    backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow`,
    TitleAndImg: `flex flex-col gap-2 items-center justify-start w-[50%]  max_lg:w-[90%]`,
    btn: `text-white  w-[90%] bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  }
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const userData = useSelector((state: any) => state.auth.userDecoded)
  const userId = userData.user._id
  const {
    title,
    description,
    photoUrl,
    length,
    year,
    genere,
    actorName,
    video,
    RottenTomatos,
    IMDb,
  } = useSelector((state: any) => state.createMovie)
  React.useEffect(() => {
    image
  }, [image])

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const AddMovie = async () => {
    ActorsForDB
    if (image) {
      setLoading(true)
      await dispatch(FireBasePhotoThunk({ dispatch, image }))
    } else {
      setError('Please Upload Image')
      let time = setTimeout(() => {
        setError('')
      }, 4000)
    }
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
          IMDb: Number(IMDb),
          RottenTomatos: Number(RottenTomatos),
        },
        actors: ActorsForDB,
        metadata: {
          hr: length,
          year: Number(year),
          genre: genere,
        },
        userId,
      }

      if (
        title &&
        description &&
        photoUrl &&
        length &&
        year &&
        genere &&
        actorName &&
        video &&
        RottenTomatos &&
        IMDb &&
        userId
      ) {
        setLoading(false)
        dispatch(CreateMovie(movieObj))
        navigate('/movies/1')
      } else {
        setError('Please Fill Out Every Value')
        let time = setTimeout(() => {
          setError('')
        }, 4000)
      }
    }
  }, [photoUrl])

  return (
    <div
      style={{ backgroundColor: `${color1}`, color: `${color2}` }}
      className={style.mainDiv}
    >
      <LoadingComponent loading={loading} />
      {/* <h1 className="text-[3rem]">Add A Movie</h1> */}
      <div className="flex  w-[100%] justify-around  max_lg:items-center  max_lg:justify-center gap-5  max_lg:flex-col">
        <div className={style.TitleAndImg}>
          <div className="flex items-center justify-center gap-2 w-[100%]  ">
            <TitleAndDec />
            <ImgUpload htmlImg={htmlImg} />
          </div>
          <MetaData />
          <div className="flex w-[100%]   ] gap-2">
            <ColorDiv />
          </div>
        </div>
        {error ? (
          <m.p
            animate={{
              x:
                error === error
                  ? [20, 0, -20, 0, 20, 0, -20, 0, 20, 0, -20, 0, 20, 0, -20, 0]
                  : [],
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute text-red-600 text-[5rem]  z-50 top-[20rem]"
          >
            {error}
          </m.p>
        ) : (
          <p className="hidden"></p>
        )}
        <div className="flex w-[100%] max_lg:items-center max_lg:justify-center flex-col gap-2">
          <MovieActors />
          <VideoPost />
          <button onClick={() => AddMovie()} className={style.btn}>
            Add Movie
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostMovie
