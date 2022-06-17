const express = require('express');
const subTittle = require("../models/SubtittleModel");
const SubTittleWithDiscription = require("../models/SubTittleWithDescription");

const app = express;
const Router = app.Router();

// respond with "hello world" when a GET request is made to the homepage
Router.route('/getsubtitle').get(async function (req, res) {
  // res.send('<h1>hello world</h1>');
  await subTittle.find().then(user => res.json(user)).catch(Error=>res.send("Error"+Error));
});
Router.route('/getsubtitle/:Data').get(async function (req, res) {
  // res.send('<h1>hello world</h1>');
  const data = req.params.Data; 
  await subTittle.findOne({subtittleName:data}).then(user => res.json(user)).catch(Error=>res.send("Error"+Error));
});
Router.route("/submit").post(async (req, res)=>{
    const subject = req.body.TittleName;
  const state = req.body.state;
  // console.log(req.body);
  const TittleLocal = new subTittle({
    TittleName:subject,
    subtittleName:state
   });
  await TittleLocal.save().then(()=> res.json("Added!")).catch(Err => res.status(400).json("Error: "+Err));
    console.log(req.body);
});
Router.route("/update/:ID").post(async (req, res)=>{
  const ValueToUpdate = req.body.SubTitleValue;
  let oldValue;
  await subTittle.findById(req.params.ID).then((Data)=>{
    oldValue = Data.SubtittleName;
    Data.subtittleName=ValueToUpdate
    Data.save()
    .then(() => res.status(400).json("updated Subtitle!"))
    .catch((err) => res.json("error" + err));
  }).catch(Err=>console.log(Err));
  SubTittleWithDiscription.find({subtittleName:oldValue})
  .then((Data)=>{
    Data.map(values=>{
      values.subtittleName=ValueToUpdate
      values.save()
      .then(result=>console.log("Subtittle file and update route",result))
      .catch(Err=>console.log("Subtittle file and update route",Err))
    })
  }).catch(Err=>console.log(Err))
});
Router.route("/delete/:ID").post(async (req, res)=>{
  const NameOfSubtitle = req.body.NameOfSubtitle;
  await SubTittleWithDiscription.deleteMany({subtittleName:NameOfSubtitle})
  .then(()=>res.json("place also deleted."))
  .catch(err=>res.status(400).json("Error:"+err));
  await subTittle.deleteOne({_id: req.params.ID})
  .then(()=> res.json("deleted!"))
  .catch(Err => res.status(400).json("Error: "+Err));
});
module.exports = Router;