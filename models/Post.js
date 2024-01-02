const mongoose = require('mongoose');

const postSchema =new mongoose.Schema({
    myFile:{type:String}

});

const comment = mongoose.model.posts||mongoose.model('post', postSchema);

module.exports = comment;