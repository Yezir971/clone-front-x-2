import mongoose from "mongoose";

const commentaireShema = new mongoose.Schema({
    comment:{
        type:String,
        required: true
    },
    idTweet:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Tweet'
    },
    idUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    }
},{
    timestamps:{createdAt:true}
})

// condition pou pour éviter de créer plusierus fois le mm article si on execute plusieurs fois le code 
const Commentaire = mongoose.models.Commentaire || mongoose.model('Commentaire', commentaireShema)

export default Commentaire