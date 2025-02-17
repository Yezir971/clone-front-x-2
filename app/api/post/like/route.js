import connect from "@/libs/mongodb"
import Tweet from "@/models/tweet.models"

export async function POST(req) {
    try {
        connect()
        const {idUser, idTweet} = await req.json()
        // si l'utilisateur a déja like il est en base de donné il va donc dislike sinon il va like 
        const tweet = await Tweet.findOne({ _id: idTweet, like: idUser });
        
        if(tweet === null){
            const newLike = await Tweet.findByIdAndUpdate(idTweet, {$push: {like:idUser}})
            return Response.json({message:"Votre like à bien été envoyé !",newtweet:"newLike", status:200}, {status:200})
        }else{
            const newLike = await Tweet.findByIdAndUpdate(idTweet, { $pull: { like:  idUser} })
            return Response.json({message:"Votre like à bien été envoyé !",newtweet:"false", status:200}, {status:200})
        }
    } catch (error) {
        console.error(error.message)
        return Response.json({message:"Vous n'avez pas réussi a envoyer votre like", status:400}, {status:400})
    }
}