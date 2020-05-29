const express = require('express')
const router = express.Router()
const {makeDrop, getDrops, getDrop, removeDrop, changeDrop} = require("../controllers/drops_controller")

// view all drops
router.get("/", getDrops)

// // view individual drop
router.get("/:id", getDrop)

// // make new drop 
// //CREATE
router.post("/", makeDrop)

// //delete drop 
router.delete("/:id", removeDrop)

// // update drop
router.put("/:id", changeDrop)

module.exports = router;

