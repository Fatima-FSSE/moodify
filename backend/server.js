require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const moodifyRouter = require("./routes/moodify");

app.use("/moodify", moodifyRouter);

connectDB().then(function () {
  app.listen(PORT, function () {
    console.log(`Server started. Listening on port ${PORT}`);
  });
});
