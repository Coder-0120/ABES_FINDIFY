// routes/userPosts.js
const express = require("express");
const router = express.Router();
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

router.get("/myposts", async (req, res) => {
  try {
    const { email } = req.query;

    const lostItems = await LostItem.find({ reportedBy: email }).sort({ date: -1 });
    const foundItems = await FoundItem.find({ reportedBy: email }).sort({ date: -1 });

    res.status(200).json(
        {
            message: "My posts fetched successfully",
            lostItems: lostItems,
            foundItems: foundItems,
        }
    );
  } catch (error) {
    console.error("Error fetching my posts:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
