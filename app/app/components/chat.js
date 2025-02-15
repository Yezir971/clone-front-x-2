"use client"; // Assure que ce composant est exécuté uniquement côté client

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import SideBar from "./sideBar";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hide, setHide] = useState(false)
  const burgerToogle = () => {
      setHide(!hide)
  }
  const burgerToogleWindow = () => {
    setHide(false)
}

  useEffect(() => {
    if (typeof window !== "undefined") { // ✅ Vérification que le code est exécuté côté client
        
        const socketInstance = io("http://localhost:3001");
      setSocket(socketInstance);

      socketInstance.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
        console.log(messages)
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prev) => [...prev, message]); // ✅ Ajoute le message directement côté client
      socket.emit("sendMessage", message); // Envoie au serveur
      console.log(messages)
      setMessage("");
    }
  };




  return (
    <div>
      {/* <h2>chat en temps réel</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tapez un message..."
      />
      <button onClick={sendMessage}>Envoyer</button>
      {messages.map((element, id) => {
        <p key={id}>{element}</p>
      }) } */}

    <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        {/* <div className="w-1/4 bg-gray-800 p-4 hidden md:block">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                <FaUserCircle className="text-2xl" />
                <span>Jean Dupont</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                <FaUserCircle className="text-2xl" />
                <span>Marie Curie</span>
            </div>
            </div>
        </div> */}
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
              <span className="text-lg text-center">Jean Dupont</span>


            </div>

            {/* Messages */}
            <div onClick={burgerToogleWindow} className="flex-1 items-start p-4 space-y-3 overflow-y-auto">
                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className="max-w-xs  p-3 rounded-t-lg rounded-bl-lg bg-blue-600 ml-auto"
                        >
                        {msg}
                    </div>
                ))}
            </div>

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
