import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useOutClick from '../../../../Hooks/useOutClick'
import { topMovieGenres } from '../../../../assets/dummydata/data'
import { getGenre } from '../../../../redux/features/slices/CreateMovieSlice'

const Genre = () => {
  const style = {
    movieGen: `flex flex-col items-center  justify-center gap-2`,
    genInput: `outline-none text-center rounded-[10px] w-[9rem] h-[2rem]`,
    genreDiv: ` z-10  flex flex-col absolute top-[44rem] bg-gray-200 boxshaddow w-[9rem] max-h-[9rem] rounded-[15px] items-center text-[1.1rem] overflow-y-scroll  element-without-scrollbar py-1  `,
  }

  const dispatch = useDispatch()
  const genere = useSelector((state: any) => state.createMovie.genere)
  const [searchGenre, setSearchGenre] = React.useState<string>('')

  const [dropDownGenre, setDropDownGenre] = React.useState<boolean>(false)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)
  const handleOutClick = () => {
    setDropDownGenre(false)
  }

  useOutClick(dropDownRef, handleOutClick)

  const [genreArray, setGenreArray] = React.useState<string[]>([])
  const TakeGenere = (genre: string) => {
    if (genreArray.length < 2) {
      if (!genreArray.includes(genre)) {
        setGenreArray((prevArray) => [...prevArray, genre])
      }
    }
    // console.log(genreArray)
    dispatch(getGenre(genreArray.toString()))
  }
  const RemoveGenre = (genere: string) => {
    let newArr = genreArray.filter((val: string) => val !== genere)
    setGenreArray(newArr)
  }
  // React.useEffect(() => {
  //   console.log()
  // }, [genreArray])
  return (
    <div ref={dropDownRef} className={style.movieGen}>
      <h1> Genre</h1>
      <input
        onClick={() => setDropDownGenre(!dropDownGenre)}
        onChange={(e) => setSearchGenre(String(e.target.value))}
        className={style.genInput}
        type="text"
        placeholder={genere}
      />

      {dropDownGenre && (
        <div className={style.genreDiv}>
          {topMovieGenres
            .filter((val: string) =>
              String(val).toLowerCase().includes(searchGenre.toLowerCase()),
            )
            .map((val: string) => {
              return (
                <div
                  className="cursor-pointer hover:bg-gray-400 hover:text-white w-[100%] transition-all group-hover:w-full   ml-2 rounded-[5px] flex items-center justify-center"
                  onClick={() => {
                    TakeGenere(val)
                  }}
                  key={val}
                >
                  {val}
                </div>
              )
            })}
        </div>
      )}
      <div className="flex gap-2 w-[300px] flex-wrap absolute ml-[10rem] top-[41rem] z-0">
        {genreArray.slice(0, 2).map((val: string) => {
          return (
            <div
              onClick={() => RemoveGenre(val)}
              key={val}
              className="boxshaddow p-1 rounded-[9px] bg-gray-100"
            >
              {val}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Genre
