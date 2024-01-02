
const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  songId: {
    type: String,
    required: true,
  },
  username :{
    type:String,
  },

});

const like = mongoose.model('Like', LikeSchema);

module.exports = like;
