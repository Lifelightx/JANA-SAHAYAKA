import { Outlet } from "react-router-dom";
import React from 'react'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
