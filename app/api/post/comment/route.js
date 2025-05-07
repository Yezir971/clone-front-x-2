import connect from '@/libs/mongodb'
import Commentaire from '@/models/commentaire.models'
import Users from '@/models/users.model'




export async function POST(req){
    try {
        connect()
        const body = await req.json()
        const sendNewComment = await Commentaire.create({comment:body.comment, idTweet:body.idTweet, idUser:body.idUser})
        
        return Response.json({message:'votre message a bien été envoyé !', donneEnvoye:sendNewComment , status:200}, {status:200})
    } catch (error) {
        return Response.json({message:"Votre message n'a pas été envoyé !",error: error.message, status:400}, {status:400})
    }
}

export async function PUT(req){
    try {
        connect()
        const body = await req.json()
        const sendNewComment = await Commentaire.find(body).populate('idUser',"avatar username" )
        return Response.json({message:'Les messages ont été trouvé !', donneEnvoye:sendNewComment , status:200}, {status:200})
    } catch (error) {
        return Response.json({message:"Les messages n'ont pas été trouvé !", error: error.message, status:400}, {status:400})
    }
}