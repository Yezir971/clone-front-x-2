import mongoose from "mongoose"

const notifMessageSchema = new mongoose.Schema({
    sender_id:{
        type: String,
        required:true,
    },
    reciev_id:{
        type: String,
        required:true,
    },
    notif:{
        trype:Number,
        required:true,
        default:0
    }
},{
    // mogo va automatiquement ajouter la date a la création 
    timestamps:{createdAt: true}
})



// condition pou pour éviter de créer plusierus fois le mm article si on execute plusieurs fois le code 
const NotificationMessage = mongoose.models.NotificationMessage || mongoose.model('NotificationMessage', notifMessageSchema)

export default NotificationMessage