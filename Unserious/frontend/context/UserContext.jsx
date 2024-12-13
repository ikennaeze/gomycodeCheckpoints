import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {

    const [user, setUser] = useState(null);
    const [userUsername, setUserUsername] = useState("")

    useEffect(() => {
        //if a user is logged in on the page, get the user's profile
        if(!user) {
            axios.get('/auth/getUser').then(({data}) => {
                setUserUsername(data.username)
            })

            if(userUsername){
                axios.get(`/user/getUser?username=${userUsername}`)
                .then(({data}) => {
                    setUser(data)
                })
            }
        }
    })
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}