import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getCookies } from './redux/features/slices/AuthSlice'
import { GetAllMovies } from './redux/features/Thunks/MovieCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'
export type actorType = {
  name: string
  img: string
}
type Cell = {
  image: any
  htmlImg: String | null
  getThread: () => void
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

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    dispatch(GetAllMovies({ dispatch }))
  }, [])

  const { forumID } = useParams()
  const [postData, setPostData] = useState<any>()
  const getThread = async () => {
    console.log('clicked')

    try {
      let apiUrl = `http://localhost:3000/threads/${forumID}`
      await axios
        .get(apiUrl)
        .then((res) => {
          console.log(res)
          console.log('success')
        })
        .catch((err) => console.log(err))
      console.log(forumID)
    } catch (error) {
      console.log(error)
    }
  }

  const [image, setImage] = useState<any>(null)
  const [htmlImg, setHtmlImg] = useState<String | null>('')
  const [imgUrl, setImgUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!image) {
      let newImg = image
      let newHtmlImg = htmlImg
      if (e.target.files) {
        newImg = e.target.files[0]
        newHtmlImg = URL.createObjectURL(e.target.files[0])
        setImage(newImg)
        setHtmlImg(newHtmlImg)
      }
    }
  }
  const imgUploadDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    let newImg = image
    let newHtmlImg = htmlImg
    newImg = e.dataTransfer.files[0]
    newHtmlImg = URL.createObjectURL(e.dataTransfer.files[0])
    setImage(newImg)
    setHtmlImg(newHtmlImg)
  }

  const removeImgFromHtml = () => {
    setImage(null)
    setHtmlImg(null)
  }
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
  //       console.log('succsess')

  //       removeImgFromHtml()
  //     } catch (error) {
  //       console.log(error)
  //       console.log('ერრორ')
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
  return (
    <context.Provider
      value={{
        getThread,
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
