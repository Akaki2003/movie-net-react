import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from './MainPage/MovieCard'
import { movieDataType } from '../assets/dummydata/data'
import { useNavigate, useParams } from 'react-router-dom'
import { ThunkDispatch } from '@reduxjs/toolkit'
import MovieCardSkeleton from '../components/loading-skeletons/MovieCardSkeleton'
import { GetAllMovies } from '../redux/features/Thunks/MovieCrud'
const MoviesGrid = () => {
  const movieData = useSelector((state: any) => state.data.movieData)
  const style = {
    section: `w-[100%] items-center justify-center  flex flex-col z-10`,
    main: `gridSystem gap-20 w-[90%] items-center justify-center gap-2   backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow py-20 px-1   `,
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  useEffect(() => {
    dispatch(
      GetAllMovies({
        pages: 1,
        sort: '',
        year: '',
        genre: '',
      }),
    )
  }, [])
  const navigation = useNavigate()
  const { pages } = useParams()
  const [autoLoader, setAutoLoader] = React.useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setAutoLoader(true)
    }, 2000)
  }, [])

  if (autoLoader && movieData) {
    return (
      <section className={style.section}>
        <main className={style.main}>
          {movieData?.data?.map((val: movieDataType) => (
            <MovieCard key={val._id} {...val} />
          ))}
        </main>
        <div className="  gap-3 flex w-[90%] items-center  justify-center mt-4 rounded-[20px] element-without-scrollbar bg-gray-900/80  overflow-x-scroll ">
          {new Array(movieData.TotalPages)
            .fill('')
            .map((val: string, index: number) => (
              <p
                onClick={() => {
                  {
                    navigation(`/movies/${index + 1}`),
                      dispatch(
                        GetAllMovies({
                          pages: index + 1,
                          sort: '',
                          year: '',
                          genre: '',
                        }),
                      )
                  }
                }}
                className={` text-[1.4rem] font-serif cursor-pointer  ${
                  Number(pages) === index + 1 ? 'text-blue-400' : 'text-white'
                }   `}
                key={index}
              >
                {index + 1}
              </p>
            ))}
        </div>
      </section>
    )
  } else {
    return (
      <div className={style.main}>
        {new Array(8).fill(MovieCardSkeleton).map((Val: any, i: number) => (
          <Val key={i} />
        ))}
      </div>
    )
  }
}

export default MoviesGrid
