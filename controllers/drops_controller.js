const {getAllDrops, getDropById, addDrop, deleteDrop, updateDrop} = require("../utilities/utils")

// getAllDrops
function getDrops(req,res) {
  // ask Janel why sort then exec
    getAllDrops(req)
    .sort({
      modified_date : -1
    })
    .exec((err, drops) => {
      if (err) {
        res.status(500)
        return res.json({
          error: err.message
        })
      }
    res.send(drops);
  })
}
  
  // getDropById
  function getDrop(req,res) {
    getDropById(req).exec((err, drop) => {
      if (err) {
        res.status(404)
        return res.send("post not found")
      }
    res.send(drop)
    })
  }
  
  // makeDrop
  function makeDrop(req,res) {
    addDrop(req).save((err, drop) => {
      if (err) {
        res.status(500)
        res.json({
          err: err.message
        })
      }
    res.status(201)
    res.send(drop)
    })
  }
  
  // removeDrop
  function removeDrop(req, res) {
    deleteDrop(req.params.id).exec((err) => {
      if (err) {
        res.status(500)
        return res.json({
          error: err.message
        })
      }
    res.sendStatus(204)
    })
  }
  
  function changeDrop(req, res) {
    updateDrop(req).exec((err, drop) => {
      if (err) {
        res.status(500)
        return res.json({
          error: err.message
        })
      }
    res.status(200)
    res.send(drop)
    })
  }
  
module.exports = {getDrops, getDrop, makeDrop, removeDrop, changeDrop}