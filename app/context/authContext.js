"use client";

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [userState, setUserState] = useState()
    const [notification, setNotification] = useState([])
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(false)
    const router = useRouter()


    // on initialise une nouvelle instance de notre websocket 
    useEffect(() => {
      // on récupère les inforations de l'utilisateur connecter 
      const fetchUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/user/protected', {
            headers:{
              'Content-type':'application/json',
            },
            credentials: 'include'
          })
          const data = await response.json()
          // console.log(data.user)
          setUserState(data?.user)
          // console.log(userState)
          
          if(data?.status !== 200 ){
            router.push('/')
          }
          setLoading(false)
          setAuthorized(true)
        } catch (error) {
          setLoading(false)
          router.push('/')
          console.error(error.message)
        }
      }
      fetchUser()  
      




      const socketInstance = io("http://localhost:3000");
      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socketInstance.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.disconnect();
      };
    }, []);
    useEffect(() => {
      if( socket === null ) return
          socket.emit('addNewUser', userState?._id)
          socket.on('getOnlineUser', (res) => {
            setOnlineUsers(res)
          }
      )
      
    }, [userState, socket])
    useEffect(() => {
      // on attend que userState soit bien défini 
      if (!userState?._id) return; 
      // on récupère les notifications de l'utilisateur 
      const getNumberNotification = async () => {
        try {
            // console.log("userState dans getNumberNotification:", userState);
            if (!userState?._id) {
                console.log("userState._id est indéfini, l'API ne sera pas appelée");
                return;
            }
            const response = await fetch('http://localhost:3000/api/message/notification',{
              method:'PUT',
              headers:{
                  "Content-Type":"application/json"
              },
              body: JSON.stringify({
                  // sender_id: userState.id ,
                  reciev_id : userState?._id
              })
            })
            const data = await response.json()
            // console.log(userState?._id)
            // console.log(data)
            setNotification(data?.notif)
            return data 
        } catch (error) {
          console.log(error.message)
        }
      }

      getNumberNotification()
    }, [userState])

    return (
        <AuthContext.Provider value={{ socket, setSocket, onlineUsers, setOnlineUsers, userState, setUserState, notification, setNotification, loading, setLoading, authorized, setAuthorized  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const authContextApi = () => useContext(AuthContext);