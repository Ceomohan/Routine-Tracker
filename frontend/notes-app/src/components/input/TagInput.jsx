import React ,{useState} from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState("")

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue("")
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag()
        }
    }
    const handleRemoveTag = (tagToRemove)=>{
       setTags(tags.filter((tag)=>tag!==tagToRemove)) 
    }


    return (
        <div>

            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center justify-center gap-2 text-slate-600 bg-slate-50 px-4  py-2 rounded"
                        >
                            #{tag}
                            <button
                                onClick={() => {handleRemoveTag(tag)}}
                            >
                                <MdClose />
                            </button>

                        </span>
                    ))
                }
                </div>
            )}


            <div className="flex items-center gap-3 mt-4">
                <input
                    type='text'
                    value={inputValue}
                    className="text-sm bg-transparent border rounded px-3 py-2 outline-none"
                    placeholder="Add Tags"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="w-8 h-8 flex items-center justify-center border rounded border-blue-600 hover:bg-blue-700 "
                    onClick={() => { 
                        addNewTag()
                     }}
                >
                    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
                </button>
            </div>
        </div>
    )
}

export default TagInput