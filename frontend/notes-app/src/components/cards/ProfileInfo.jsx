import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({onLogOut,userInfo}) => {
  return (
    <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-blue-300 ">
            {getInitials()}
        </div>
        <div>
            <p className="text-sm font-medium ">Mohan Raj</p>
            <button className="text-sm text-slate-700 underline" onClick={onLogOut}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo