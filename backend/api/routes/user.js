const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../model/user");
const Departament = require("../../model/departament");

router.get("/",(req,res)=>{
    User.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
})

router.post("/", (req, res) => {
    let data = new User();
    const { name ,departament } = req.body;
    data.name = name;
    Departament.find({_id:departament},function(err,person){
        if (err) return console.log(err);
        data.departament = person
        data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
    })
    
  });

  module.exports = router;