const express = require('express');
var ObjectId = require('mongodb').ObjectID;
const Tittle = require("../models/SubTittleWithDescription");
const app = express;
const Router = app.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Photos')
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random(100) * 1000000) + file.originalname);
  }
});
var upload = multer({ storage: storage }).array('file')


// respond with "hello world" when a GET request is made to the homepage
Router.route('/getplace').get(async function   (req, res) {
  // res.send('<h1>hello world</h1>');
  await Tittle.find().then((user) => { res.json(user); }).catch(Error => res.send("Error" + Error));
  // console.log()
});
Router.route('/getplaceImage/:Image').get(async function (req, res) {
  // res.send('<h1>hello world</h1>');
  console.log(req.params.Image)
  await res.sendFile(process.cwd() + "/public/Photos/" + req.params.Image);
  // Tittle.find().then((user )=>{ res.json(user);}).catch(Error => res.send("Error" + Error));
  // console.log(process.cwd()+"\publi\919004.jpg")
});
Router.route('/getplace/:ID').get(async function (req, res) {
  // console.log(req.params);
  const len = req.params.ID.length;
  const data = req.params.ID.substring(1, len);
  await Tittle.findById(new ObjectId(data)).then(user => res.send(user)).catch(Error => res.send("Error" + Error));
});
Router.route('/update').post(async function (req, res) {
  const data = req.body.id;
  const subject = req.body.TittleName;
  const state = req.body.SubTittleName;
  const city = req.body.city;
  const TourPlace = req.body.TourPlace;
  const TourPlaceDescription = req.body.TourPlaceDescription;
  const imageLinksArray = req.body.imageLinksArray;
  await Tittle.findById(data).then(async (exercise) => {
      exercise.TittleName = subject,
      exercise.subtittleName = state,
      exercise.city = city,
      exercise.PlaceForTour = TourPlace,
      exercise.PlaceTourExplaination = TourPlaceDescription,
      exercise.imageLinksArray = imageLinksArray
      await exercise.save().then(() => res.json("updated!")).catch((err) => res.status(400).json("error" + err));
  })
}
);
Router.route('/updateSubtitle/:Name').post(async function (req, res) {
  const  CurrentData = req.params.Name;
  const  PreviousData= req.body.DataToSend;
  await Tittle.find().then(exercise => {
    exercise.map(async (data) => {
      if (data.subtittleName === PreviousData) {
        data.subtittleName = CurrentData;
        await data.save().then(() => res.json("updated! Place")).catch((err) => res.status(400).json("error" + err));
      }
    })
  }
  )
}
);


Router.route("/add").post(async (req, res) => {
  upload(req, res, async function (err) {
    const subject = req.body.TittleName;
    const state = req.body.state;
    const city = req.body.city;
    const TourPlace = req.body.TourPlace;
    const imageLinksArray = req.body.imageLinksArray;
    const TourPlaceDescription = req.body.TourPlaceDescription;
    const TittleLocal = new Tittle({
      TittleName: subject,
      subtittleName: state,
      city: city,
      PlaceForTour: TourPlace,
      PlaceTourExplaination: TourPlaceDescription,
      imageLinksArray: imageLinksArray
    });
    await TittleLocal.save().then(() => res.json("Added!")).catch(Err => res.status(400).json("Error: " + Err));
  })
});
Router.route('/delete/:ID').post(async function (req, res) {
  // console.log();
  await Tittle.deleteOne({ _id: req.params.ID }).then(() => res.json("Deleted")).catch(Error => res.send("Error" + Error));
});
module.exports = Router;