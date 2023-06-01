import React from 'react'
import { SketchPicker } from 'react-color'
import { useMainContext } from '../../../context'
import useOutClick from '../../../Hooks/useOutClick'
const ColorDiv = () => {
  const {
    handleColor,
    color1,
    setColor1,
    color2,
    setColor2,
    handleColor2,
  } = useMainContext()

  const [dropDownColor1, setDropDownColor1] = React.useState<boolean>(false)
  const [dropDownColor2, setDropDownColor2] = React.useState<boolean>(false)

  const dropDownRef = React.useRef<HTMLDivElement | null>(null)
  const handelClick = () => {
    setDropDownColor1(false)
    setDropDownColor2(false)
  }

  useOutClick(dropDownRef, handelClick)
  return (
    <div ref={dropDownRef} className="flex  gap-2">
      <div
        style={{ color: `${color1}` }}
        onClick={() => setDropDownColor1(!dropDownColor1)}
        className="w-[350px] font-bold h-[3rem] bg-gray-300 boxshaddow rounded-[8px] flex items-center justify-center "
      >
        {color1 ? color1 : 'Color-1'}
      </div>
      {dropDownColor1 && (
        <div className="  absolute  mt-10">
          <SketchPicker color={color1} onChangeComplete={handleColor} />
        </div>
      )}
      <div
        style={{ color: `${color2}` }}
        onClick={() => setDropDownColor2(!dropDownColor2)}
        className="w-[350px] font-bold h-[3rem] bg-gray-300 boxshaddow rounded-[8px] flex items-center justify-center "
      >
        {color2 ? color2 : 'Color-2'}
      </div>
      {dropDownColor2 && (
        <div className="  absolute  ml-60 mt-10">
          <SketchPicker color={color2} onChangeComplete={handleColor2} />
        </div>
      )}
    </div>
  )
}

export default ColorDiv
