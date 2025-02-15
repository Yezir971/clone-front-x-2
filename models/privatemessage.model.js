import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sender_id:{
        type: String,
        required:true,
    },
    reciev_id:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default: false, 
    }
},{
    // mogo va automatiquement ajouter la date a la création 
    timestamps:{createdAt: true}
})



// condition pou pour éviter de créer plusierus fois le mm article si on execute plusieurs fois le code 
const PrivateMessage = mongoose.models.PrivateMessage || mongoose.model('PrivateMessage', messageSchema)

export default PrivateMessage