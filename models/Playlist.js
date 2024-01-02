
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image :{
    type:String,
  },
  songs:[{
        id:{type:String},
        name:{type:String},
        image:{type:String},
        url:{type:String},
    }]

});

const playlist = mongoose.model('playlist', playlistSchema);

module.exports = playlist;
