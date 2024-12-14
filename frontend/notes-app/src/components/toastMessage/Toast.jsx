import React, { useEffect } from 'react'
import { LuCheck } from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'

const Toast = ({ isShown, type, message, onClose }) => {

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            onClose()
        }, 3000)
        return () => {
            clearTimeout(timeOutId)
        }
    },[onClose])

    return (
        <div className={`absolute top-20 right-6 transition-all  duration-400 ${isShown ? "opacity-100" : "opacity-0"} `}>
            <div className={`min-w-52 bg-white border rounded-md shadow-2xl after:w-[5px] after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg `}>
                <div className="flex items-center py-2 px-4 gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type === "delete" ? "bg-red-50" : "bg-green-100"}`}>
                        {type === "delete" ? <MdDeleteOutline className="text-xl text-red-500" /> : <LuCheck className="text-xl text-green-500" />}
                    </div>
                    <p className='text-sm text-slate-400'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Toast