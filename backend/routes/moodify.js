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
   .catch((err) => res.status(500));
});

//------------------------------ Image Editor ---------------------------------------------------------------

router.route("/images").get((req, res) => {
   Image.find()
   .then((images) => res.json(images))
   .catch((err) => res.status(400).json("Error" + err));
});

router.route("/images/add").post((req, res) => {

   const imagesToAdd = new Image({
     _id : req.body._id,
     imagelist: req.body.imagelist,
  });
  imagesToAdd
  .save()
  .then(() => res.json("Image added!"))
  .catch((err) => res.status(400).json("Error "+ err));
  });

//-------------------------------Image Upload---------------------------------------------------------------

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
 const userId = uuidv4()


router.route("/upload-image").post(upload.single("image"), async (req, res) =>{

   const fileName = req.file.filename;
   const newImage = {
      _id: userId,
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
  
      res.status(200).send('Image uploaded and document updated successfully.');
    } catch (err) {
      res.status(500).send('Error updating the document: ' + err.message);
    }
   
});

module.exports = router;