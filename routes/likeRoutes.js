const express = require('express');
const router = express.Router();
const Like = require('../models/Like');

router.post('/like',async(req,res)=>{
    try {
        const {songId,username} =req.body;
        const newLike = await Like.create({songId,username});
        return res.status(201).json({response:true});
        console.log("Liked Song Successfully");
    } catch (error) {
        console.log("Unable to Like");
    }
});

router.get('/likes/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const likes = await Like.find({ username });

        return res.status(200).json({ response: true, likes });
    } catch (error) {
        console.log("Unable to retrieve likes", error);
        return res.status(500).json({ response: false, error: "Unable to retrieve likes" });
    }
});
router.get('/likes/songid/:songId', async (req, res) => {
    try {
        const songId = req.params.songId;
        const likes = await Like.find({ songId });

        return res.status(200).json({ response: true, likes });
    } catch (error) {
        console.log("Unable to retrieve likes", error);
        return res.status(500).json({ response: false, error: "Unable to retrieve likes" });
    }
});
router.delete('/unlike', async (req, res) => {
    try {
        const { songId, username } = req.body;
        const deletedLike = await Like.findOneAndDelete({ songId, username });
        
        if (deletedLike) {
            return res.status(200).json({ response: true });
        } else {
            return res.status(404).json({ response: false, error: "Like not found" });
        }
    } catch (error) {
        console.log("Unable to Unlike", error);
        return res.status(500).json({ response: false, error: "Unable to Unlike" });
    }
});
module.exports = router;