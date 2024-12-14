import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'

const PasswordInput = ({value,onChange,placeholder}) => {
        const[isShowPassword,setIsShowPassword] = useState(false)

        const togglePassword = ()=>{
            setIsShowPassword(!isShowPassword)
        }

  return (
    <div className="flex items-center  bg-transparent border rounded px-5 mb-4 ">
        <input 
        value={value}
        onChange={onChange}
        type={ isShowPassword ? "text": "password"}
        placeholder={placeholder || "password"}
        className="w-full text-sm bg-transparen py-3 mr-4 rounded outline-none"
        />
       { isShowPassword ? ( <FaRegEye
        size={22}
        className="text-primary cursor-pointer"
        onClick={()=>togglePassword()}
        /> ) : (
            <FaRegEyeSlash 
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={()=>togglePassword()}
            />
        )

       }


    </div>
  )
}

export default PasswordInput