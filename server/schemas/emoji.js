const mongoose = require('mongoose')


const emojiSchema = new mongoose.Schema({
  application_id: Number,
  raised_hands: Boolean,
  heart: Boolean,
  tada: Boolean,
  grinning: Boolean,


})

const EmojiItems = mongoose.model('EmojiItems', emojiSchema)

module.exports = EmojiItems 