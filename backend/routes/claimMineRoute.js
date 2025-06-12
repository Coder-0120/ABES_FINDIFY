const express = require("express");
const router = express.Router();
const Claim = require("../models/claimMine");



router.post("/create", async (req, res) => {
  const { FoundItemId, claimerEmail, message } = req.body;

  if (!FoundItemId || !claimerEmail) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  try {
    const newClaim = new Claim({ FoundItemId, claimerEmail, message });
    await newClaim.save();
    res.status(201).json({ success: true, claim: newClaim });
  } catch (err) {
    console.error("Error creating claim as  mine:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
