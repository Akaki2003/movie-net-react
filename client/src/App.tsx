import { useState } from 'react'
import MainPage from './pages/mainPage'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import LogIn from './pages/Registration/LogIn'
import Signup from './pages/Registration/Signup'
import AuthPage from './pages/Registration/AuthPage'
import UserPanel from './pages/UserPages/UserPannel'
import SingleMovieMain from './pages/MainPage/Single-Movie-Inside-Components/SingleMovieMain'
import UpdateMovie from './pages/UserPages/UpdateMovie/UpdateMovie'
import PostActorMain from './pages/UserPages/Create_Actors/PostActorMain'
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/authorisation" element={<AuthPage />} />
        <Route path="/user-main" element={<UserPanel />} />
        <Route path="/movie/:id" element={<SingleMovieMain />} />
        <Route path="/movie-edit/:id" element={<UpdateMovie />} />
        <Route path="/add-actor" element={<PostActorMain />} />
      </Routes>
    </>
  )
}

export default App
