const express = require('express');
const Tittle = require("../models/TittleModel");
const SubTittle = require("../models/SubtittleModel");
const SubTittleWithDescription = require("../models/SubTittleWithDescription");

const app = express;
const Router = app.Router();

// respond with "hello world" when a GET request is made to the homepage
Router.route('/gettitle').get(async function (req, res) {
  await Tittle.find().then(user => res.json(user)).catch(Error=>res.send("Error"+Error));
});
Router.route("/send").post(async (req, res)=>{
  const TittleName = req.body.TittleName;
  const TittleLocal = new Tittle({TittleName:TittleName});
  await TittleLocal.save().then(()=> res.json("Added!")).catch(Err => res.status(400).json("Error: "+Err));
});
Router.route("/updateTittle/:value").post(async (req, res)=>{
  const oldValue = req.params.value;
  const newValue = req.body.TitleValue;
  const IDofData = req.body.id;
  console.log(oldValue+" "+newValue+" "+IDofData);
  await Tittle.findById({_id:IDofData}).then((Data)=>{
    Data.TittleName = newValue;
    Data.save()
    .then(()=> res.json("Updated!"))
    .catch(Err => res.status(400).json("Error: "+Err));
  }).catch((err) => res.status(400).json("error" + err));

  await SubTittle.find({TittleName:oldValue}).then((SubTittleData)=>{
    SubTittleData.map(value=>{
      value.TittleName=newValue
      value.save()
      .then(result=>console.log("Changed in Subtitle",result))
      .catch(Err=>console.log(Err))
    })
  })
  await SubTittleWithDescription.find({TittleName:oldValue}).then((DecriptionTittleData)=>{
    DecriptionTittleData.map(value=>{
      value.TittleName=newValue
      value.save()
      .then(result=>console.log("Changed in Description",result))
      .catch(Err=>console.log(Err))
    })
  })
});
Router.route("/deleteTitle/:ID").post(async (req, res)=>{
  const ID = req.params.ID;
  const TitleName = req.body.TitleName;
  await SubTittleWithDescription.deleteMany({TittleName:TitleName})
  .then(()=>res.json("place also also deleted."))
  .catch(err=>res.status(400).json("Error:"+err));
  await SubTittle.deleteMany({TittleName:TitleName})
  .then(()=>res.json("subtitle also deleted."))
  .catch(err=>res.status(400).json("Error:"+err));
  await Tittle.deleteOne({_id: ID})
  .then(()=> res.json("deleted!"))
  .catch(Err => res.status(400).json("Error: "+Err));
});
module.exports = Router;