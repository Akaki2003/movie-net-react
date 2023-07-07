import React from 'react'
import { BsPerson } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
const Auth = () => {
  const style = {
    mainDiv: `w-[11rem] h-[3rem] max_sm:w-[5rem] max_sm:h-[2rem] max_sm:justify-center rounded-[40px]  border-2  hover:border-pink-700 flex items-center justify-between px-5 cursor-pointer`,
  }
  const [hover, setHover] = React.useState<boolean>(false)
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate('/authorisation')}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={style.mainDiv}
    >
      <BsPerson
        className={` text-gray-300 text-[1.4rem]  ${hover && 'text-pink-600'}`}
      />
      <h2
        className={` text-gray-400 text-[1rem] max_sm:hidden  font-medium ${
          hover && 'text-pink-600 '
        } `}
      >{`Authorization`}</h2>
    </div>
  )
}

export default Auth
