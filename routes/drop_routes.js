const express = require('express')
const router = express.Router()

// view all drops
router.get("/", getDrops)

// view individual drop
router.get("/:id", getDrop)

// make new drop 
//CREATE
router.post("/", addDrop)

//delete drop 
router.delete("/:id", removerDrop)

// update drop
router.put("/:id", changeDrop)









module.exports = router;