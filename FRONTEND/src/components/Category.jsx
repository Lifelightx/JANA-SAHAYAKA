import React from 'react'

function Category({img, name}) {
  return (
    <div className="flex flex-col items-center p-4 bg-white border-1 border-slate-200">
      <img 
        src={img} 
        alt={name}
        className="w-40 h-40 object-cover mb-3"
      />
      <h3 className="text-lg font-medium text-slate-700">{name}</h3>
    </div>
  )
}

export default Category
