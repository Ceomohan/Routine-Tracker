import React, { useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import {useNavigate} from 'react-router-dom'
import SearchBar from '../searchbar/SearchBar'

const Navbar = ({userInfo,onSearchNote,handleClearSeach}) => {

  const navigate = useNavigate()
  const [searchQuery,setSeachQuery] = useState("")

  const onLogOut = ()=>{
    navigate('/login')

  }
  const handleSearch = ()=>{
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = ()=>{
    setSeachQuery("")
    handleClearSeach()
  }


  return (
    <div className=" bg-white flex justify-between items-center px-6 py-2 drop-shadow ">
        <h4 className="text-xl font-medium text-black py-2">Notes</h4>

        <SearchBar 
        value={searchQuery}
        onChange={({target})=>{
          setSeachQuery(target.value)
        }} 
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />
        <ProfileInfo onLogOut={onLogOut} userInfo={userInfo}/>

    </div>
  )
}

export default Navbar