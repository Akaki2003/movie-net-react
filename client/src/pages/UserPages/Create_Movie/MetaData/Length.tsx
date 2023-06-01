import React from 'react'
import { useDispatch } from 'react-redux'
import { getLength } from '../../../../redux/features/slices/CreateMovieSlice'
const Length = () => {
  const style = {
    input: `w-[4.2rem] h-[2rem] text-center outline-none rounded-[5px] px-1   appearance-none `,
    inputDiv: `flex outline-none gap-1`,
    movieLength: `flex flex-col items-center   justify-center gap-2`,
  }
  const dispatch = useDispatch()
  const [hr, sethr] = React.useState<number | null>(null)
  const [min, setmin] = React.useState<number | null>(null)
  React.useEffect(() => {
    let string = `${hr}h ${min}m`
    dispatch(getLength(String(string)))
  }, [min, hr])
  return (
    <div className={style.movieLength}>
      <h1>Movie Length</h1>

      <div className={style.inputDiv}>
        {' '}
        <div className="flex flex-col items-center">
          <input
            onChange={(e) => sethr(Number(e.target.value))}
            value={hr ? hr % 24 : ''}
            type="number"
            className={style.input}
            maxLength={2}
            placeholder="hr"
          />{' '}
          <h2> Hour</h2>
        </div>
        <div className="flex flex-col">
          {' '}
          <input
            onChange={(e) => setmin(Number(e.target.value))}
            value={min ? min % 60 : ''}
            type="number"
            className={style.input}
            maxLength={2}
            placeholder="min"
          />
          <h2> Minutes</h2>
        </div>
        {/* <input
          type="number"
          className={style.input}
          maxLength={2}
          placeholder="sec"
        /> */}
      </div>
    </div>
  )
}

export default Length
