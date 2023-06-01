import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import InputComponent from './InputComponent'
import TextareaComponent from './TextareaComponent'
import ImgUpload from './ImgComponent'
import { useMainContext } from '../../../context'
import { SketchPicker } from 'react-color'

import { UpdateMovieThunk } from '../../../redux/features/Thunks/MovieCrud'
import { ThunkDispatch } from '@reduxjs/toolkit'
export type UpdatedValuesType = {
  color: string
  color2: string
}
const UpdateMovie = () => {
  const { htmlImg } = useMainContext()
  const movieData = useSelector((state: any) => state.data.movieData)
  const { id } = useParams()
  const singleMovie = movieData?.find((val: any) => String(val.id) === id)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const [titleState, setTitleState] = useState<string>('')
  const [yearState, setYearState] = useState<string>('')
  const [hrState, setHrState] = useState<string>('')
  const [genreState, setGenreState] = useState<string>('')
  const [descriptionState, setDescriptionState] = useState<string>('')
  const [imageState, setImageState] = useState<string>('')
  const [updateValues, setUpdatedValues] = useState<UpdatedValuesType>({
    color: '',
    color2: '',
  })

  React.useEffect(() => {
    if (
      singleMovie &&
      singleMovie.title &&
      singleMovie.metadata &&
      singleMovie.rating
    ) {
      const { color, color2, description, img, title, video } = singleMovie
      const { hr, year, genre } = singleMovie.metadata
      // const { imDb, rottenTomatoes } = singleMovie.rating
      setTitleState(title)
      setYearState(year)
      setHrState(hr)
      setGenreState(genre)
      setDescriptionState(description)
      setImageState(img)
      setUpdatedValues({
        color,
        color2,
      })
    }
  }, [singleMovie])
  if (
    movieData &&
    singleMovie &&
    singleMovie.title &&
    singleMovie.metadata &&
    singleMovie.rating
  ) {
    const style = {
      section: `w-[100%] h-[100%] py-20 flex justify-center  items-center`,
      mainDiv: ` h-[1300px] gap-5 py-10 w-[60%] flex flex-col items-center    backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow flex   `,
      metaData: `flex flex-col items-center  gap-4 w-[100%]`,
      colorImgDiv: `boxshaddow w-[240px] flex-col h-[350px] bg-gray-300 flex items-center justify-center rounded-[20px]`,
    }

    const metaDataArr = [
      { title: 'hr', state: yearState, setState: setYearState },
      { title: 'year', state: hrState, setState: setHrState },
      { title: 'genre', state: genreState, setState: setGenreState },
    ]
    const handleColor2 = (color: any) => {
      setUpdatedValues({ ...updateValues, color2: color.hex })
    }
    const handleColor = (color: any) => {
      setUpdatedValues({ ...updateValues, color: color.hex })
    }
    const handleUpdate = () => {
      dispatch(UpdateMovieThunk({ id: id || '', obj: updateValues }))
      console.log(updateValues)
    }
    return (
      <section className={style.section}>
        <div className={style.mainDiv}>
          <InputComponent
            TITLE={'title'}
            setState={setTitleState}
            state={titleState}
          />
          <div className={style.metaData}>
            {metaDataArr.map((val: any) => (
              <InputComponent
                key={val.title}
                state={val.state}
                setState={val.setState}
                TITLE={val.title}
              />
            ))}
          </div>
          <div className="flex  w-[90%] flex-col gap-5 ">
            <TextareaComponent
              TITLE={'description'}
              state={descriptionState}
              setState={setDescriptionState}
            />
            <div className=" flex items-center justify-between    w-[100%]  ">
              <div className={style.colorImgDiv}>
                <h1 style={{ color: `${updateValues.color}` }}>Color 1</h1>
                <SketchPicker
                  color={updateValues.color2}
                  onChangeComplete={handleColor2}
                />
              </div>

              <div className={style.colorImgDiv}>
                <h1 style={{ color: `${updateValues.color2}` }}>Color 2</h1>
                <SketchPicker
                  color={updateValues.color}
                  onChangeComplete={handleColor}
                />
              </div>
              <div className={style.colorImgDiv}>
                <ImgUpload currentImg={imageState} htmlImg={htmlImg} />
              </div>
            </div>
          </div>

          {/* <InputComponent
            type={updateValues.rating['rottenTomatoes']}
            TITLE={'rottenTomatoes%'}
            updateValues={updateValues}
            setUpdatedValues={setUpdatedValues}
          /> */}
          <button
            onClick={() => handleUpdate()}
            className="text-white w-[90%] boxshaddow h-[3rem] text-[1.2rem] bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-[20px]   px-5 py-2.5 text-center mr-2 mb-2"
          >
            Save Changes
          </button>
        </div>
      </section>
    )
  } else {
    return <div>Loading</div>
  }
}

export default UpdateMovie
