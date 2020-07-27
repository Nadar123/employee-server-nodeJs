const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
  try {
    await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true, 
      useFindAndModify: false
    });
    console.log('mongoDB is connected!')
  } catch(error) {
    console.erorr(error.message);
      process.exit(1);
  }
}

module.exports = connectDB;