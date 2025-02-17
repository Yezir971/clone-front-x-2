import connect from '@/libs/mongodb'
import Tweet from '@/models/tweet.models'

// route pour créer un retweet 
export async function POST(req){
    try {
        connect()
        const { contentTweets,userWhoTweet,userWhoHasReTweet,contentReTweet } = await req.json()
        // création du tweet 
        const newReTweet = await Tweet.create({contentReTweet:contentReTweet , contentTweets:contentTweets, userWhoTweet:userWhoTweet, retweet:true, userWhoHasReTweet:userWhoHasReTweet})
        const dataReTweet = await Tweet.findOne({ _id: newReTweet._id }).populate('userWhoTweet', 'username avatar').populate('userWhoHasReTweet', 'username avatar');
        return Response.json({message: "votre reTweet a bien été envoyé !",dataReTweet: dataReTweet, status:200}, {status:200})
    } catch (error) {
        console.error(error.message)
        return Response.json({message: `Votre reTweet n'a pas été envoyé : ${error.message}`, status:400}, {status:400})
    }
}