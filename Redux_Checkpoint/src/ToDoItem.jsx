import React, { useRef, useState } from 'react'

const ToDoItem = (props) => {
    const [editWanted, setEditWanted] = useState(false)
    const [taskValue, setTaskValue] = useState(props.task.taskValue)
    const [edit, setEdit] = useState(props.task.taskValue)
    const editErrorMsg = useRef()

  return (
    <>
    <li  className={`flex justify-between w-[25%] text-[#652f7a] p-4 ${props.task.completed ? "bg-green-200/50" : "bg-white/50"}`}>
        <input type="checkbox" className="accent-green-700 w-10" onClick={() => props.toggleComplete(props.task.id)} />
        <div className={editWanted ? "hidden" : "text-center"}>
            <span className={`${props.task.completed ? "text-green-700" : ""}`}>{taskValue.toUpperCase()}</span>
            <p className={`${props.task.completed ? "text-green-700 text-[8pt]" : "hidden"}`}>Completed</p>
        </div>

        {/* Edit form */}
        <div className={editWanted ? "" : "hidden"}>
            <input type="text" placeholder="Edit this task" value={edit} onChange={(event) => setEdit(event.target.value)} className="border-2 text-[#9541b6] border-[#9541b6] duration-500 focus:border-[#af5ad1] placeholder:text-[#ce85eb] focus:outline-none p-1.5" />
            <p ref={editErrorMsg} className="hidden">Please enter a value</p>
        </div>

        <div>
            {/* Move up and move down buttons (scrapped) */}
            {/* <button onClick={() => moveTaskUp(index)}><span class="material-symbols-outlined align-middle">keyboard_arrow_up</span></button>
            <button onClick={() => moveTaskDown(index)}><span class="material-symbols-outlined align-middle">keyboard_arrow_down</span></button> */}

            {/* Edit, undo, save and delete button */}
            <button onClick={() => {setEditWanted(!editWanted); setEdit(taskValue)}}><span class="material-symbols-outlined align-middle">{!editWanted ? "edit":"undo" }</span></button>
            <button onClick={() => {
                if(edit.trim() == "") {
                    editErrorMsg.current.className = "text-red-600 text-center"
                    setTimeout(() => {editErrorMsg.current.className = "hidden"}, 2500)
                } else {
                    setEditWanted(!editWanted);
                    setTaskValue(edit)
                }
                }}><span className={editWanted ? "material-symbols-outlined align-middle" : "hidden"}>save</span></button>
            <button onClick={() => props.deleteTask(props.task.id)}><span class="material-symbols-outlined align-middle">delete</span></button>
        </div>
    </li>
    </>
  )
}

export default ToDoItem