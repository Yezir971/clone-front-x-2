import { HiArrowPathRoundedSquare } from "react-icons/hi2";
const TweetCard = ({ tweet, toggleModal }) => {
    let isRetweet = tweet?.retweet;
    return (
        <>
            {/* Retweet Indicator */}
            {!isRetweet ? (
                <>
                    {console.log("dans card"+{tweet})}
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
                            <button className="hover:text-blue-500">J'aime</button>
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
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-full" src="https://img.20mn.fr/M0L5sgogQkOJk6YFacRw_yk/1444x920_booba-attending-the-casablanca-womenswear-spring-summer-2024-fashion-show-as-part-of-the-paris-fashion-week-in-paris-france-on-october-01-2023-03haedrichjm-jmh-0047-credit-jm-haedrich-sipa-2310020623" alt="Avatar" />
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
                                <button className="hover:text-blue-500">J'aime</button>
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