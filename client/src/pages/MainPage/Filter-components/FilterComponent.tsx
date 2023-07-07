import React, { FC, useState } from 'react'
import { RiArrowDropUpFill, RiArrowDropDownFill } from 'react-icons/ri'
import { motion as m } from 'framer-motion'
import useOutClick from '../../../Hooks/useOutClick'
type FilterPropsType = {
  filterData: string[]
  filterState: string
  defaultString: string
  setStateAction: React.Dispatch<React.SetStateAction<string>>
}

const FilterComponent: FC<FilterPropsType> = ({
  filterData,
  filterState,
  defaultString,
  setStateAction,
}) => {
  const style = {
    mainDiv: `w-[15rem] h-[3rem] bg-gray-200     relative boxshaddow rounded-[20px] flex items-center  justify-around `,
    input: ` outline-none w-[8rem] bg-transparent text-center`,
    arrowDiv: `flex items-center justify-around w-[95%] cursor-pointer`,
    mappedDiv: `  absolute top-10 bg-gray-200 w-[100%] z-50 overflow-y-scroll  element-without-scrollbar  max-h-[200px] items-center flex flex-col rounded-b-[9px]  rounded-t-[6px] boxshaddow `,
    selectItem: `hover:bg-gray-400 hover:text-white w-[100%] rounded-[5px] cursor-pointer flex items-center justify-center`,
  }
  const [search, setSearch] = useState<string>('')
  const [dropDown, setDropDown] = useState<boolean>(false)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)
  const handleDropDownCancle = () => {
    setDropDown(false)
  }
  useOutClick(dropDownRef, handleDropDownCancle)
  return (
    <div ref={dropDownRef} className={style.mainDiv}>
      <div className={style.arrowDiv} onClick={() => setDropDown(!dropDown)}>
        <input
          placeholder={defaultString}
          onChange={(e) => setSearch(String(e.target.value))}
          value={filterState ? filterState : search}
          className={style.input}
        />
        {dropDown ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>
      <m.div
        animate={{
          visibility: dropDown ? 'visible' : 'hidden',
        }}
        className={style.mappedDiv}
      >
        {filterData
          .filter((val) => {
            if (search === '') {
              return val
            } else if (val.toLowerCase().includes(search.toLowerCase())) {
              return val
            }
          })
          .map((val: string | number, i: number) => {
            return (
              <div
                key={i}
                onClick={() => setStateAction(String(val))}
                className={style.selectItem}
              >
                {val}
              </div>
            )
          })}
      </m.div>
    </div>
  )
}

export default FilterComponent
