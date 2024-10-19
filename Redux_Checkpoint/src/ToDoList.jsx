import React, { useEffect, useRef, useState } from 'react'
import './ToDoList.css'
import ToDoForm from './ToDoForm'
import {v4 as uuidv4} from 'uuid'
import ToDoItem from './ToDoItem'
uuidv4()

const ToDoList = () => {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [completedWanted, setCompletedWanted] = useState(false)

    //if the task input box is not empty, add the task to the list. Otherwise, show the error message
    function addTask(taskValue){
        setTasks([...tasks, {id: uuidv4(), taskValue: taskValue, completed: false}])
    }

    //filter out task by index from array to delete task
    function deleteTask(id){
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //if the checkbox is clicked, indicate change the state of the completed boolean of the task to indicate that the task was completed
    function toggleComplete(id){
        setTasks(tasks.map(task => (task.id == id) ? {...task, completed: !task.completed} : task ))
    }


    function showCompleted(){
        setCompletedTasks(tasks.filter((task) => task.completed == true))
    }

  return (
    <>
        <ToDoForm addTask={addTask}/>

        <ol className={completedWanted ? "hidden" : "mt-14 space-y-4 flex flex-col items-center pb-8"}>
            {tasks.map((task, index) => (
                <ToDoItem task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} key={index} />
            ))}
        </ol>

        <ol className={completedWanted ? "mt-14 space-y-4 flex flex-col items-center pb-8" : "hidden"}>
            {completedTasks.map((task, index) => (
                <ToDoItem task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} key={index} />
            ))}
        </ol>

        <div className="flex justify-center"><button className="text-[15pt] text-white bg-[#9541b6] hover:bg-[#af5ad1] pt-2.5 pb-2.5 pr-6 pl-6 duration-500" onClick={() => {showCompleted(); setCompletedWanted(!completedWanted);}}>{!completedWanted ? "SHOW COMPLETED TASKS" : "SHOW ALL TASKS"}</button></div>
    </>
  )
}

export default ToDoList