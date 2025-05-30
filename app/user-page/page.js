"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import SideBar from "../components/sideBar";
import Profil from "../components/profil";

const UserPage = () => {
    const router = useRouter()
    const [hide, setHide] = useState(false)
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(false)
    const burgerToogle = () => {
        setHide(!hide)
    }
    const burgerToogleWindow = () => {
        setHide(false)
    }


    const fetchAuth = async () => {
        try {
            
            const response = await fetch('http://localhost:3000/api/user/protected', {
                method:"GET",
                headers:{
                    'Content-type':'application/json',
                },
                credentials: 'include'
            })
            const data = await response.json()
            if(data.status !== 200 ){
                router.push('/')
            }
            setLoading(false)
            setAuthorized(true)
        } catch (error) {
            setLoading(false)
            if(data.status !== 200 ){
                router.push('/')
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAuth()
    }, [])


    if(loading){
        return(
            <div className="min-h-screen flex items-center justify-center ">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return(
        <>
            {
                authorized ? (
                    <>
                        <button onClick={burgerToogle} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>

                        {/* side bar  */}
                        <SideBar hide={hide} />
                        {/* side bar  */}

                        <div className="p-4 sm:ml-64" onClick={burgerToogleWindow}>
                            <div className="max-w-2xl mx-auto p-4">
                                <Profil />
                                {/* Posts Section */}
                                {/* <div className="mt-6">
                                    <div className="bg-white shadow-md rounded-2xl p-4">
                                    <p className="text-gray-800">Excited to start a new project! 🚀 #coding</p>
                                    <p className="text-gray-500 mt-2">2 hours ago</p>
                                    </div>
                                    <div className="bg-white shadow-md rounded-2xl p-4 mt-4">
                                    <p className="text-gray-800">Just discovered a cool new JavaScript library. More on this soon!</p>
                                    <p className="text-gray-500 mt-2">1 day ago</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </>
                ):(
                    null
                )
            }
        </>
    )
}

export default UserPage