import React, { FC } from 'react'
import { UpdatedValuesType } from './UpdateMovie'

type textAreaProps = {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  TITLE: string
}

const TextareaComponent: FC<textAreaProps> = ({ setState, state, TITLE }) => {
  const style = {
    mainDiv: ` flex flex-col justify-around px-3  w-[100%] p-2 bg-gray-300 boxshaddow rounded-[20px]`,
  }

  return (
    <div className={style.mainDiv}>
      <p className="h-[30px]">{TITLE}</p>
      <div className="w-[100%] h-[1px] bg-gray-400"></div>
      <textarea
        className="outline-none bg-transparent w-[100%] h-[200px] max-h-[500px]"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  )
}

export default TextareaComponent
