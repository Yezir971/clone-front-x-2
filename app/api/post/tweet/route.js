import connect from '@/libs/mongodb'
import Tweet from '@/models/tweet.models'


export async function POST(req){
    try {
        connect()
        const body = await req.json()
        addNewTweet(body)
        return Response.json({message: "votre tweet a bien été envoyer !", status:200}, {status:200})
    } catch (error) {
        return Response.json({message: `Votre mesage n'a pas été envoyer : ${error.messge}`, status:200}, {status:200})
    }
}

export async function GET (){

}



const addNewTweet = async ({contentTweets, userWhoTweet}) => {
    try {
        const newTweet = await Tweet.create({contentTweets:contentTweets, userWhoTweet:userWhoTweet})
    } catch (error) {
        throw new Error(`erreur au moment d'ajouter les tweets ! ${error.message}`);
    }

}

const getTweet = () => {

}