const mongoose = require('mongoose')
const EmojiItems = require('./emoji')



const userSchema = new mongoose.Schema({

    id: Number,
    emojis : [EmojiItems.schema]
    
})

const User = mongoose.model('User', userSchema)

module.exports = User