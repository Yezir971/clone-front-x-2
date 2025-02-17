import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { RiPokerHeartsFill } from "react-icons/ri";
{/* <RiPokerHeartsFill />  */}
import { RiPokerHeartsLine } from "react-icons/ri";
{/* <RiPokerHeartsLine /> */}
const TweetCard = ({ tweet, toggleModal, userState }) => {
    let isRetweet = tweet?.retweet;
    let idUser = userState._id
    let isLiked = tweet?.like.some((element) => element === idUser)
    console.log(isLiked)
    let idTweet = tweet._id
    const dataUser = {idUser:idUser , idTweet:idTweet}
    console.log("id user" + userState._id)
    console.log("id tweet" + tweet._id)
    const fetchLike = async (req) => {
        try {
            const response = await fetch('http://localhost:3000/api/post/like', {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(dataUser) 
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <>
            {/* Retweet Indicator */}
            {!isRetweet ? (
                <>
                    <div className={`bg-white p-4 rounded-lg shadow-md border border-gray-200 flex ${isRetweet ? "border-green-500" : ""}`}>
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={tweet?.userWhoTweet?.avatar} alt="Avatar" />
                        </div>
                
                        {/* Contenu */}
                        <div className="flex flex-col justify-between w-full ml-4">
                        <div className="flex justify-between items-center">
                            <div className="text-gray-800 font-semibold">{tweet?.userWhoTweet?.username}</div>
                            <div className="text-sm text-gray-500">Il y a 2 heures</div>
                        </div>
                        <p className="text-gray-700 mt-2">{tweet?.contentTweets}</p>
                        <div className="flex space-x-4 mt-3 text-lg text-gray-500">
                            <button onClick={() => fetchLike(dataUser)} className="text-red-600 cursor-pointer">
                                {isLiked ? (
                                    <RiPokerHeartsFill /> 

                                ):(
                                    <RiPokerHeartsLine />
                                )}
                            </button>
                            <button className="hover:text-blue-500">Commenter</button>
                            <button onClick={() => toggleModal(tweet?._id)} className="hover:text-green-500">
                            <HiArrowPathRoundedSquare />
                            </button>
                        </div>
                        </div>
                    </div>
                
                </>
        

                ):(
                    <>
                    
                    
                        {/* repost  */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex ">
                            {/* Avatar et contenu principal */}
                            <div className="flex-shrink-0 mr-4">
                                <img className="h-12 w-12 rounded-full" src={tweet?.userWhoHasReTweet?.avatar} alt="Avatar" />
                            </div>
                            <div className="flex flex-col justify-between w-full">
                                {/* Nom et date */}
                                <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-800 font-semibold">{tweet?.userWhoHasReTweet?.username}</span>
                                    <span className="text-sm text-gray-500">@{tweet?.userWhoHasReTweet?.username} · 72h</span>
                                </div>

                                </div>

                                {/* Contenu principal */}
                                <p className="text-gray-700 mt-2">
                                {tweet?.contentReTweet}
                                </p>

                                {/* Repost */}
                                <div className="mt-3 border border-gray-300 rounded-lg bg-gray-100 p-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <HiArrowPathRoundedSquare className="text-green-500" />
                                    <span>{tweet?.userWhoHasReTweet?.username} a reposté</span>
                                </div>
                                <div className="mt-2 text-gray-900">
                                    <div className="font-semibold">{tweet?.userWhoTweet?.username}</div>
                                    <p>{tweet?.contentTweets}</p>
                                </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-6 mt-3 text-gray-500">
                                <button onClick={() => fetchLike(dataUser)} className="text-red-600 cursor-pointer">
                                    {isLiked ? (
                                        <RiPokerHeartsFill /> 

                                    ):(
                                        <RiPokerHeartsLine />
                                    )}
                                </button>
                                <button className="hover:text-blue-500">Commenter</button>
                                <button onClick={() => toggleModal(tweet?._id)} className="hover:text-green-500">
                                <HiArrowPathRoundedSquare />
                                </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        



        
        </>
    );
}
export default TweetCard