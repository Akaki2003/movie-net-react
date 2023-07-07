import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useOutClick from '../../../Hooks/useOutClick'
import {
  getActor,
  getImg,
  getActors,
} from '../../../redux/features/slices/CreateMovieSlice'
import { useMainContext } from '../../../context'
import { motion as m } from 'framer-motion'
import ImgUpload from '../Create_Movie/ImgUpload'
import ActorUpdateImg from '../Get_And_Update_Actors/ActorUpdateImg'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import { TbPhotoX } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import ActorDefault from '../../../assets/actorDefault.jpg'
const Actors = () => {
  const {
    Actor,
    setActor,
    imgUploadDrag,
    removeImgFromHtml,
    imgUpload,
    htmlImg,
  } = useMainContext()

  const style = {
    mainDiv: `w-[700px]   max_md:w-[90%] h-[300px] bg-gray-300  boxshaddow rounded-[12px] flex items-center flex-col justify-center gap-10`,
    input: `outline-none text-gray-400  px-2 rounded-[5px] h-[2.3rem]       outline-none   shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium   `,
    btn: ` w-[90%] text-white  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  }
  const location = useLocation()
  const dispatch = useDispatch()
  const { actorName, img } = useSelector((state: any) => state.createMovie)
  const actorsData = useSelector((state: any) => state.actorsReducer.actorData)
  //   const [img, setImg] = React.useState<string>('')
  //   const [name, setName] = React.useState<string>('')

  const [error, setError] = React.useState<string>('')
  const [dropDownActor, setDropDownActor] = useState<boolean>(false)

  const dropDownRef = React.useRef<HTMLDivElement | null>(null)

  const handleDropDownCancle = () => {
    setDropDownActor(false)
  }
  useOutClick(dropDownRef, handleDropDownCancle)
  const AddActor = (name: string, img: string) => {
    if (Actor.length < 3) {
      if (Actor) {
        setActor([...Actor, { name, img }])
        dispatch(getActors(Actor))
      } else {
        setError('Fill Both Inputs')
        setTimeout(() => {
          setError('')
        }, 300)
      }
    } else {
      setError('Only 3 actors can be added')
      setTimeout(() => {
        setError('')
      }, 300)
    }
    // dispatch(getActor(''))
    error(Actor)
  }
  return (
    <div className={style.mainDiv} onClick={() => actorsData}>
      <div ref={dropDownRef} className="flex flex-col gap-5  items-center  ">
        <div className="flex flex-col gap-2">
          <m.input
            value={actorName}
            maxLength={35}
            animate={{
              x:
                error === 'Fill Both Inputs'
                  ? [20, 0, -20, 0, 20, 0, -20, 0]
                  : [],
            }}
            transition={{
              duration: 0.2,
            }}
            className={style.input}
            onClick={() => setDropDownActor(!dropDownActor)}
            onChange={(e) => dispatch(getActor(e.target.value))}
            type="text"
            placeholder="Actor Name"
          />
          {location.pathname === '/add-actor' && (
            <div className="w-[200px] h-[200px]">
              <label
                onDrop={(e) => imgUploadDrag(e)}
                className="text-[2rem]     items-center justify-center text-gray-300   cursor-pointer  rounded-[6px] flex "
                htmlFor="photo"
              >
                <div
                  title="upload photo drag and drop "
                  className=" z-10  boxshaddow  absolute bg-gray-300/10 hover:bg-gray-300/40       transition-all group-hover:w-full  rounded-[20px] flex items-center justify-center cursor-pointer"
                >
                  {htmlImg ? (
                    <TbPhotoX
                      className="text-[4rem] z-50 absolute text-green-600 boxshaddow rounded-[50px] outline-[1px] outline outline-yellow-300 hover:text-red-600 transition-all group-hover:w-full  "
                      onClick={() => removeImgFromHtml()}
                    />
                  ) : (
                    <MdOutlineAddAPhoto className="text-[4rem] text-blue-300 hover:text-green-600 transition-all group-hover:w-full " />
                  )}
                </div>
                (
                <img
                  className="rounded-[20px] w-[200px] h-[200px] "
                  src={htmlImg ? htmlImg : ActorDefault}
                />
                )
                <input
                  onChange={(e) => imgUpload(e)}
                  id="photo"
                  className=" hidden block w-full text-sm  text-[#ec2b58]  boxshaddow  border border-gray-300 rounded-lg cursor-pointer   bg-[#2e2d2d] dark:text-gray-400 focus:outline-none bg-[#2e2d2d]   dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                />
              </label>
            </div>
          )}
          {dropDownActor && (
            <div className="bg-gray-200 boxshaddow rounded-[10px] w-[200px] overflow-y-scroll max-h-[200px] absolute mt-10  items-center p-2">
              {actorsData.actorsData
                ?.filter((val: any) => {
                  if (
                    val.name.toLowerCase().includes(actorName.toLowerCase())
                  ) {
                    return val
                  }
                })
                ?.map((val: any, index: number) => (
                  <div
                    key={String(val.id + index + val.name)}
                    onClick={() => {
                      dispatch(getActor(val.name)), AddActor(val.name, val.img)
                    }}
                    className="cursor-pointer hover:bg-gray-300 px-2 hover:text-gray-500 rounded-[2px]"
                  >
                    {val.name}
                  </div>
                ))}
            </div>
          )}
        </div>
        {/* <button className={style.btn} onClick={() => AddActor()}>
          ADD
        </button> */}
      </div>
      <div className="flex gap-5 ">
        {Actor.map((val: any, index: number) => {
          return (
            <div
              key={String(val.img + val.name + index)}
              className="flex items-center justify-center flex-col"
            >
              <img
                className="w-[100px] h-[100px] boxshaddow rounded-[10px]"
                src={val.img}
              />
              <h1 className="text-[1.6rem] text-gray-800">{val.name}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Actors
