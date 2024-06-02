const mongoose = require('mongoose');


exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection Established...");
  } catch (error) {
    console.error(error.message);
  }
}
// create a schema 
const loginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

exports.collection = mongoose.model('users', loginSchema);

