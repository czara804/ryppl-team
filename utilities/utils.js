const Drop = require("../models/drop")

function getAllDrops(req) {
    return Drop.find()
  }
  
  function getDropById(req) {
    return Drop.findById(req.params.id)
  }
  
  function addDrop(req) {
    let date = Date.now()
    req.body.create_date = date
    req.body.modified_date = date
    return new Drop(req.body)
  }
  
  function deleteDrop(id) {
    return Drop.findByIdAndRemove(id)
  
  }
  
  function updateDrop(req) {
    req.body.modified_date = Date.now()
    return Drop.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  }
  
  
  
  module.exports = {getAllDrops, getDropById, addDrop, deleteDrop, updateDrop}
