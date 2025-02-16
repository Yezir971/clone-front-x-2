"use client"
import { useEffect, useState } from "react"
import SideBar from "../components/sideBar"
import { useRouter } from "next/navigation"
import { authContextApi } from "../context/authContext"
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const feedPage = () => {
    const [hide, setHide] = useState(false)
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(false)
    const [tweet,setTweet] = useState("")
    const [maxWord, setMaxWord] = useState(140)
    const [errorMessage,setErrorMessage] = useState("")
    const {userState} = authContextApi()
    

    const router = useRouter()
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

    // fonction pour publier un post 
    const publishPost = async () => {
        if(maxWord < 0 ){
            setErrorMessage('Votre publication est trop longue')
            return
        }
        setErrorMessage('')
        console.log(tweet)
        // ici le code pour envoyer le message a la base de donnée 
        try {
            const response = await fetch('http://localhost:3000/api/post/tweet', {
                method:'POST',
                headers:{
                    'Coontent-type':'application/json',
                },
                body:JSON.stringify({
                    userWhoTweet:userState,
                    contentTweets:tweet
                })
            })
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.error(error.message)
        }



        setTweet('')
        setMaxWord(140)
    }
    const decrementWord = (e) => {
        const input = e.target.value;
        setTweet(input);
        setMaxWord(140 - input.length);
    }
    // console.log(tweet)
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
                            <div className="p-4 ">
                                <div className=" mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
                                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                                        {/* <!-- Header --> */}
                                        <div className="text-center mb-6">
                                            <h1 className="text-2xl font-semibold dark:text-white">Publier un Nouveau Post</h1>
                                        </div>

                                        {/* <!-- Formulaire de publication --> */}
                                        <div className="space-y-4">
                                            <textarea value={tweet} onChange={(e) => decrementWord(e)} id="postContent" className="w-full p-4 border border-gray-300 rounded-lg text-lg placeholder-gray-400" rows="4" placeholder="Quoi de neuf ?"></textarea>
                                            <div className="flex justify-end items-center">
                                                <p className={` ${maxWord < 0 ? "text-red-700" : "text-white"} bold mx-6`}>{maxWord}</p>
                                                <button onClick={publishPost} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">
                                                    Publier
                                                </button>
                                            </div>
                                            <p>{errorMessage}</p>
                                        </div>

                                        {/* <!-- Liste des posts --> */}
                                        <div className="mt-8">
                                            <h2 className="text-xl font-semibold dark:text-white">Posts récents</h2>
                                            <div id="postList" className="space-y-4 mt-4">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4 rounded-sm ">
                                    <div className=" p-6  rounded-lg shadow-lg">
                                        {/* <!-- Liste des posts --> */}
                                        <div id="postList" className="space-y-4 mt-4">
                                            {/* <!-- Exemple de post --> */}
                                            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex space-x-4">
                                                {/* <!-- Avatar et info utilisateur --> */}
                                                <div className="flex-shrink-0">
                                                    <img className="h-12 w-12 rounded-full" src="https://i.pravatar.cc/300" alt="Avatar" />
                                                </div>
                                                <div className="flex flex-col justify-between w-full">
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-gray-800 font-semibold">Nom de l'utilisateur</div>
                                                        <div className="text-sm text-gray-500">Il y a 2 heures</div>
                                                    </div>
                                                    <p className="text-gray-700 mt-2">Voici le contenu du post ! Quelque chose d'intéressant à partager avec la communauté.</p>
                                                    {/* <!-- Boutons ou autres interactions --> */}
                                                    <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                                        <button className="hover:text-blue-500">J'aime</button>
                                                        <button className="hover:text-blue-500">Commenter</button>
                                                        <button className="hover:text-blue-500">Partager</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <!-- Autre post --> */}
                                            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex space-x-4">
                                                {/* <!-- Avatar et info utilisateur --> */}
                                                <div className="flex-shrink-0">
                                                    <img className="h-12 w-12 rounded-full" src="https://i.pravatar.cc/300" alt="Avatar" />
                                                </div>
                                                <div className="flex flex-col justify-between w-full">
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-gray-800 font-semibold">Autre Utilisateur</div>
                                                        <div className="text-sm text-gray-500">Il y a 3 jours</div>
                                                    </div>
                                                    <p className="text-gray-700 mt-2">Voici un autre post. J'ai trouvé ça intéressant et je voulais le partager avec vous.</p>
                                                    {/* <!-- Boutons ou autres interactions --> */}
                                                    <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                                        <button className="hover:text-blue-500">J'aime</button>
                                                        <button className="hover:text-blue-500">Commenter</button>
                                                        <button className="hover:text-blue-500"><HiArrowPathRoundedSquare /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default feedPage