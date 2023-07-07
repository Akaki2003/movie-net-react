import React, { useReducer, useState } from 'react'
import { filmData } from '../../../assets/dummydata/data'
import imbd from '../../../assets/icons/IMDb.png'
import tomato from '../../../assets/icons/tomato.png'
import RatingComponent from './RatingComponent'

import Description from './Description'
import Button from '../../../components/Button'
import Actors from './Actors'
import Video from './Video'
import Selector from './Selector'

import { useDispatch, useSelector } from 'react-redux'

export type Action = {
  type: string
}
type State = {
  showDec: boolean
  showActors: boolean
  showVideo: boolean
}

const Screen = () => {
  const style = {
    screenDiv: `w-[100%] h-[100%]    rounded-[8px] flex flex-col  justify-around    `,
    img: `w-[30%] h-[500px] rounded-[40px]  `,
    btnDiv: ` gap-5 items-center justify-between flex`,
    btn: `border-b-[1px]  text-[1.4rem] border-black w-[12rem] py-1 font-medium tracking-widest`,

    ratingDiv: `flex gap-5 absolute  left-40`,
  }

  const dispatchRedux = useDispatch()
  const index = useSelector((state: any) => state.slide.index)
  // const movieData = useSelector((state: any) => state.data.movieData)
  // const [movieData, setMovieData] = useState(filmData)
  // const movieData = filmData
  // const [movieData, setMovieData] = useState(filmData)
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'description':
        return {
          ...state,
          showDec: state.showDec = true,
          showActors: state.showActors = false,
          showVideo: state.showVideo = false,
        }
      case 'actors':
        return {
          ...state,
          showDec: state.showDec = false,
          showActors: state.showActors = true,
          showVideo: state.showVideo = false,
        }
      case 'video':
        return {
          ...state,
          showDec: state.showDec = false,
          showActors: state.showActors = false,
          showVideo: state.showVideo = true,
        }
      case 'closeall':
        return {
          ...state,
          showDec: state.showDec = false,
          showActors: state.showActors = false,
          showVideo: state.showVideo = false,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    showDec: false,
    showActors: false,
    showVideo: false,
  })
  const titleCheck = state.showDec || state.showActors || state.showVideo

  const [stopInreval, setStopInterval] = React.useState<boolean>(false)
  const StopInterval = () => {
    setStopInterval(true)
    setTimeout(() => {
      setStopInterval(false)
    }, 10000)
  }

  return (
    <div
      onClick={() => StopInterval()}
      className={style.screenDiv}
      style={{
        background: ` ${filmData[index]?.color}   `,
      }}
    >
      <section className="flex justify-around  ">
        {/* <button onClick={() => (movieData)}>ON CLICK</button> */}

        <div className={style.ratingDiv}>
          <RatingComponent
            img={imbd}
            num={filmData[index]?.rating.IMDb}
            color={filmData[index]?.color2}
            secVal={`/10`}
          />
          <RatingComponent
            img={tomato}
            num={filmData[index]?.rating.RottenTomatos}
            color={filmData[index]?.color2}
            secVal={`%`}
          />
        </div>
        <div className="flex flex-col justify-around items-center h-[100%] ">
          <div className="flex flex-col items-center   h-[500px]   py-10  ">
            <h1
              style={{
                color: titleCheck
                  ? `${filmData[index]?.color}`
                  : `${filmData[index]?.color2}`,
                opacity: titleCheck ? '0' : '1',
              }}
              className={`text-center w-[300px]  mt-5  text-[2.7rem] font-bold tracking-widest  h-[200px]  `}
            >
              {filmData[index]?.title}
            </h1>
            <p
              className="text-bold text-[1.2rem] w-[400px] text-center "
              style={{
                color: titleCheck
                  ? `${filmData[index]?.color}`
                  : `${filmData[index]?.color2}`,
                opacity: titleCheck ? '0' : '1',
              }}
            >
              „ {filmData[index]?.quote}"
            </p>
          </div>
          <div className={style.btnDiv}>
            <Button
              color={filmData[index]?.color2}
              spec={'border-l-[1px]'}
              title={'Description'}
              clickEvent={dispatch}
              type={'description'}
            />
            <Button
              color={filmData[index]?.color2}
              spec={'border-t-[1px]'}
              title={'Video'}
              clickEvent={dispatch}
              type={'video'}
            />
            <Button
              color={filmData[index]?.color2}
              spec={'border-r-[1px]'}
              title={'Actors'}
              clickEvent={dispatch}
              type={'actors'}
            />
            <Button
              color={filmData[index]?.color2}
              spec={'border-r-[1px]'}
              title={'Title'}
              clickEvent={dispatch}
              type={'closeall'}
            />
          </div>
          {state.showDec && (
            <Description
              dec={filmData[index]?.description}
              color1={filmData[index]?.color}
              color2={filmData[index]?.color2}
            />
          )}
          {state.showActors && (
            <Actors
              actors={filmData[index]?.actors}
              color1={filmData[index]?.color}
              color2={filmData[index]?.color2}
            />
          )}
          {state.showVideo && (
            <Video
              video={filmData[index]?.video}
              color={filmData[index]?.color2}
            />
          )}
        </div>
        <img className={style.img} src={filmData[index]?.img} />
        {/* <button
        className="text-black text-[3rem]"
        onClick={() => dispatchRedux(increment(filmData.length))}
      >
        +
      </button>
      <button
        className="text-black text-[3rem]"
        onClick={() => dispatchRedux(decrement())}
      >
        -
      </button> */}
      </section>
      <Selector StopInterval={StopInterval} stopInreval={stopInreval} />
    </div>
  )
}

export default Screen
