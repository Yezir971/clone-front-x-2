import { useState } from "react"
import { authContextApi } from "../context/authContext"


const RetweetModals = ({datasTweet, userState}) => {
    const [comment ,setComment ] = useState('')
    const {setHideModal, maxWord, setMaxWord, socket} = authContextApi()
    // console.log(userState)



    const decrementWord = (e) => {
        const input = e.target.value;
        setComment(input);
        setMaxWord(140 - input.length);
    }
    const sendReTweet = async () => {
        try {
            const dataTweet = {
                contentTweets: datasTweet?.contentTweets,
                contentReTweet: comment,
                userWhoTweet: datasTweet?.userWhoTweet._id,
                userWhoHasReTweet: userState?._id
            }
            const response = await fetch('http://localhost:3000/api/post/retweet', {
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body: JSON.stringify(dataTweet)
            })
            const data = await response.json()
            if(data.status === 200 ){
                socket.emit('retweet', data)
                setComment('')
                setMaxWord(140)
                setHideModal(false)
            }
            // console.log(data)
        } catch (error) {
            console.error(error.message)
        }
    }    
    return(
        <>
            <div className="relative  z-10 ">
                <div
                    
                    className="fixed inset-0 bg-gray-300/5 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                >
                </div>

                <div className="fixed p-4 sm:ml-64 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-96">
                        <h2 className="text-xl font-bold mb-4">Retweeter</h2>
                        <p className="mb-4 text-gray-700">{datasTweet.contentTweets}</p>
                        <textarea
                        className="w-full border p-2 rounded mb-4"
                        placeholder="Ajoutez un commentaire"
                        onChange={(e) => decrementWord(e)}
                        ></textarea>
                        <p>{maxWord}</p>
                        <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => setHideModal(false)}
                        >
                            Annuler
                        </button>
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={sendReTweet}
                        >
                            Retweeter
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RetweetModals