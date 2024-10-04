
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
    },
    ingredients: {
        type: String,
    },
    instructions: {
        type: String,
    },
    cuisineType: {
        type: String,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    },
    Created_date: {
        type: String,
        required: true
    },
    Updated_date: {
        type: String,
        required: true
    },
})

const post = mongoose.model("Post", PostSchema);


module.exports = post;