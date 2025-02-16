import mongoose from "mongoose"

const tweetSchema = new mongoose.Schema({
    contentTweets:{
        type: String,
        required:true
    },
    userWhoTweet:{
        type: Array,
        required:true
    },
    like:{
        type: Number,
        default:0
    },
    retweet:{
        type:Boolean,
        default:false
    },
    userWhoHasReTweet:{
        type:Array,
    }
},{
    // mogo va automatiquement ajouter la date a la création 
    timestamps:{createdAt: true}
})



// condition pou pour éviter de créer plusierus fois le mm article si on execute plusieurs fois le code 
const Tweet = mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema)

export default Tweet