const express = require('express')
const router = express.Router()
const {} = require("")

// view all users
router.get("/", getUsers)

// view individual user
router.get("/:id", getUserById)

// make new user 
//CREATE
router.post("/", addUser)

//delete user 
router.delete("/:id", removerUser)

// update user
router.put("/:id", changeUser)





module.exports = router;