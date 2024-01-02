const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

router.post('/create',async(req,res)=>{
    try {
        const {name,image} = req.body;
        const newPlaylist = await Playlist.create({name,image});
        return res.status(201).json({ status: true});
    } catch (error) {
        console.log(error);
    }
});
router.get('/get', async (req, res) => {
    try {
      const playlists = await Playlist.find();
      res.status(200).json({ status: true, playlists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
  });



module.exports = router;

