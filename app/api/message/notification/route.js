import  connect  from "@/libs/mongodb";
import NotificationMessage from "@/models/notifsmessage.models";

// récupère les notifications 
export async function PUT(req) {
    try {
        connect()
        const body = await req.json()
        const notifs = await getNotificationUser(body)
        return Response.json({message:"Notification de l'utilisateur trouver !",notif:notifs, status:200 }, {status:200})
    } catch (error) {
        return Response.json({message:"Notification de l'utillisateur non trouver !", status:404 }, {status:404})
    }
}

// met a jour les notifications 
export async function POST(req) {
    try {
        connect()
        const body = await req.json()
        const notif = await createNotification(body)
        return Response.json({message:"Notification envoyer !",notif:notif, status:200 }, {status:200})
    } catch (error) {
        return Response.json({message:"Notification pas envoyer !", error:error.message, status: 404 }, {status:404})
    }    
}

// supprime les notification 
export async function DELETE(req) {
    try {
        connect()
        const body = await req.json()
        const notif = await deleteNotification(body)
        return Response.json({message:"Notification supprimer avec succes !",notif:notif, status:200 }, {status:200})
    } catch (error) {
        return Response.json({message:"La notification n'a pas été supprimer !", error:error.message, status: 404 }, {status:404})
    }    
}

const deleteNotification = async ({sender_id, reciev_id}) => {
    try {
        const deleteNotification = await NotificationMessage.findOneAndUpdate(
            {$or :[{
                sender_id: sender_id,
                reciev_id: reciev_id
            }]},
            { notif: 0 }
        )
        return deleteNotification
    } catch (error) {
        throw new Error(error.message);
        
    }
}


const createNotification = async ({sender_id, reciev_id}) => {
    const newNotification = await NotificationMessage.findOneAndUpdate(
        {$or :[{
            sender_id: sender_id,
            reciev_id: reciev_id
        }]},
        { $inc: { notif: 1 }},
        { upsert: true , new: true }
    )
    return newNotification
}

const getNotificationUser = async ({ reciev_id }) => {
    try {
        const notif = await NotificationMessage.find({
            $or: [
            { reciev_id: reciev_id }
        ]})
        return notif
    } catch (error) {
        throw new Error(error.message);
    }
}