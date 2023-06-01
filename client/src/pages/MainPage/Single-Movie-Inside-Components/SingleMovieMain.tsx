import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Rating from './Rating'
import MetaData from './MetaData'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import EditDeleteDropDown from './EditDeleteDropDown'
import useOutClick from '../../../Hooks/useOutClick'
const SingleMovieMain = () => {
  const movieData = useSelector((state: any) => state.data.movieData)
  const { id } = useParams()
  const singleMovie = movieData?.find((val: any) => String(val.id) === id)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)

  const [dropDown, setDropDown] = React.useState<boolean>(false)
  const handleDropDownCancle = () => {
    setDropDown(false)
  }
  useOutClick(dropDownRef, handleDropDownCancle)
  if (
    movieData &&
    singleMovie &&
    singleMovie.title &&
    singleMovie.metadata &&
    singleMovie.rating
  ) {
    const { color, color2, description, img, title, video } = singleMovie
    const { hr, year, genre } = singleMovie.metadata
    const { imDb, rottenTomatoes } = singleMovie.rating

    const style = {
      section: `w-[100%] h-[100%] py-20 flex justify-center  items-center`,
      mainDiv: ` h-[1900px] w-[60%]   flex flex-col backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow flex   justify-between`,
      img: `w-[500px] h-[100%] rounded-[20px] boxshaddow `,
      imgDiv: `mt-10 ml-5 h-[100%] w-[100%]   flex flex-col  `,

      header: `text-[3rem] text-center flex items-center   w-[500px] h-[6rem] tracking-wider absolute  top-[37rem] left-[3rem] oxshaddow backdrop-blur-sm bg-white/10 px-10 rounded-[20px]	`,
      dec: `flex flex-col items-center  justify-between gap-10 w-[100%] h-[100%]     p-5 `,
      decDiv: `p-3 flex flex-col gap-1  rounded-[20px]  w-[100%]    boxshaddow `,
      p: `w-[100%]  rounded-[20px] text-[1.5rem] `,
      video: `w-[100%] h-[550px] rounded-[22px] boxshaddow   mb-10 `,
      dotIcon: `absolute right-3 text-[2rem] text-gray-400 mt-2 cursor-pointer`,
    }

    const hexToRGBA = (hex: string, alpha: string) => {
      const hexValue = hex.replace('#', '')
      const red = parseInt(hexValue.substr(0, 2), 16)
      const green = parseInt(hexValue.substr(2, 2), 16)
      const blue = parseInt(hexValue.substr(4, 2), 16)

      return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }

    return (
      <section className={style.section}>
        <div ref={dropDownRef} className={style.mainDiv}>
          <BiDotsHorizontalRounded
            onClick={() => setDropDown(!dropDown)}
            className={style.dotIcon}
          />
          <EditDeleteDropDown dropDown={dropDown} id={singleMovie.id} />
          <div className={style.imgDiv}>
            <div className="flex w-[100%] h-[80%] items-start justify-around">
              <h1
                style={{ color: 'white', textShadow: `2px 2px 4px ${color}` }}
                className={style.header}
              >
                {title}
              </h1>
              <img className={style.img} src={img} />

              <div className="flex flex-col justify-between h-[100%]  w-[50%]">
                <Rating
                  color2={color2}
                  rottenTomatoes={rottenTomatoes}
                  imDb={imDb}
                />
                <MetaData year={year} hr={hr} genre={genre} />
              </div>
            </div>
          </div>
          <div className={style.dec}>
            <div
              className={style.decDiv}
              style={{
                backgroundColor: hexToRGBA(color, '0.2'),
                backdropFilter: 'blur(10px)',
                color: 'white',
                textShadow: `2px 2px 4px ${color}`,
              }}
            >
              <h1 className="text-start text-[1.5rem]">Description</h1>
              <p className={style.p}>
                {description}Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
            </div>
            <iframe
              // style={{ boxShadow: `2px 0.25rem 0.9rem ${color}` }}
              className={style.video}
              width="560"
              height="315"
              src={video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </section>
    )
  } else {
    return <div>Loading</div>
  }
}

export default SingleMovieMain
