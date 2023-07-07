import React from 'react'
import ActorsListView from './ActorsListView'
const ActorsMain = () => {
  const style = {
    section: `w-[100%] ZindexMinus h-[100%] flex py-10  items-center justify-center`,
  }

  return (
    <section className={style.section}>
      <ActorsListView />
    </section>
  )
}

export default ActorsMain
