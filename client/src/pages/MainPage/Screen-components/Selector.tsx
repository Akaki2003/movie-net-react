import React, { FC, useEffect } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { filmData } from '../../../assets/dummydata/data'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectorHanddler,
  increment,
  decrement,
} from '../../../redux/features/slices/slideMovieSlice'
import { motion as m } from 'framer-motion'

type SelectorProps = {
  StopInterval: () => void
  stopInreval: boolean
}

const Selector: FC<SelectorProps> = ({ StopInterval, stopInreval }) => {
  const movieData = useSelector((state: any) => state.data.movieData)

  const dispatch = useDispatch()
  const style = {
    mainDiv: `flex flex    w-[100%] justify-end pr-40   gap-2   `,
    img: `w-[40px] h-[40px] rounded-[10px] cursor-pointer`,
    btnWrapper: `flex justify-between gap-10 pl-40 pt-10`,
    icon: `text-[#ec2b58] text-[2rem] cursor-pointer  hover:text-yellow-400`,
  }
  const i = useSelector((state: any) => state.slide.index)
  const [mouseOver, setMouseOver] = React.useState<boolean[]>(
    new Array(filmData?.length).fill(false),
  )
  const mouseIn = (index: number) => {
    let newVal = [...mouseOver]
    newVal[index] = true
    setMouseOver(newVal)
  }
  const mouseOut = (index: number) => {
    let newVal = [...mouseOver]
    newVal[index] = false
    setMouseOver(newVal)
  }

  useEffect(() => {
    if (!stopInreval) {
      ;('incremen')
      let interval = setTimeout(() => {
        dispatch(increment(filmData?.length))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [i])
  return (
    <section className="flex   items-center    w-[100%]    ">
      <div className={style.btnWrapper}>
        <FaArrowCircleLeft
          onClick={() => dispatch(decrement(filmData?.length))}
          className={style.icon}
        />{' '}
        <FaArrowCircleRight
          onClick={() => dispatch(increment(filmData?.length))}
          className={style.icon}
        />
      </div>
      <m.div className={style.mainDiv}>
        {filmData?.map((val: any, index: number) => {
          return (
            <m.div
              key={val.id}
              onClick={() => {
                dispatch(selectorHanddler(index)), StopInterval()
              }}
              style={{
                zIndex: i === index ? 50 : 10,
                //   position: i === index ? 'absolute' : '',
              }}
            >
              <m.img
                onMouseOver={() => mouseIn(index)}
                onMouseLeave={() => mouseOut(index)}
                animate={{
                  scale: i === index ? 1.1 : 1,
                  y: i === index ? 0 : 10,
                  boxShadow: mouseOver[index]
                    ? `0px 0px 3rem ${val.color2}`
                    : `0px 0px 0.8rem ${val.color2}`,
                }}
                style={{
                  borderRadius: '2rem',
                  boxShadow: `0px 0px 0.8rem ${val.color2}`,
                  zIndex: i === index ? 50 : 10,
                }}
                className={style.img}
                src={val.img}
              />
            </m.div>
          )
        })}
      </m.div>{' '}
    </section>
  )
}

export default Selector
