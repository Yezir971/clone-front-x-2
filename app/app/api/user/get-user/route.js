import  connect  from "@/libs/mongodb";
import Users from "@/models/users.model"



export async function GET() {
    try {
        connect()
        const user = await Users.find({})
        return Response.json({message:"Liste utilisateur trouvée !",user:user, status: 200}, {status:200})
    } catch (error) {
        return Response.json({message:"Impossible de vous connecter erreur serveur !", error:error.message, status: 404 }, {status:404})
    }
}