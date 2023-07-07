import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react'
import { generatePath, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getCookies } from './redux/features/slices/AuthSlice'
import { GetAllMovies } from './redux/features/Thunks/MovieCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { GetActors } from './redux/features/Thunks/ActorCrud'
import { FireBasePhotoThunk } from './redux/features/Thunks/FirebaseThunk'
import { MovieObjectType } from './redux/features/Thunks/MovieCrud'
import { movieDataType } from './assets/dummydata/data'
export type actorType = {
  name: string
  img: string
}
export type ActorType = {
  name: string
  img: string
  _id: string
}
type Cell = {
  image: any
  htmlImg: String | null

  imgUploadDrag: (e: React.DragEvent<HTMLLabelElement>) => void
  removeImgFromHtml: () => void

  imgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  // uploadFileToFirebaseStorage: () => void
  imgUrl: string
  setHtmlImg: React.Dispatch<React.SetStateAction<String | null>>
  setColor1: React.Dispatch<React.SetStateAction<string>>
  setColor2: React.Dispatch<React.SetStateAction<string>>
  color1: string
  color2: string
  handleColor: (color: any) => void
  handleColor2: (color: any) => void
  Actor: actorType[]
  setActor: React.Dispatch<React.SetStateAction<actorType[]>>
  setYear: React.Dispatch<React.SetStateAction<string>>
  setGenre: React.Dispatch<React.SetStateAction<string>>
  setSort: React.Dispatch<React.SetStateAction<string>>
  year: string
  genre: string
  sort: string
  addToFav: (data: movieDataType) => void
  favoriteMovies: movieDataType[]
  deleteFromFav: (_id: string) => void
  ActorsForDB: ActorType[]
  setActorForDB: React.Dispatch<React.SetStateAction<ActorType[]>>
}
const context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const data = useSelector((state: any) => state.auth.userDecoded)
  // gettomg jwt cookies from local cookies
  const cookies = new Cookies()
  const token = cookies.get('jwt_authorization')
  useEffect(() => {
    //checking if user has a token if token exist we get user data from cookies
    // token must be checked or app will crash
    if (token) {
      dispatch(getCookies())
    }
  }, [])

  // query filtering
  const [year, setYear] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [sort, setSort] = useState<string>('')

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    dispatch(GetActors())
  }, [])

  useEffect(() => {
    let newYear = year === 'All' ? '' : year
    let newGenere = genre === 'All' ? '' : genre
    dispatch(GetAllMovies({ pages: 1, sort, year: newYear, genre: newGenere }))
  }, [year, genre, sort])

  const [image, setImage] = useState<any>()
  const [htmlImg, setHtmlImg] = useState<String | null>('')
  const [imgUrl, setImgUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let newImg = e.target.files[0]
      let newHtmlImg = URL.createObjectURL(e.target.files[0])
      setImage(newImg)
      setHtmlImg(newHtmlImg)
    }
  }
  const removeImgFromHtml = () => {
    setImage(null)
    setHtmlImg(null)
  }
  useEffect(() => {
    if (image) {
      const uploadImage = async () => {
        await dispatch(FireBasePhotoThunk({ image, dispatch }))
      }

      uploadImage()
    }
  }, [image])

  const imgUploadDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    let newImg = image
    let newHtmlImg = htmlImg
    newImg = e.dataTransfer.files[0]
    newHtmlImg = URL.createObjectURL(e.dataTransfer.files[0])
    setImage(newImg)
    setHtmlImg(newHtmlImg)
  }

  // local storage for favorite movies

  const [favoriteMovies, setFavoritesMovies] = useState<movieDataType[]>([])

  const addToFav = (data: movieDataType) => {
    setFavoritesMovies([...favoriteMovies, data])
    localStorage.setItem('fav-movies', JSON.stringify(favoriteMovies))
  }
  const deleteFromFav = (_id: string) => {
    const updatedFavorites = favoriteMovies.filter((val) => val._id !== _id)
    setFavoritesMovies(updatedFavorites)
    localStorage.setItem('fav-movies', JSON.stringify(updatedFavorites))
  }
  const storedMovies = localStorage.getItem('fav-movies')

  useEffect(() => {
    if (storedMovies) {
      const parsedMovies = JSON.parse(storedMovies)
      setFavoritesMovies(parsedMovies)
    }
  }, [])
  // const uploadFileToFirebaseStorage = async () => {
  //   if (image) {
  //     const storageRef = ref(storage, 'forum/' + image.name)
  //     setLoading(true)
  //     setError('')
  //     try {
  //       const snapshot = await uploadBytesResumable(storageRef, image)
  //       const downloadURL = await getDownloadURL(snapshot.ref)
  //       setImgUrl(downloadURL)
  //       setLoading(false)
  //       ('succsess')

  //       removeImgFromHtml()
  //     } catch (error) {
  //       (error)
  //       ('ერრორ')
  //     }
  //   } else {
  //     setError('Please Select The File!')
  //     setTimeout(() => {
  //       setError('')
  //     }, 5000)
  //   }
  // }
  //   uploadFileToFirebaseStorage,

  ///color changer for uploading

  const [color1, setColor1] = useState<string>('')
  const [color2, setColor2] = useState<string>('')
  const handleColor = (color: any) => {
    setColor1(color.hex)
  }
  const handleColor2 = (color: any) => {
    setColor2(color.hex)
  }

  ///actor information

  const [Actor, setActor] = React.useState<actorType[]>([])

  // actor update
  const [ActorsForDB, setActorForDB] = useState<ActorType[]>([])

  return (
    <context.Provider
      value={{
        removeImgFromHtml,
        imgUploadDrag,
        imgUpload,
        image,
        htmlImg,

        imgUrl,
        setHtmlImg,
        handleColor,
        color1,
        setColor1,
        color2,
        setColor2,
        handleColor2,
        Actor,
        setActor,
        setYear,
        setGenre,
        setSort,
        year,
        genre,
        sort,
        ActorsForDB,
        setActorForDB,
        addToFav,
        deleteFromFav,
        favoriteMovies,
      }}
    >
      {children}
    </context.Provider>
  )
}

export const useMainContext = () => {
  const usecontext = useContext(context)

  if (!usecontext) {
    throw new Error('Not Wrapped')
  }
  return usecontext
}
