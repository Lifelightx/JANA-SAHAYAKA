import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../Context'
import { FaSearch } from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'

function Home() {
  const { adminToken } = useContext(StoreContext)
  console.log("Token: ", adminToken)
  const [complaints, setComplaints] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/complaints", {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    })
      .then(res => setComplaints(res.data))
      .catch(err => console.log(err))

  }, [adminToken])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value)
  }

  const filteredComplaints = complaints.filter(complaint =>
    complaint._id.toString().includes(searchTerm) ||
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const departmentFilteredComplaints = selectedDepartment ? filteredComplaints.filter(complaint => complaint.assignedDepartment === selectedDepartment) : filteredComplaints

  return (
    <div className='my-25 flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-left mb-4 text-green-700 underline underline-offset-4'>All Complaints</h1>
      <div className='flex items-center w-full px-10 justify-between mb-4'>
        <div className='flex items-center justify-between'>
          <FaSearch className='mr-2 text-green-700' />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by ID or details..."
            className='border p-2 rounded border-green-600 text-green-700'
          />
          <select value={selectedDepartment} onChange={handleDepartmentChange} className='ml-2 border border-green-600 text-green-800 p-2 rounded'>
            <option value="">All Departments</option>
            <option value="road">road</option>
            <option value="water_supply">water supply</option>
            <option value="education">Education</option>
            <option value="sanitary">Sanitary</option>
            <option value="health">Health</option>
            <option value="electricity">Electricity</option>
          </select>
        </div>
        <div>
          <span className='font-medium text-orange-600 text-lg'>Total number of complaints : {complaints.length}</span>
        </div>
      </div>
      <div className='flex flex-col w-[80%] justify-center'>

        {!complaints ? "Loading..." : departmentFilteredComplaints.map((complaint, index) => (
          <div key={index} className=' m-2 p-4 border border-slate-200 rounded shadow'>
            <h2 className='text-lg font-bold text-green-700 '>Title: {complaint.title}</h2>
            <p>Complaint ID: <span className='font-medium'>{complaint._id}</span> </p>
            <p>Category: {complaint.category}</p>
            <p>Description: {complaint.description}</p>
            <p>Location: {complaint.location}</p>
            <p>Status: <span className='font-medium' style={{ color: complaint.status === 'Resolved' ? 'green' : complaint.status === 'In Progress' ? 'orange' : 'red' }}>{complaint.status}</span></p>
            <p>Assigned Department: <span className='font-medium text-slate-800'>{complaint.assignedDepartment}</span></p>
            <p>Created At: {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
