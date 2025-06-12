const express = require('express');
const router = express.Router();
const FoundItem = require('../models/FoundItem');

router.get("/all",async(req,res)=>{
    try{
        const FoundItems=await FoundItem.find().sort({ date: -1 });
        res.status(200).json({
            message:"All Found Items are ",
            foundItems: FoundItems
        })
    }
    catch(error){
        console.error("Error fetching found items:", error);
        res.status(500).json({
            error: "Something went wrong while fetching found items. Please try again later."
        })
    }
})

router.post("/report", async (req, res) => {
    try {
        const { itemName, location, description, date, contact, reportedBy } = req.body;
        const newFoundItem = new FoundItem({
            itemName,
            location,
            description,
            date,
            contact,
            reportedBy
        })
        await newFoundItem.save();
        res.status(201).json({
            message: "Found Item reported successfully",
            FoundItem: newFoundItem
        })

    }
    catch (error) {
        console.error("error in reporting found items");
        res.status(400).json({
            error: "Something went wrong while reporting the found item. Please try again later."
        })
    }
})
router.delete('/delete/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await FoundItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update/:id",async(req,res)=>{
      const itemId = req.params.id;
    const updateData = req.body;
    
    try{
        const updatedItem=await FoundItem.findByIdAndUpdate(itemId,updateData);
        if(!updatedItem){
            return res.status(404).json({error:"Item not found"});
        }
        res.status(201).json({
            message:"found item data updated..",updatedItem
        })
        router.put("/update/:id", async (req, res) => {
            const itemId = req.params.id;
            const updateData = req.body;
            
            try {
                const updatedItem = await FoundItem.findByIdAndUpdate(itemId, updateData, {
                    new: true,
                    runValidators: true
                });
                if (!updatedItem) {
                    return res.status(404).json({ error: "Item not found" });
                }
                return res.status(200).json({
                    message: "found item data updated successfully",
                    updatedItem
                });
            } catch (error) {
                console.error("Error updating found item:", error);
                return res.status(500).json({ message: "Server error" });
            }
        });
    }
    catch(error){
        return res.status(500).json({message:"Server error"});

    }
})
module.exports = router;

