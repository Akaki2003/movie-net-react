import React from 'react'
import { useMainContext } from '../../../context'
import MovieCard from '../../MainPage/MovieCard'
const FavMoviesMain = () => {
  const { favoriteMovies, deleteFromFav } = useMainContext()
  const style = {
    section: `w-[100%] h-[100vh]  items-center justify-center  flex flex-col z-10`,
    main: `gridSystem gap-20 w-[90%] items-center justify-center gap-2   backdrop-blur-sm bg-white/10 rounded-[12px] boxshaddow py-20 px-1   `,
    btnDelete: `text-white w-[360px] bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm  py-2.5 text-center`,
  }
  if (favoriteMovies.length < 0) {
    return (
      <section className={style.section}>
        <h1 className="text-yellow-400 text-[5rem] ">Favorite Movies</h1>
        <main className={style.main}>
          {favoriteMovies?.map((val: any) => (
            <div className="flex flex-col items-center">
              <MovieCard {...val} />
              <button
                onClick={() => deleteFromFav(val._id)}
                className={style.btnDelete}
              >
                Delete
              </button>
            </div>
          ))}
        </main>
      </section>
    )
  } else {
    return (
      <section className={style.section}>
        <main className="text-center">
          <h1 className="text-[5rem] text-red-600 max_smm1:text-[2rem]">
            You Don't Have Any Movies In Favorites
          </h1>
        </main>
      </section>
    )
  }
}

export default FavMoviesMain
