import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserList = () => {
    const [listOfUser, setListOfUser] = useState([{}])

    const getUser = () => {
        axios.get("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => {
            setListOfUser([...listOfUser, response.data])
        }).catch(error => {
            console.log(error)
        })
    }

  return (
    <>
        <div>
            <button onClick={getUser}>GET USER</button>

            {listOfUser.map(user => (
                <>
                    <p>ID: {user.userId}</p>
                    <p>Title: {user.title}</p>
                    <p>Body: {user.body}</p>
                </>
            ))}
        </div>
    </>
  )
}

export default UserList