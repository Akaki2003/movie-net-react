import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Rating from './Rating'
import MetaData from './MetaData'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import EditDeleteDropDown from './EditDeleteDropDown'
import useOutClick from '../../../Hooks/useOutClick'
import DeletePopUp from './DeletePopUp'
import ReviewsMain from './Reviews/Reviews-main'
import ReviewsPost from './Reviews/Reviews-post'
import { useNavigate } from 'react-router-dom'
const SingleMovieMain = () => {
  const movieData = useSelector((state: any) => state.data.movieData)
  const navigate = useNavigate()
  const { id } = useParams()
  const singleMovie = movieData?.data?.find(
    (val: any) => String(val._id) === id,
  )
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)
  const deletePopUp = useSelector((state: any) => state.movieInner.deletePopUp)
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
    const {
      color,
      color2,
      description,
      img,
      title,
      video,
      _id,
      actors,
    } = singleMovie
    const { hr, year, genre } = singleMovie.metadata
    const { IMDb, RottenTomatos } = singleMovie.rating

    const style = {
      section: `w-[100%] h-[100%]  py-20 gap-5 flex flex-col  justify-center  items-center`,
      mainDiv: `    w-[95%]   ZindexMinus     py-10   backdrop-blur-sm   rounded-[12px] boxshaddow flex flex-col  max_md:items-center max_md:justify-center  justify-between`,
      img: `w-[500px] h-[100%]  rounded-[20px]   boxshaddow `,
      imgDiv: `  max_md:flex-col max_md:items-center max_md:justify-center    gap-5 px-5 items-start justify-between mt-10 flex   `,
      videoActorDiv: `flex flex-col w-[75%] max_md:w-[100%] items-center gap-10  `,
      header: `text-[2rem] text-center flex items-center   w-[90] top-20 left-2 h-[3rem] tracking-wider absolute  bottom-[4.5rem]   backdrop-blur-sm bg-white/10 px-10 rounded-[20px]	`,
      actorImg: `w-[200px] h-[200px] rounded-[8px] boxshaddow`,
      actorDiv: `flex justify-around w-[100%]`,
      dec: `flex flex-col items-center  justify-between    w-[100%] h-[100%]   bottom-0    p-5 `,
      decDiv: `p-3 flex flex-col gap-1     w-[100%]   boxshaddow `,
      p: `w-[100%]  rounded-[20px] text-[1.5rem] `,
      video: `w-[100%]  h-[550px] rounded-[22px] boxshaddow     `,
      dotIcon: `absolute right-3 max_md:top-5 text-[2rem] text-gray-400 mt-2 cursor-pointer`,
    }
    const userData = useSelector((state: any) => state.auth.userDecoded)

    const hexToRGBA = (hex: string, alpha: string) => {
      const hexValue = hex.replace('#', '')
      const red = parseInt(hexValue.substr(0, 2), 16)
      const green = parseInt(hexValue.substr(2, 2), 16)
      const blue = parseInt(hexValue.substr(4, 2), 16)

      return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }

    return (
      <section className={style.section} onClick={() => singleMovie}>
        {deletePopUp && <DeletePopUp _id={_id} />}
        <div
          ref={dropDownRef}
          className={style.mainDiv}
          style={{ backgroundColor: color, color: color2 }}
        >
          {userData?.user?.role && userData.user.role === 'admin' && (
            <BiDotsHorizontalRounded
              onClick={() => setDropDown(!dropDown)}
              className={style.dotIcon}
            />
          )}
          <EditDeleteDropDown dropDown={dropDown} _id={_id} />
          <div className={style.imgDiv}>
            <div className="flex  h-[80%]  items-center justify-around">
              <div className="flex flex-col    relative ">
                <Rating
                  color2={color2}
                  RottenTomatos={RottenTomatos}
                  IMDb={IMDb}
                />
                <img className={style.img} src={img} />
                <h1
                  style={{ color: 'white', textShadow: `2px 2px 4px ${color}` }}
                  className={style.header}
                >
                  {title}
                </h1>
                <MetaData year={year} hr={hr} genre={genre} />
              </div>
            </div>

            <div className={style.videoActorDiv}>
              <iframe
                // style={{ boxShadow: `2px 0.25rem 0.9rem ${color}` }}
                className={style.video}
                width="560"
                height="315"
                src={video}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
              <div className={style.actorDiv}>
                {actors.map((val: any) => (
                  <div
                    onClick={() => navigate(`/actors-movies/${val.name}`)}
                    className="flex flex-col items-center gap-2"
                    key={val._id}
                  >
                    <img className={style.actorImg} src={val.img} />
                    <h1 className="text-[1.2rem]">{val.name}</h1>
                  </div>
                ))}
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
              <p className={style.p} style={{ color: color2 }}>
                {description}
              </p>
            </div>
          </div>
        </div>

        <ReviewsPost movieId={id} />
        <ReviewsMain id={id} />
      </section>
    )
  } else {
    return <div>Loading</div>
  }
}

export default SingleMovieMain
