import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({ onClose, noteData, type, getAllNotes,showToastMessage }) => {

    const [title, setTitle] = useState(noteData?.title || "")
    const [content, setContent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, setError] = useState(null)

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title: title,
                content: content,
                tags: tags
            })
            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully")
                getAllNotes()
                onClose()

            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.respone.data.message)
            }
        }
    }

    const editNote = async () => {
        const noteId = noteData._id
        try {
            
            const response = await axiosInstance.put("/edit-note/"+noteId, {
                title,
                content,
                tags,
            })
            if (response.data && response.data.note) {
                showToastMessage("Note updated successfully")
                getAllNotes()
                onClose()

            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.respone.data.message)
            }
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("please add The Title")
            return
        }
        if (!content) {
            setError("please Add a Content")
            return
        }
        setError("")
        if (type === 'edit') {
            editNote()
        }
        else {
            addNewNote()
        }

    }

    return (
        <div className="relative">

            <button className="w-10 h-10 flex items-center justify-center absolute -top-3 -right-3 rounded-full" onClick={onClose}>
                <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label">Title</label>
                <input
                    type="text"
                    className="text-2xl text-slate-800 outline-none"
                    placeholder="go to gym"
                    value={title}
                    onChange={({ target }) => { setTitle(target.value) }}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Content</label>
                <textarea
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    rows={10}
                    placeholder="content"
                    value={content}
                    onChange={({ target }) => { setContent(target.value) }}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-xs text-red-500 pt-4">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3" onClick={() => { handleAddNote() }}>
                {type === "edit" ? "UPDATE" : "ADD"}
            </button>


        </div>
    )
}

export default AddEditNotes