const router = require("express").Router();
const {v4 : uuidv4} = require('uuid')
const { Weather, Note, TodoList, Image} = require("../models/moodify.model");

//------------------------Todo List-------------------------------------------------------------------------

router.route("/todoList").get((req, res) => {
   TodoList.find()
   .then((todolist) => res.json(todolist))
   .catch((err) => res.status(400).json("Error" + err));
});

router.route("/todolist/add").post((req, res) => {

 const todoListAdd = new TodoList({
   _id : req.body._id,
   todoItems: req.body.todoItems,
   completed: req.body.completed,
});
todoListAdd
.save()
.then(() => res.json("TodoList added!"))
.catch((err) => res.status(400).json("Error "+ err));
});

router.route("/todolist/update").put((req, res) => {
   TodoList.findOneAndUpdate({_id:"01234"}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true })
   .then((updatedTodoList) => res.json(updatedTodoList))
   .catch((err) => res.status(err + 500));
});

//------------------------------ Image Editor ---------------------------------------------------------------

router.route("/images").get((req, res) => {
   Image.find()
   .then((images) => res.json(images))
   .catch((err) => res.status(400).json("Error" + err));
});

router.route("/images/add").post((req, res) => {

   const imagesToAdd = new Image({
     _id: req.body._id,
     imagelist: req.body.imagelist,
  });
  imagesToAdd
  .save()
  .then(() => res.json("Image added!"))
  .catch((err) => res.status(400).json("Error "+ err));
  });


  // Endpoint to update x and y values of an image in imagelist
router.patch('/update-image-position/:userId/:imageId', async (req, res) => {
  const { userId, imageId } = req.params;
  const { newX, newY } = req.body;
  try {
    const result = await Image.updateOne(
      { _id: userId, 'imagelist._id': imageId },
      {
        $set: {
          'imagelist.$.x': newX,
          'imagelist.$.y': newY
        }
      }
    );

    if (result.nModified === 0) {
      return res.status(404).send('Document or Image not found');
    }

    res.send('Update successful');
  } catch (error) {
    res.status(500).send('Error updating document: ' + error.message);
  }
});


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^Image Upload^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const multer  = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {

     cb(null, '../public/images/image-board');
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now();
     cb(null, uniqueSuffix + file.originalname);
   }
 });
 
 const upload = multer({ storage: storage })
 const imageId = uuidv4()


router.route("/images/upload-image").post(upload.single("image"), async (req, res) =>{

   const fileName = req.file.filename;
   const newImage = {
      _id: imageId,
      url: "images/image-board/"+fileName,
     width: 200, // default width
     height: 200, // default height
     x: 0,
     y: 0,
   };

   try {
      // Update the document with new image information
      await Image.updateOne(
        { _id: "01234" }, // Query to find the document
        { $push: { imagelist: newImage } } // Update operation
      );
  
      res.status(200).send('Images updated successfully.');
    } catch (err) {
      res.status(500).send('Error updating the document: ' + err.message);
    }
   
});

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Delete Image^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

router.route("/images/delete-image").post((req, res) => {
  Image.findOneAndUpdate({_id:"01234"}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true })
.then((updatedImageList) => res.json(updatedImageList))
.catch((err) => res.status(err + 500));

});

//--------------------------------Weather data---------------------------------------------------------------------------------------------

router.route("/weather").get((req, res) => {
  Weather.find()
  .then((weather) => res.json(weather))
  .catch((err) => res.status(400).json("Error" + err));
});

router.route("/weather/add").post((req, res) => {
  const weatherToAdd = new Weather(req.body);
  weatherToAdd
  .save()
  .then(() => res.json("Weather Information added!"))
  .catch((err) => console.log("Error saving weather data: "+err));
});

router.route("/weather/update").put((req, res) => {
  Weather.findOneAndUpdate({_id:"01234"}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true })
  .then((updatedWeather) => res.json(updatedWeather))
  .catch((err) => res.status(err + 500));
});


//-------------------------------------------- Tabs data -----------------------------------------------------------------------

router.route("/notes").get((req, res) => {
  Note.find()
  .then((notes) => res.json(notes))
  .catch((err) => res.status(400).json("Error" + err));
});

router.route("/notes/add").post((req, res) => {
  
  const notesToAdd = new Note({
    _id: req.body._id,
    note: req.body.note,
  });
  notesToAdd
  .save()
  .then(() => res.json("Tabs Information added!"))
  .catch((err) => console.log("Error saving Tabs data: "+err));
});

router.route("/notes/update").put((req, res) => {
  Note.findOneAndUpdate({_id:"01234"}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true })
  .then((updatedNotes) => res.json(updatedNotes))
  .catch((err) => res.status(err + 500));
});

module.exports = router;