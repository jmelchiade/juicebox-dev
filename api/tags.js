const express = require("express");
const tagsRouter = express.Router();
const {getAllTags, getPostsByTagName} = require("../db");

tagsRouter.get('/:tagName/posts', async (req,res,next) => {
    // const tags = await getAllTags();
    let tagName = req.params.tagName

    try {

        let posts =  getPostsByTagName(tagName)
        res.send({posts})
    }   catch({name, message})  {

    }

   
});

module.exports = tagsRouter;