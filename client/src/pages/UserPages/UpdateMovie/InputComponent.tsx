import React, { FC } from 'react'
import { UpdatedValuesType } from './UpdateMovie'
type inputProps = {
  // updateValues: UpdatedValuesType
  // type: keyof UpdatedValuesType
  setState: React.Dispatch<React.SetStateAction<string>>
  state: string
  TITLE: string
}

const InputComponent: FC<inputProps> = ({ setState, state, TITLE }) => {
  const style = {
    mainDiv: ` flex justify-around h-[3rem] gap-5 px-3 w-[90%] p-2 bg-gray-300 boxshaddow rounded-[20px]`,
  }
  return (
    <div className={style.mainDiv}>
      <div className="flex  items-center justify-between w-[120px]  ">
        <p className="text-center flex items-center justify-center w-[100%]">
          {TITLE}
        </p>
        <div className="w-[1px] h-[100%] bg-gray-400"></div>
      </div>
      <input
        className="outline-none bg-transparent w-[90%]"
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  )
}

export default InputComponent
