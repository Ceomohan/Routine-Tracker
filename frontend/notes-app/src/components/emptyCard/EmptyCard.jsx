import React from 'react'

const EmptyCard = ({noteImg,message}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 ">
        <img src={noteImg} alt="No Notes" className="w-60" />
        <p className="w-1/2 text-sm font-medium text-slate-600 text-center leading-7 mt-8 ">
            {message}
            </p>
    </div>
  )
}

export default EmptyCard