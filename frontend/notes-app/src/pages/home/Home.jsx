import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Notes from '../../components/cards/Notes'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/toastMessage/Toast'
import notesImage from "../../assets/images/images.png"
import EmptyCard from '../../components/emptyCard/EmptyCard'
import notesImage2 from "../../assets/images/noData.jpg"



const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [showToastMsg,setShowToastMsg] = useState({
    isShown:false,
    type:"add",
    message:""
  })

  const [isSearch,setIsSearch] = useState(false)

  const navigate = useNavigate()
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }

  const showToastMessage = (message,type) =>{
    setShowToastMsg({
      isShown:true,
      message,
      type
    })
  }
  const handleToast = ()=>{
    setShowToastMsg({
      isShown:false,
      message:""
    })
  }

  const [userInfo, setUserInfo] = useState("")
  const [allNotes, setAllNotes] = useState([])
  // get user info
  const getUserInfo = async () => {

    try {
      const response = await axiosInstance.get("/get-user")
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        navigate('/login')
      }
    }
  }

  // get-all-notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes")
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log("An unexpected error occured please try again")
    }
  }

  // delete-note
  const deleteNote = async (data)=>{
    const noteId = data._id
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId)
      if(response.data && !response.data.error){
        showToastMessage("Note deleted successfully","delete")
        getAllNotes()
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        console.log("An unexpected error occured please try again")
      }
    }
  }

  // search for notes
  const onSearchNote = async (query)=>{
    try{
      const response = await axiosInstance.get("/search-notes",{
        params:{query}
      })
      if(response.data && response.data.notes){
        setIsSearch(true)
        setAllNotes(response.data.notes)
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleClearSeach = ()=>{
    setIsSearch(false)
    getAllNotes()
  }




  useEffect(() => {
    getAllNotes()
    getUserInfo()
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSeach={handleClearSeach} />
      <div className='container mx-auto'>
        {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
          {
            allNotes.map((item, index) => (
              <Notes
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() =>deleteNote(item)}
                onPinNote={() => { }}
              />
            ))
          }

        </div>: <EmptyCard noteImg={isSearch? notesImage2 :notesImage} message={isSearch?"oops! no notes matching your seach":"Add Your Notes Here"}/>}
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 "
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>


      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          }
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast 
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleToast}
      />

    </>
  )
}



export default Home

// The full Stack project is completed on 30/9/24 at 1:30 A.M with full Functionality of frontend and Backend. ! ThankYou Lets Keep Practicing