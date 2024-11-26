import React, { useEffect, useRef, useState } from 'react'
import './ToDoList.css'
import ToDoForm from './ToDoForm'
import {v4 as uuidv4} from 'uuid'
import ToDoItem from './ToDoItem'
uuidv4()

const ToDoList = () => {
    const [tasks, setTasks] = useState([])

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

    // //move task up if it's not the first task in the list
    // function moveTaskUp(index){
    //     if(index > 0){
    //         const updatedTasks = [...tasks];
    //         [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
    //         setTasks(updatedTasks)
    //     }
    // }

    // //move task down if it's not the last task in the list
    // function moveTaskDown(index){
    //     if(index < tasks.length - 1){
    //         const updatedTasks = [...tasks];
    //         [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
    //         setTasks(updatedTasks)
    //     }
    // }

  return (
    <>
        <ToDoForm addTask={addTask}/>

        <ol className="mt-14 space-y-4 flex flex-col items-center">
            {tasks.map((task, index) => (
                <ToDoItem task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} key={index} />
            ))}
        </ol>
    </>
  )
}

export default ToDoList