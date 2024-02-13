const postModel = require('../models/post');


const getAllPosts = (req, res) => {
    const posts = postModel.getAllPosts;
    res.json(posts);
    };

