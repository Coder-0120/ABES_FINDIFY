const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
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
        default: "https://tse4.mm.bing.net/th?id=OIP.1wZiwK4c8r0eQVuDFeg2cQHaH_&pid=Api&P=0&h=180"
    },
    reportedAt: {
        type: Date,
        default: Date.now,
    },
    reportedBy: {
        type: String,
        required: true
    },
});

// ✅ Safely register model without overwrite
const LostItem = mongoose.models.LostItem || mongoose.model("LostItem", LostItemSchema);

module.exports = LostItem;
