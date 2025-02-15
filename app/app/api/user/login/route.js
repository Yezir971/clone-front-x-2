import  connect  from "@/libs/mongodb";
import Users from "@/models/users.model"
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
const jwt = require('jsonwebtoken');


export async function POST(req, res) {
    try {
        connect()
        const body = await req.json()

        const user = await Users.findOne({email: body.email})
        // return Response.json({message: "Utilisateur trouvé !", data: body.email}, {status:200})

        // on regarde si l'utilisateur existe en bdd
        if (!user){
            return Response.json({message: "Utilisateur non trouvé !", status:404}, {status:404})
        }
        // on vérifie si le compte est activer 
        if (!user.isVerified) {
            return Response.json({message:'Veuillez vérifier votre email pour accéder à cette fonctionnalité.', status:403}, {status:403}) 
        }
        // on regarde si l'utilisateur a son compte d'activer 
        if(!user.activate){
            return Response.json({message:`Votre compte a été désactiver !`, status:403}, {status:403})
        }

        const comparePassword = await bcrypt.compare(
            body.password,
            user.password
        )
        // on vérifie si le mot de passe en bdd hash match avec celui du mot de passe entrer dans le formulaire 
        if(!comparePassword) {
            return Response.json({message:"Votre mot de passe est incorecte !", status:400}, {status:400})
        }
        
        // création du token pour l'envoyer dans le cookies 
        const token = jwt.sign(
            {id: user._id},
            process.env.TOKEN,
            { expiresIn: "24h"}
        )
        // on envoie le token dans le cookie 
        const cookieStore = await cookies()
        cookieStore.set('mon_petit_green_token', token, { 
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: false, 
            sameSite: 'strict'  
        })
        

        return Response.json({message:"Heureux de vous revoir !", status: 200}, {status:200})
        
    } catch (error) {
        return Response.json({message:"Imossible de vous connecter !", error:error.message, status: 400 }, {status:400})
    }
    
}


// récupère les données de l'utilisateur 
// const getUser = () => {

// }