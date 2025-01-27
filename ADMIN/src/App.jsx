import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Home from './Pages/Home'
import Dasboard from './Pages/Dasboard'
import Footer from './Components/Footer'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/*' element={
          <>
            <Navbar/>
            <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/dashboard' element={<Dasboard/>} />
            </Routes>
            <Footer/>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
