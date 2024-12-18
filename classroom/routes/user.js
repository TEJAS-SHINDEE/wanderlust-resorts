const express = require("express");
const router = express.Router();

//index users
router.get("/",(req,res)=>{
    res.send("Get for user");
});

//show users
router.get("/:id",(req,res)=>{
    res.send("Get for user id");
});

//post-users
router.post("/",(req,res)=>{
    res.send("Get for user");
});

//delete - users
router.delete("/:id",(req,res)=>{
    res.send("delete for user id");
});

module.exports = router;