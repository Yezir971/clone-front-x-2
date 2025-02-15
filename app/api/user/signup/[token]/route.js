import Users from "@/models/users.model";
import  connect  from "@/libs/mongodb";
const jwt = require('jsonwebtoken');

export async function GET(req, {params}){
    try {
        const {token} = await params
        connect()
        // on décrypt le token et on récupère l'id
        const {id} = jwt.verify(token, process.env.TOKEN)
        
        // on met à jour la valeur isVerified de l'utilisateur 
        
        const result = await Users.findByIdAndUpdate(id, {isVerified:true}, { new: true });
        
        return new Response(
            JSON.stringify({ message: "votre compte à bien été activer !", status: 200 }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "error", status: 400 }),
            { status: 400 }
        );
    }
}
