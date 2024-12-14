import React from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className="w-80 flex items-center rouded-md px-4 bg-slate-100 ">
        <input
        type="text"
        placeholder="search here"
        value={value}
        onChange={onChange}
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        
        />

        {value && (
            <IoMdClose
            className="text-slate-400 text-xl cursor-pointer hover:text-black mr-2"
            onClick={onClearSearch}
            />
        )}

        <FaMagnifyingGlass 
        className="text-xs text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
        />
    </div>
  )
}

export default SearchBar