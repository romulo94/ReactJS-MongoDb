const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transition = require("../../model/transition");
const User = require("../../model/user");

router.get("/", (req, res) => {
    Transition.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

  router.get("/:id", (req, res) => {
    Transition.find({user:req.params.id},function(err,data){
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

router.post("/", (req, res) => {
    let data = new Transition();
    const { value ,description,user } = req.body;
    data.value = value;
    data.description = description;
    User.find({name:user},function(err,usr){
        console.log('imprimir ->',usr[0].name,usr)
        if (err) return console.log(err,data);
        data.user = usr[0].name
        data.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    })
})
  
module.exports = router;