const mongoose = require('mongoose');

const commentSchema =new mongoose.Schema({
    songId:{type:String},
    username:{type:String},
    cmttxt:{type:String},
});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;