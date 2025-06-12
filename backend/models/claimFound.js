const mongoose = require('mongoose');

const claimFoundSchema = new mongoose.Schema({
    lostItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LostItem',
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

const ClaimFound = mongoose.model('ClaimFound', claimFoundSchema);
module.exports = ClaimFound;
