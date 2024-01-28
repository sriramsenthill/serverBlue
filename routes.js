const express = require("express");
const { getTotalVotes, vote } = require("./test")
const router = express.Router();


router.put("/vote", vote);
router.get("/getTotalVotes", getTotalVotes)


module.exports = router;