const mongoose = require("mongoose");
//import this everytime you need to access the variabkes inside of default.json
const config = require("config");

//made possible by the config module which is installed through npm, makes the contents of the default.json a global variable
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
