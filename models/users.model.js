import mongoose from "mongoose"
import mongooesUniqueValidator from 'mongoose-unique-validator'

const usersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true 
    },
    password:{
        type:String,
        required: true
    },
    activate:{
        type:Boolean,
        default:true
    },
    avatar: { 
        type: String, 
        default: 'picture.png',
    },  
    suscription:{
        type:Array
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role: {
        type: String, 
        enum: ['user', 'admin'],
        default: 'user',
    }
},{
    // mogo va automatiquement ajouter la date a la création 
    timestamps:{createdAt: true}
})

// plugin pour gérer les valeurs unique 
usersSchema.plugin(mongooesUniqueValidator)

// condition pou pour éviter de créer plusierus fois le mm article si on execute plusieurs fois le code 
const Users = mongoose.models.Users || mongoose.model('Users', usersSchema)

export default Users