const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String,
    memeChannel: String,
    linkChannel: String,
    suggestionChannel: String,
    welcome: {
        welcomeChannel: String,
        welcomeMessage: String,
    },
    counting: {
        countingChannel: String,
        count: Number,
    },
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');