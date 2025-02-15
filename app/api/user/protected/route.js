import connect from "@/libs/mongodb"
import Users from "@/models/users.model"
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'

export async function GET(){
    // const tokenCookies = await req.cookies.mon_petit_green_token
    // console.log(tokenCookies)
    
    try {
        connect()
        const cookieStore = await cookies()
        let cookieTokenUser = cookieStore.get('mon_petit_green_token').value
        // si le token n'est pas défini on retourne une response 401 
        if(!cookieTokenUser){
            return Response.json({message:"Votre token n'existe pas"}, {status:401})
        }
        // on décrypte le token pour voir si il appartient bien a un utilisateur 
        // on décrypt le token et on récupère l'id
        const {id} = jwt.verify(cookieTokenUser, process.env.TOKEN)
        // on cherche dans la bdd l'utilisateur 
        const user = await Users.findById({_id: id})
        if(!user){
            return Response.json({message:`L'utilisateur n'existe pas !`, status:404}, {status:404})
        }
        // on regarde si l'utilisateur a son compte activer par email
        if(!user.isVerified){
            return Response.json({message:`L'utilisateur n'a pas vérifier son compte par email !`, status:404}, {status:404})
        }
        // on regarde si l'utilisateur a son compte d'activer 
        if(!user.activate){
            return Response.json({message:`Votre compte a été désactiver !`, status:403}, {status:403})
        }

        return Response.json({message:`L'utilisateur existe !`,id:id, username:user.username,  status:200}, {status:200})
    } catch (error) {
        console.error(error)
        return Response.json({message:`Erreur de connexion avec la bdd !`, status:500}, {status:500})
    }

}