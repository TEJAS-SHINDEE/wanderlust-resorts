const express = require("express");
const router = express.Router();


//posts
//index post
router.get("/",(req,res)=>{
    res.send("Get for post");
});

//show post
router.get("/:id",(req,res)=>{
    res.send("Get for post id");
});

//post-post
router.post("/",(req,res)=>{
    res.send("Get for post");
});

//delete - post
router.delete("/:id",(req,res)=>{
    res.send("delete for posts id");
});

module.exports = router;