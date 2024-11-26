import React, { useRef, useState } from 'react'

const ToDoForm = (props) => {
    const [newTask, setNewTask] = useState("")
    const errorMsg = useRef()

    function handleTaskAddition(event) {
        event.preventDefault()
        if(newTask.trim() !== ""){
            props.addTask(newTask)
            setNewTask("")
        }else {
            errorMsg.current.className = 'text-red-600'
            setTimeout(() => {errorMsg.current.className = 'hidden'}, 2500)
        }
    }

  return (
    <>
        <form action="">
            <div className="flex flex-col items-center mt-32 text-[#ffffff]">
                <h1 className="font-['montserrat'] text-[20pt] pb-4">IKENNA'S TO-DO-LIST APP</h1>
                <div className="space-x-10">
                    <input type="text" placeholder="Enter a Task" value={newTask} onChange={(event) => setNewTask(event.target.value)} className="border-2 text-[#9541b6] border-[#9541b6] duration-500 focus:border-[#af5ad1] placeholder:text-[#ce85eb] focus:outline-none p-3" />
                    <button type='submit' className="text-[15pt] bg-[#9541b6] hover:bg-[#af5ad1] pt-2.5 pb-2.5 pr-6 pl-6 duration-500" onClick={handleTaskAddition}>ADD</button>
                    <p ref={errorMsg} className="hidden">Please enter a task</p>
                </div>
            </div>
        </form>
    </>
  )
}

export default ToDoForm