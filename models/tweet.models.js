import mongoose from "mongoose"

const tweetSchema = new mongoose.Schema({
    contentTweets:{
        type: String,
        required:true
    },
    userWhoTweet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    like:{
        type: Array
    },
    retweet:{
        type:Boolean,
        default:false
    },
    userWhoHasReTweet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    contentReTweet:{
        type: String,
    }
},{
    // mogo va automatiquement ajouter la date a la création 
    timestamps:{createdAt: true}
})



// condition pou pour éviter de créer plusierus fois le mm article si on execute plusieurs fois le code 
const Tweet = mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema)

export default Tweet