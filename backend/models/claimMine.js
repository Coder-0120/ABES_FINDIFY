const mongoose = require('mongoose');

const claimMineSchema = new mongoose.Schema({
    FoundItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoundItem',
        required: true
    },
    claimerEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const claimMine = mongoose.model('ClaimMine', claimMineSchema);
module.exports = claimMine;