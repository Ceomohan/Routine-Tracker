import React from 'react'
import {MdOutlinePushPin,MdCreate,MdDelete} from 'react-icons/md'
import moment from "moment"

const Notes = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onPinNote,
    onDelete
}) => {
  return (
    <div className="border rounded p-4 bg-white transition-all ease-in-out ">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium" >{title}</h6>
                <span className="text-xs font-medium" >{moment(date).format("Do MMM YYYY")}</span>
            </div>

            <MdOutlinePushPin className={`icon-btn ${isPinned ? "text-primary":"text-slate-300"}`} onClick={onPinNote} />
        </div>
        <p className="">{content?.slice(0,60)}</p>

        <div className="flex items-center justify-between mt-2">
            <div className="text-sm font-medium text-slate-500">
                {tags.map((item)=>`#${item}`)}
            </div>

            <div className="flex items-center gap-3">
                <MdCreate
                className="icon-btn hover:text-green-400"
                onClick={onEdit}
                />
                <MdDelete 
                className="icon-btn hover:text-red-500"
                onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default Notes