import React from 'react'


function Item({ data }) {
  return (
    <div className='shadow-md bg-white text-center'>
      <img 
      className='text-2xl p-10'
      src={data.message}> 
      </img>
    </div>
  )
}

export default Item