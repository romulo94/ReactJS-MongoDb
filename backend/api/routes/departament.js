const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Departament = require("../../model/departament");

router.get("/", (req, res) => {
    Departament.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

router.post("/", (req, res) => {
    let data = new Departament();
    const { name } = req.body;
    data.name = name;
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  module.exports = router;