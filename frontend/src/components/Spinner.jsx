import React from 'react'

export default function Spinner(){
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin h-5 w-5 border-2 border-sky-600 border-t-transparent rounded-full"></div>
    </div>
  )
}
