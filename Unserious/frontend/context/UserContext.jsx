import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        //if a user is logged in on the page, get the user's profile
        if(!user) {
            axios.get('/user').then(({data}) => {
                setUser(data)
            }) 
        }
    }, [])
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}