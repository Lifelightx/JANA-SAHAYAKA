import { useContext } from 'react'
import './App.css'
import LoginDepartment from './components/LoginDepartment'
import ComplaintDept from './components/ComplaintDept'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreContext } from './Context'

function App() {
  const {token} = useContext(StoreContext)
  console.log("Token",token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginDepartment/>}/>
        <Route path='/department' element={<ComplaintDept/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
