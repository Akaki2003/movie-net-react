import React from 'react'
import { MdLocalMovies } from 'react-icons/md'
import {
  getTitle,
  getDescription,
} from '../../../redux/features/slices/CreateMovieSlice'
import { useDispatch } from 'react-redux'
const TitleAndDec = () => {
  const style = {
    mainDiv: `flex flex-col h-[300px] w-[59%]  max_lg:w-[100%] items-center  gap-2`,
  }
  const dispatch = useDispatch()
  return (
    <div className={style.mainDiv}>
      <div className=" bg-gray-300 w-[100%] rounded-[5px] boxshaddow h-[2rem] flex items-center justify-around ">
        <MdLocalMovies className="text-[1.2rem] text-gray-600" />{' '}
        <input
          onChange={(e) => dispatch(getTitle(e.target.value))}
          type="text"
          className="outline-none bg-transparent px-1 w-[90%]"
          placeholder="Movie Title"
        />
      </div>
      <textarea
        onChange={(e) => dispatch(getDescription(e.target.value))}
        placeholder="Movie Description"
        className="bg-gray-300 h-[300px] max-h-[300px] text-[#ec2b58] w-[100%] h-[100%]    boxshaddow rounded-[5px] p-2"
      ></textarea>
    </div>
  )
}

export default TitleAndDec
