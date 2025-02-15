import  connect  from "@/libs/mongodb";
import Message from "@/models/privatemessage.model"


export async function POST(req) {
    try {
        connect()
        const body = await req.json()
        const message = await addMessage(body)
        return Response.json({message:"Votre message a été envoyer !", status:200 }, {status:200})
    } catch (error) {
        return Response.json({message:"Votre message n'a pas été envoyer!", error:error.message, status: 404 }, {status:404})
    }    
}
export async function PUT(req) {
    try {
        connect()
        const body = await req.json()
        const getMessageUser = await getMessage(body)
        return Response.json({message:getMessageUser, status:200 }, {status:200})
    } catch (error) {
        return Response.json({message:"Vos messages n'ont pas été trouver !", error:error.message, status: 404 }, {status:404})
    }    
}

const addMessage = async (content) => {
    try {
        // on envoie le message vers la bdd 
        const messageInDb = await Message.create({...content});
        return messageInDb;
    } catch (error) {
        throw new Error(error.message);
    }
}
// récupère les messages des users 
const getMessage = async ({sender_id,reciev_id }) => {
    try {
        // on récupère les messages dans la bdd qui ont l'id du receveur et l'id de l'envoyeur 
        return await Message.find({
            $or: [
                { sender_id: sender_id, reciev_id: reciev_id },
                { sender_id: reciev_id , reciev_id: sender_id }
            ]
        }).sort({ createdAt: 1 }); // Sort messages in chronological order
    } catch (error) {
        throw new Error(error.message);
    }
}