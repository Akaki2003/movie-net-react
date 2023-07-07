import React from 'react'
import { useMainContext } from '../../../context'
import { TbPhotoX } from 'react-icons/tb'
import { MdOutlineAddAPhoto } from 'react-icons/md'

const ActorUpdateImg = ({ changedImg }: { changedImg: string }) => {
  const {
    imgUploadDrag,
    removeImgFromHtml,
    imgUpload,
    htmlImg,
  } = useMainContext()
  return (
    <div className="w-[200px] h-[200px]">
      <label
        onDrop={(e) => imgUploadDrag(e)}
        className="text-[2rem]     items-center justify-center text-gray-400   cursor-pointer  rounded-[6px] flex "
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
        <img
          className="rounded-[20px] w-[200px] h-[200px] "
          src={htmlImg ? htmlImg : changedImg}
        />
        <input
          onChange={(e) => imgUpload(e)}
          id="photo"
          className=" hidden block w-full text-sm  text-[#ec2b58]  boxshaddow  border border-gray-300 rounded-lg cursor-pointer   bg-[#2e2d2d] dark:text-gray-400 focus:outline-none bg-[#2e2d2d]   dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
        />
      </label>
    </div>
  )
}

export default ActorUpdateImg
