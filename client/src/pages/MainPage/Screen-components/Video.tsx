import React, { FC } from 'react'
type VideoPropType = {
  video: string
  color: string
}
const Video: FC<VideoPropType> = ({ video, color }) => {
  return (
    <div className="absolute flex items-center justify-center  rounded-[20px]">
      <iframe
        style={{ boxShadow: `2px 0.25rem 0.9rem ${color}` }}
        className="rounded-[15px]"
        width="560"
        height="315"
        src={video}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  )
}

export default Video
