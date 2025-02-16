"use client"; // Assure que ce composant est exécuté uniquement côté client

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import SideBar from "./sideBar";
import { authContextApi } from "../context/authContext";

export default function Chat({id}) {
  const [usersWhofriend, setUsersWhofriend] = useState([])
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState({})
  const [hide, setHide] = useState(false)
  // const [userState, setUserState] = useState()
  
  const {socket,setSocket, onlineUsers, userState, notification , setNotification} = authContextApi()

  const burgerToogle = () => {
      setHide(!hide)
  }
  const burgerToogleWindow = () => {
    setHide(false)
  }

  // console.log("onlineUsers", onlineUsers)
  useEffect(() => {
    // fetchUser
    // const fetchUser = async () => {
    //   try {
    //     const response = await fetch('http://localhost:3000/api/user/protected')
    //     const data = await response.json()
    //     // console.log(data.user)
    //     setUserState(data.user)
    //     // console.log(userState)
    //   } catch (error) {
    //     console.error(error.message)
    //   }
    // }
    // fetchUser()
    // fetchUser

    // getUsersWhoFriend
    const getUsersWhoFriend = async () => {
      try {
          const response = await fetch('http://localhost:3000/api/user/get-user')
          const data = await response.json()
          // on filtrer parmis les user pour avoir juste l'utilisateur selectionner 
          let userSelect = await data.user.filter((element) => element._id == id )
          // console.log(userState.id)
          setUsersWhofriend(userSelect[0])
          return data
        } catch (error) {
          console.error(error.message)
        }
      }
    getUsersWhoFriend()
    // getUsersWhoFriend


    // if (typeof window !== "undefined") { // Vérification que le code est exécuté côté client
    //   const socketInstance = io("http://localhost:3000");
    //   setSocket(socketInstance);
    //   // socketInstance.on("receiveMessage", (msg) => {
    //   //   setMessages((prev) => [...prev, msg]);
    //   // });
    //   // console.log(messages)
    //   return () => {
    //     socketInstance.disconnect();
    //   };

    // }

  }, []);

  // on récupère les messsages uniquement au moment où le state message  est mis a jour c'est a dire au moment où l'on envoie un message 
  // useEffect(() => {
  //   if(socket === null){
  //     return
  //   }
  //   const idUserTarget = onlineUsers?.find((user) => user.userId === id)
  //   console.log(message)
  //   socket.emit('sendMessage', {message,idUserTarget })

  // }, [message])


  // on récupère les messages uniquement lorsque userState est défini
  useEffect(() => {
    if (!userState) return;

    const getMessageUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/message/send", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_id: userState?._id,
            reciev_id: id,
          }),
        });

        const data = await response.json();
        setMessages(data?.message || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      }
    };

    getMessageUser();



  }, [userState]);

  // on récupère les messages 
  useEffect(() => {
    if (!socket){
      console.log("no socket")
      return;
    } 
  
    // Écouter les nouveaux messages
    socket.on("receiveMessage", (newMessage) => {
      // Ajouter le message reçu aux messages existants
      console.log(newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(messages)
    });
  
      // Nettoyer l'écouteur lors du démontage du composant
      return () => socket.off("receiveMessage");
    }, [socket]);

   

  // fonction d'envoie de message 
  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        content: message,
        createdAt: new Date(),
        reciev_id: id,
        sender_id: userState?._id ,
        status: false
      }
      setMessages(prevMessages => [...prevMessages, newMessage]);
      // on reset le champ d'envoie de message 
      setMessage("");
      // on met une condition sur l'émission pour ne pas que les autres utilisateurs recoivent les messages des autres utilisateurs sur leurs pages 
      // console.log(onlineUsers)
      // for(let onlineUser of onlineUsers){
      if(socket === null){
        return
      }
      const idUserTarget = id;
      console.log(message)
      // on envoie le message avec les socket 
      socket.emit('sendMessage', {newMessage,idUserTarget })




      // envoie en bdd
      try {
        const response = await fetch('http://localhost:3000/api/message/send', {
          method:'POST', 
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(newMessage) , 
        })

        // on envoie un notification 
        const notifResponse = await fetch('http://localhost:3000/api/message/notification',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            reciev_id: id,
            sender_id: userState._id 
          }),
        })
        const dataNotification = await notifResponse.json()
        console.log(dataNotification)
        const data = await response.json()
        // on envoie la notification du message avec les socket 
        socket.emit('notification', {dataNotification,idUserTarget })
        return data
      } catch (error) {
        console.log(error)
      }
    }
  };
  const convertDate =(stringDate) => {
    const date = new Date(stringDate)
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
    };
    return date.toLocaleDateString('fr-FR', options)
  }





  return (
    <div>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <SideBar hide={hide} />


        {/* Chat Section */}
        <div className="flex-1 flex flex-col sm:ml-64">
            <div className="bg-gray-800 p-4 flex items-center">
              <button onClick={burgerToogle} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <div className="relative">
                <FaUserCircle className="text-2xl mr-2 text-center w-10 h-10 rounded-full" />
                <span className={`absolute bottom-0 left-6 transform translate-y-1/4 w-3.5 h-3.5 ${onlineUsers?.some((user) => user?.userId === usersWhofriend._id ) ? "bg-green-400" : "bg-red-400"}  border-2 border-white dark:border-gray-800 rounded-full`}></span>
              </div>
              <span className="text-lg text-center">{usersWhofriend.username}</span>
            </div>
            {/* Messages */}
            <div onClick={burgerToogleWindow} className="flex-1 items-start p-4 space-y-3 overflow-y-auto">
              {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" /> */}
                {messages.map((msg, index) => (
                  <div className={`${msg.sender_id === id ? "mr-10":"ml-10"}`} key={index}>
                    <div className={`flex flex-col gap-1 w-full max-w-[320px] ${msg.reciev_id === id && "ml-auto" }`}>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{msg.sender_id === id ?  usersWhofriend.username :userState?.username  }</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{convertDate(msg.createdAt)}</span>
                      </div>
                    </div>
                    {/* {console.log(notification)} */}
                    <div
                        className={` max-w-xs p-3 ${msg.reciev_id === id ? "bg-blue-600 ml-auto rounded-t-lg rounded-bl-lg" : "bg-gray-100 dark:bg-gray-700 rounded-t-lg rounded-br-lg" }  `}
                        >
                        {msg.content}
                    </div>
                  </div>
                ))}
            </div>
            {/* Messages */}
            {/* Input Field */}
            <div className="p-4 bg-gray-800 flex items-center">
            <input
                type="text"
                className="flex-1 p-2 bg-gray-700 rounded-lg outline-none"
                placeholder="Écrivez un message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                type="submit"
                className="ml-2 bg-green-600 p-2 rounded-lg hover:bg-green-500"
                onClick={sendMessage}
            >
                <FaPaperPlane />
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
