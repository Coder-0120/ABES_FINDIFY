const express = require("express");
const ClaimMine = require("../models/claimMine");
const ClaimFound = require("../models/claimFound");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/foundItem");
const router = express.Router();

router.get("/alerts", async (req, res) => {
    try {
        const { email } = req.query;

        // 1. People who found my lost items
        const myLostItems = await LostItem.find({ reportedBy: email });
        const myLostItemIds = myLostItems.map(item => item._id);
        const foundMyLost = await ClaimFound.find({ lostItemId: { $in: myLostItemIds } })
            .populate("lostItemId")
            .sort({ createdAt: -1 });

        // 2. People who claimed my found items
        const myFoundItems = await FoundItem.find({ reportedBy: email });
        const myFoundItemIds = myFoundItems.map(item => item._id);
        const claimedMyFound = await ClaimMine.find({ FoundItemId: { $in: myFoundItemIds } })
            .populate("FoundItemId")
            .sort({createdAt:-1});

        res.status(200).json({
            success: true,
            foundMyLost,
            claimedMyFound,
        });

    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
