"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { authContextApi } from './authContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notification, setNotification] = useState([])
    const [userState, setUserState] = useState()
    const { socket, setOnlineUsers } = authContextApi()
    
    const getNumberNotification = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/message/notification',{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    // sender_id: userState.id ,
                    reciev_id : userState._id
                })

            })
            const data = await response.json()
            console.log(data)
            setNotification(data.notif)
            return data 
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getNumberNotification()
    }, [])

    useEffect(() => {
        if( socket === null ) return
            socket.emit('addNewUser', userState?._id)
            socket.on('getOnlineUser', (res) => {
            setOnlineUsers(res)
        })
    }, [userState])



    return (
        <NotificationContext.Provider value={{ notification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const notificationContextApi = () => useContext(NotificationContext);