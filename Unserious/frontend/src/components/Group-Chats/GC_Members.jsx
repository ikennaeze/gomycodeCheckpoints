import React, { useEffect, useRef, useState } from 'react'
import UserProfile from '../UserProfile'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import axios from 'axios'

function GC_Members(props) {
    const [profileOpen, setProfileOpen] = useState(false)
    const profileBtn = useRef(null)

    const [member, setMember] = useState({})

    useEffect(() => {
        axios.get(`/user/getUser?username=${props.member}`)
        .then(({data}) => {
            setMember(data)
        })
    }, [props.member])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileBtn.current && !profileBtn.current.contains(e.target)) {
                setProfileOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])  // Empty dependency array to run the effect only once

    const handleProfileButtonClick = (e) => {
        // Prevent the click from propagating to the document
        e.stopPropagation()
        setProfileOpen(true)
        props.setSelectedUser(props.member)
    }

    return (
        <>
            <button
                ref={profileBtn}
                onClick={handleProfileButtonClick}
                className={`${
                    profileOpen && props.selected
                        ? 'bg-[#243b72] text-[#98ebfa]' // Active button style
                        : 'hover:bg-[#192d5a] text-[#5da0ac]' // Inactive button style
                } flex items-center justify-between duration-300 w-full py-3 font-medium rounded-xl indent-3`}
            >
                <div className='flex items-center'>
                    <img src={member ? member.userPfp : ""} className="w-10 h-10 rounded-full ml-3" />
                    <p>{member ? member.username : ""}</p>
                </div>

                <div className={`${props.gcAdmin == member.username ? "block" : "hidden"}`}><span class="material-symbols-outlined text-yellow-500 mr-3">crown</span></div>
            </button>

            <div className={`${profileOpen ? "block" : "hidden"} absolute top-[-75px] right-[35%] w-[300px] z-[2]`}><UserProfile user={props.selectedUser}/></div>
        </>
    )
}

export default GC_Members
