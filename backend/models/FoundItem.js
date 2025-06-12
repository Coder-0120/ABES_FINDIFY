const mongoose = require('mongoose');

const FoundItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: "https://example.com/default.jpg"
    },
    reportedAt: {
        type: Date,
        default: Date.now,
    },
    reportedBy: {
        type: String,
        required: true
    }
});

// ✅ Fix OverwriteModelError
const FoundItem = mongoose.models.FoundItem || mongoose.model("FoundItem", FoundItemSchema);
module.exports = FoundItem;
