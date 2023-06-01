import React from 'react'
import VideoBg from '../../../assets/background/VodepBg.jpg'
import { GrYoutube } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { getVideo } from '../../../redux/features/slices/CreateMovieSlice'
const Video = () => {
  const style = {
    main: `  w-[700px] h-[400px] bg-gray-300 boxshaddow rounded-[12px] flex flex-col items-center justify-around `,
    input: `outline-none text-gray-400  px-2 rounded-[5px] h-[2.3rem]   w-[95%]    outline-none   shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium   `,
    video: `w-[95%] h-[300px] rounded-[12px] boxshaddow`,
  }
  const dispatch = useDispatch()
  const video = useSelector((state: any) => state.createMovie.video)

  return (
    <div className={style.main}>
      <input
        onChange={(e) => dispatch(getVideo(e.target.value))}
        className={style.input}
        type="text"
        placeholder="YouTube Link"
      />
      {!video ? (
        <div className="w-[100%] flex items-center justify-center">
          <img className={style.video} src={VideoBg} />
          <GrYoutube className="absolute text-[5rem] text-red-600" />
        </div>
      ) : (
        <iframe
          // style={{ boxShadow: `2px 0.25rem 0.9rem ${color}` }}
          className={style.video}
          width="560"
          height="315"
          src={video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  )
}

export default Video
