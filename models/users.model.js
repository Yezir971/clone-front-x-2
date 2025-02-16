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
        default: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
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
    },
    description: {
        type: String,
        default: 'Hello there!'
    },
    baniere: {
        type: String,
        default: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMTY5NTQwLWltYWdlLWpvYjYzMC1hLWwwZzA2OGd0LmpwZw.jpg'
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