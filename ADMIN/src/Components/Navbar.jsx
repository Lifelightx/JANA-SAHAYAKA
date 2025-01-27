import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/logoOdisha.jpg'
function Navbar() {
  const navigate = useNavigate()
  const handlelogout = ()=>{
    localStorage.removeItem("admin_token")
    navigate("/", { replace: true })
  }
  return (
    <nav className="bg-slate-100 w-full fixed top-0 z-50">
      <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          <img src={logoImg} alt="Logo" className="w-20 rounded-full h-20" />
          <h1 className='font-medium '>Admin Panel</h1>
          <ul className="flex justify-end items-center space-x-4">
            <li className="mr-6">
              <NavLink 
                to="/home" 
                className="text-slate-700 text-sm font-medium hover:text-black"
              >
                Home
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink 
                to="/dashboard" 
                className="text-slate-700 text-sm font-medium hover:text-black"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <button 
                onClick={handlelogout} 
                className="text-white text-sm cursor-pointer font-medium py-2 px-4 rounded-full bg-red-500 hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
