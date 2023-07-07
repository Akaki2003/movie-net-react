import React, { FC } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
type loadingProps = {
  loading: boolean
}
const LoadingComponent: FC<loadingProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <p className="text-[19rem]  z-50 text-[#ec2b58] absolute left-[45%] bottom-80  ">
          <AiOutlineLoading className="rotate" />
        </p>
      )}
    </>
  )
}

export default LoadingComponent
