const express = require('express');
const postContoller = require("../controllers/post");
const dialogflow = require('dialogflow');
const uuid = require('uuid');


const router = express.Router();

router.get("/",postContoller.getPosts);
router.post("/",postContoller.createPost);

module.exports = router;
