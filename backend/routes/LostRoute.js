const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');



router.get("/all",async(req,res)=>{
    try{
        const lostItems=await LostItem.find().sort({ date: -1 });
        res.status(200).json({
            message:"All Lost Items are ",
            lostItems: lostItems
        })
    }
    catch(error){
        console.error("Error fetching lost items:", error);
        res.status(500).json({
            error: "Something went wrong while fetching lost items. Please try again later."
        })
    }
})

router.post("/report",async(req,res)=>{
    try{
         const{ itemName, location, description, date, contact , reportedBy} = req.body;
    const newLostItem=new LostItem({
        itemName,
        location,
        description,
        date,
        contact,
        reportedBy  
    })
    await newLostItem.save();
    res.status(201).json({
        message:"Lost Item reported successfully",
        LostItem: newLostItem
    })

    }
    catch(error){
        console.error("error in reporting lost items");
        res.status(400).json({
            error: "Something went wrong while reporting the lost item. Please try again later."
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await LostItem.findByIdAndDelete(req.params.id);
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
        const updatedItem=await LostItem.findByIdAndUpdate(itemId,updateData);
        if(!updatedItem){
            return res.status(404).json({error:"Item not found"});
        }
        res.status(201).json({
            message:"lost item data updated..",updatedItem
        })
        router.put("/update/:id", async (req, res) => {
            const itemId = req.params.id;
            const updateData = req.body;
            
            try {
                const updatedItem = await LostItem.findByIdAndUpdate(itemId, updateData, {
                    new: true,
                    runValidators: true
                });
                if (!updatedItem) {
                    return res.status(404).json({ error: "Item not found" });
                }
                return res.status(200).json({
                    message: "Lost item data updated successfully",
                    updatedItem
                });
            } catch (error) {
                console.error("Error updating lost item:", error);
                return res.status(500).json({ message: "Server error" });
            }
        });
    }
    catch(error){
        return res.status(500).json({message:"Server error"});

    }
})
module.exports = router;

