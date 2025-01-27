import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import ComplaintForm from './components/ComplaintForm'
import Login from './components/Login'
import Signup from './components/Signup'
import Footer from './components/Footer'
import UserHome from './Pages/UserHome'
import { useContext } from 'react'
import { StoreContext } from './Context'
import MyComplaint from './Pages/MyComplaint'
function App() {
  
  const {token} = useContext(StoreContext)
  console.log("Token",token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/*' element={
          <>
            <Navbar/>
            <Routes>
              <Route path='/' element={token?<UserHome/>:<Home/>} />
              <Route path='/about' element={<About/>}/>
              <Route path='/submitComplaint' element={token ?<ComplaintForm/>:<Home/>}/>
              <Route path='/complaints' element={token ?<MyComplaint/>:<Home/>}/>
              <Route path='/userPage' element={<UserHome/>}/>
            </Routes>
            <Footer/>
          </>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
