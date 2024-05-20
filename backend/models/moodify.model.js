const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
    _id: String,  
  cityName: String,
});

const noteSchema = new mongoose.Schema({
  _id: String,
  notes: [
    {
      type: String,
      content: String,
    }
  ]
});

const todoListSchema = new mongoose.Schema({
  _id: String,
  todoItems: [
    {
      _id: String,
      todoItem: String,
      completed: Boolean,
    }
  ]
});

const imageSchema = new mongoose.Schema({
  _id: String,
  imagelist: [
    {
      _id: String,
      url: String,
      width: Number,
      height: Number,
      x: Number,
      y: Number,
    }
  ]
});

//passing Schema to the model for moodify
const Weather = mongoose.model('Weather', weatherSchema);
const Note = mongoose.model('Note', noteSchema);
const TodoList = mongoose.model('TodoList', todoListSchema);
const Image = mongoose.model('Images', imageSchema);

module.exports = { Weather, Note, TodoList, Image };