import React from 'react'
import BarChartP from '../Components/BarChartP'
import DistricWise from '../Components/DistricWise'

function Dasboard() {
  return (
    <div className='mt-25 px-10'>
      <h1 className='text-4xl text-green-600 font-medium text-center'>Dashborad</h1>
      <div className='flex space-x-10 h-full py-10 justify-center items-center'>
      <BarChartP/>
      <DistricWise/>
      </div>
    </div>
  )
}

export default Dasboard
