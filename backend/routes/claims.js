const express = require("express");
const router = express.Router();
const Claim = require("../models/claimFound");



router.post("/create", async (req, res) => {
  const { lostItemId, claimerEmail, message } = req.body;

  if (!lostItemId || !claimerEmail) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  try {
    const newClaim = new Claim({ lostItemId, claimerEmail, message });
    await newClaim.save();
    res.status(201).json({ success: true, claim: newClaim });
  } catch (err) {
    console.error("Error creating claim:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
