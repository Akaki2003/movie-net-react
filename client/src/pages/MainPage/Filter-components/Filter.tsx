import React from 'react'
import { useMainContext } from '../../../context'
import { topMovieGenres } from '../../../assets/dummydata/data'
import FilterComponent from './FilterComponent'
const Filter = () => {
  const { setYear, setGenre, setSort, year, genre, sort } = useMainContext()

  const style = {
    section: `w-[90%]  max_sm:flex-col max_sm:gap-1 max_sm:justify-center boxshaddow h-[120px] z-50 flex  items-center justify-end gap-10 px-10 rounded-[10px] py-10 backdrop-blur-sm bg-white/10 `,
  }

  const yearArray = Array.from({ length: 2024 - 1900 }, (_, index) =>
    String(1900 + index),
  )
  const newYearArry = ['All', ...yearArray]
  const sortBy = ['Year', 'IMDb', 'RottenTomatos']
  return (
    <section className={style.section}>
      <FilterComponent
        filterData={newYearArry}
        filterState={year}
        defaultString="Filter By Year"
        setStateAction={setYear}
      />
      <FilterComponent
        filterData={topMovieGenres}
        filterState={genre}
        defaultString="Filter By Genre"
        setStateAction={setGenre}
      />
      <FilterComponent
        filterData={sortBy}
        filterState={sort}
        defaultString="Sort"
        setStateAction={setSort}
      />
    </section>
  )
}

export default Filter
