"use client"; // Assure que ce composant est exécuté uniquement côté client

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import SideBar from "./sideBar";

export default function Chat({id}) {
  const [socket, setSocket] = useState(null);
  const [usersWhofriend, setUsersWhofriend] = useState([])
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hide, setHide] = useState(false)
  const [userState, setUserState] = useState()
  const burgerToogle = () => {
      setHide(!hide)
  }
  const burgerToogleWindow = () => {
    setHide(false)
  }


  useEffect(() => {
    // fetchUser
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/protected')
        const data = await response.json()
        console.log(data)
        setUserState(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchUser()
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



    if (typeof window !== "undefined") { // Vérification que le code est exécuté côté client
        
      const socketInstance = io("http://localhost:3000");
      setSocket(socketInstance);
      socketInstance.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);
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
            sender_id: userState.id,
            reciev_id: id,
          }),
        });

        const data = await response.json();
        setMessages(data.message || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      }
    };

    getMessageUser();
  }, [userState]);

  // fonction d'envoie de message 
  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        content: message,
        createdAt: new Date(),
        reciev_id: id,
        sender_id: userState.id ,
        status: false
      }
      setMessages((prev) => [...prev, newMessage ]); 
      // on reset le champ d'envoie de message 
      setMessage("");
      socket.emit("sendMessage", newMessage); // Envoie au serveur
      // envoie en bdd
      try {
        const response = await fetch('http://localhost:3000/api/message/send', {
          method:'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMessage) , 
        })

        const data = await response.json()
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
              <FaUserCircle className="text-2xl mr-2 text-center" />
              <span className="text-lg text-center">{usersWhofriend.username}</span>
            </div>
            {/* Messages */}
            <div onClick={burgerToogleWindow} className="flex-1 items-start p-4 space-y-3 overflow-y-auto">
              {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" /> */}
                {messages.map((msg, index) => (
                  <div className={`${msg.sender_id === id ? "mr-10":"ml-10"}`} key={index}>
                    <div className={`flex flex-col gap-1 w-full max-w-[320px] ${msg.reciev_id === id && "ml-auto" }`}>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{msg.sender_id === id ?  usersWhofriend.username :userState.username  }</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{convertDate(msg.createdAt)}</span>
                      </div>
                    </div>
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
