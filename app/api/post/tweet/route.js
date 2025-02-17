import connect from '@/libs/mongodb'
import Tweet from '@/models/tweet.models'

// route pour créer un tweet 
export async function POST(req){
    try {
        connect()
        const {contentTweets,userWhoTweet } = await req.json()
        // création du tweet 
        const newTweet = await Tweet.create({contentTweets, userWhoTweet})
        // on va chercher dans tweet le tweet créer puis on va créer une agrégation avec populate pour récupérer username et avatar dans la table Users sans avoir besoin de l'appeler 
        const tweetAndUser = await Tweet.findById(newTweet?._id).populate('userWhoTweet', 'username avatar').populate('userWhoHasReTweet', 'username avatar');
        return Response.json({message: "votre tweet a bien été envoyé !",dataTweet: tweetAndUser, status:200}, {status:200})
    } catch (error) {
        return Response.json({message: `Votre mesage n'a pas été envoyé : ${error.messge}`, status:400}, {status:400})
    }
}

// route pour récupérer les tweet 
export async function GET(){
    try {
        connect()
        const allTweets = await Tweet.find({}).sort({ createdAt: -1 }).populate('userWhoTweet', 'username avatar').populate('userWhoHasReTweet', 'username avatar');
        return Response.json({message:'Les tweets ont bien été récupéré !', dataTweet:allTweets, status:200}, {status:200})
    } catch (error) {
        return Response.json({message: `Les tweet n'ont pas réussi a etre récupérer: ${error.messge}`, status:400}, {status:400})
    }
}




