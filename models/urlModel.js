const mongoose = require ('mongoose');

const urlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {type: String, default: Date.now},
    analytics: {
        userClicks : {type: Number, default: 0},
    }
});

module.exports = mongoose.model('Url', urlSchema);