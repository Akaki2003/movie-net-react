import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getYear } from '../../../../redux/features/slices/CreateMovieSlice'
import useOutClick from '../../../../Hooks/useOutClick'
const Year = () => {
  const dispatch = useDispatch()
  const style = {
    yearDiv: ` z-10  flex flex-col absolute top-[41rem] bg-gray-200 boxshaddow w-[9rem] max-h-[9rem] rounded-[15px] items-center text-[1.1rem] overflow-y-scroll  element-without-scrollbar py-1  `,
    yearInput: `outline-none text-center rounded-[10px] w-[9rem] h-[2rem]`,
    movieLength: `flex flex-col items-center  justify-center gap-2`,
  }
  const year = useSelector((state: any) => state.createMovie.year)

  const yearArray = Array.from(
    { length: 2024 - 1900 },
    (_, index) => 1900 + index,
  )
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)
  const handleOutClick = () => {
    setDropDownYear(false)
  }
  useOutClick(dropDownRef, handleOutClick)
  const [searchYear, setSearchYear] = React.useState<string>('')
  const [dropDownYear, setDropDownYear] = React.useState<boolean>(false)
  return (
    <div ref={dropDownRef} className={style.movieLength}>
      <h1>Release year</h1>
      <input
        onClick={() => setDropDownYear(!dropDownYear)}
        onChange={(e) => setSearchYear(String(e.target.value))}
        className={style.yearInput}
        type="number"
        max={2000}
        placeholder={year}
      />

      {dropDownYear && (
        <div className={style.yearDiv}>
          {yearArray
            .filter((val: number) => String(val).includes(searchYear))
            .map((val: number) => {
              return (
                <div
                  className="cursor-pointer hover:bg-gray-400 hover:text-white w-[100%] transition-all group-hover:w-full   ml-2 rounded-[5px] flex items-center justify-center"
                  onClick={() => dispatch(getYear(String(val)))}
                  key={val}
                >
                  {val}
                </div>
              )
            })}
        </div>
      )}
      <p
        className={`flex gap-2 w-[4rem] ml-[0rem]  items-center justify-center text-center flex-wrap absolute top-[41rem] z-0 boxshaddow p-1 rounded-[9px] bg-gray-100 ${
          !year && 'hidden'
        }`}
      >
        {year}
      </p>
    </div>
  )
}

export default Year
