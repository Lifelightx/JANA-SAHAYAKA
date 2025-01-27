import React, { useContext, useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react';
import villageImage from "../assets/villageImg.jpg"
import CardHome from '../components/CardHome';
import water from "../assets/water.jpg"
import agri from "../assets/agri.jpg"
import electri from "../assets/electricity.avif"
import { Link } from 'react-router-dom';
import education from "../assets/education.avif"
import health from "../assets/health.jpg"
import road from "../assets/road.jpg"
import Category from '../components/Category';
import axios from 'axios';
import { StoreContext } from '../Context';
function Home() {
  const [complaints, setComplaints] = useState(0)
  const [resolved, setResolved] = useState(0)
  const [pending, setPending] = useState(0)
  const {url }= useContext(StoreContext)
  useEffect(()=>{
    axios.get(`${url}/api/admin/noOfComplaints`)
    .then(res => setComplaints( res.data.totalComplaints))
    axios.get(`${url}/api/admin/total-resolved`)
    .then(res => setResolved(res.data.totalResolved))
    axios.get(`${url}/api/admin/total-in-progress`)
    .then(res=>setPending(res.data.totalInProgress))
  },[])
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="container mt-30 mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={villageImage}
              alt="Complaint Registration"
              className="w-100 h-120 object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-serif text-green-900">
              Register Your Complaint <br /> And get a Solution
            </h1>
            <p className="text-slate-700 text-sm font-medium">
              Help us improve your community by reporting local issues quickly and efficiently.
            </p>
            <Link to="/signup" onClick={() => window.location.href='/signup'} className="flex items-center cursor-pointer bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition space-x-2 w-fit">
              <MessageCircle className="mr-2" />
              Register Complaint
            </Link>
          </div>

        </div>
      </div>
      <div className='bg-green-50 flex mb-3 justify-center items-center space-x-14 py-5'>
        <CardHome heading="Total Complaints" number={complaints}/>
        <CardHome heading="Total Resolved" number={resolved}/>
        <CardHome heading="Total In Progress" number={pending}/>
      </div>
      <div className='py-6 mt-4'>
        <h1 className='font-serif text-4xl text-center text-slate-700'>Categories</h1>
        <div className='flex space-x-10 mt-4 justify-center items-center px-8'>
          <Category img={water} name="Water Supply"/>
          <Category img={agri} name="Agriculture"/>
          <Category img={electri} name="Electricity"/>
          <Category img={education} name="Education"/>
          <Category img={health} name="Health"/>
          <Category img={road} name="Road"/>
        </div>
      </div>
    </div>
  )
}

export default Home
