"use client"
import Link from "next/link"
import logo from "@/public/logo.png"
import { useRouter } from "next/navigation"
import { MdPersonSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { authContextApi } from "../context/authContext";


const SideBar = ({hide}) => {

    const router = useRouter()
    const [accordeonToogle, setAccordeonToogle] = useState(false)
    const [usersWhofriend, setUsersWhofriend] = useState([])
    const [loading, setLoading] = useState(true)
    // const [notification, setNotification] = useState([])

    const {socket,setSocket, onlineUsers, userState, setOnlineUsers, notification, setNotification } = authContextApi()


    const logOut = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/logout', {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                }
                
            })
            const data = await response.json()
            // on déconnecte l'utilisateur pour les autres utilisateurs 
            socket.emit('deleteUser', userState?.id)

            router.push('/')
            return data
        } catch (error) {
            console.error(error.message)
        }
    }
    const getUsersWhoFriend = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/get-user')
            let  data = await response.json()
            setUsersWhofriend(data.user)
            setLoading(false)
            return data
        } catch (error) {
            console.error(error.message)
            setLoading(false)
        }
    }

    // const getNumberNotification = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/message/notification',{
    //             method:'PUT',
    //             headers:{
    //                 "Content-Type":"application/json"
    //             },
    //             body: JSON.stringify({
    //                 // sender_id: userState.id ,
    //                 reciev_id : userState?._id
    //             })

    //         })
    //         const data = await response.json()
    //         console.log(data)
    //         setNotification(data.notif)
    //         return data 
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
    
    useEffect(() => {
        getUsersWhoFriend()
        // getNumberNotification()
    }, [])

    // useEffect(() => {
    //     if( socket === null ) return
    //         socket.emit('addNewUser', userState?._id)
    //         socket.on('getOnlineUser', (res) => {
    //         setOnlineUsers(res)
    //     })
    // }, [userState])

    // on récupère les notifications 
    useEffect(() => {
    if (!socket) return;
    
        // Écouter les nouvelles notifications
        socket.on("recieveNotification", (newNotif) => {
            // Ajouter le message reçu aux messages existants, pour respecter la structures du state notification on va parcourir notiification
            // si on trouve un _id qui correspond a celui que l'on a on le remplace sinon on l'ajoute 
            const updateNotifUser = notification?.map((element) => element._id === newNotif._id ? {...element, notif:newNotif.notif} : element)
            console.log(newNotif)
            console.log(updateNotifUser)
            setNotification(updateNotifUser);
            console.log(notification)
        });
    
        // Nettoyer l'écouteur lors du démontage du composant
        return () => socket.off("recieveNotification");
    }, [socket, notification]);
    console.log(notification)



    const toogleMessage = () => {
        setAccordeonToogle(!accordeonToogle)
    }

    return(
        <>
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${hide ?" translate-x-0" : "-translate-x-full" } `} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a href="https://localhoost:3000/user-feed-page" className="flex items-center ps-2.5 mb-5">
                        <img src={logo.src} className="h-6 me-3 sm:h-7" alt="Logo clone-x" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Hi, {}</span>
                    </a>
            
                    {/* {console.log(notification)} */}
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div id="accordion-open" data-accordion="open">
                                <h2 id="accordion-open-heading-1">
                                    <button onClick={toogleMessage} type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
                                        <span className="flex items-center">
                                            <span className="w-5 h-5 me-2 shrink-0 inline-flex items-center justify-center p-3 ms-3 text-sm font-medium text-white  bg-red-600   rounded-full ">
                                                {notification ? notification?.reduce((acc, curr)=> acc + curr.notif, 0 ) : 0}
                                            </span>
                                                Messages
                                            </span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-open-body-1" className={accordeonToogle ? "" : "hidden"} aria-labelledby="accordion-open-heading-1">
                                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Amis</p>
                                        {
                                            usersWhofriend && usersWhofriend.map((element) => (
                                                <Link key={element._id} href={`/private-message/${element._id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                    {/* logo user  */}
                                                    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                                    </svg>
                                                    {/* logo user  */}
                                                    <span className="flex-1 ms-3 whitespace-nowrap ">{element.username}</span>
                                                        
                                                    <span className="w-5 h-5 me-2 shrink-0 inline-flex items-center justify-center p-3 ms-3 text-sm font-medium text-white bg-red-600 rounded-full">
                                                        {notification && notification?.map((elementNotif)=> (
                                                            elementNotif.sender_id == element._id && elementNotif.notif 
                                                        ))}
                                                    </span>
                                                        
                                                    {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white  bg-red-600   rounded-full ">3</span> */}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link href={'/user-page'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Mon profil</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/search'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdPersonSearch className="shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white w-6 h-6" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Rechercher</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/user-feed-page'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="3" y1="21" x2="21" y2="21" />  <line x1="3" y1="10" x2="21" y2="10" />  <polyline points="5 6 12 3 19 6" />  <line x1="4" y1="10" x2="4" y2="21" />  <line x1="20" y1="10" x2="20" y2="21" />  <line x1="8" y1="14" x2="8" y2="17" />  <line x1="12" y1="14" x2="12" y2="17" />  <line x1="16" y1="14" x2="16" y2="17" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Accueil</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={logOut} className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                </svg>
                                <span className=" ms-3 whitespace-nowrap">Déconnexion</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar