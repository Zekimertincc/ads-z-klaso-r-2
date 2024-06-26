const mongoose = require('mongoose');
const { Schema } = mongoose; 

exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection Established...");
  } catch (error) {
    console.error(error.message);
  }
}
// create a schema 
const loginSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// create user score schema
// Path: models/score.js

const ScoreSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});


exports.collection2 = mongoose.model('Score', ScoreSchema);




exports.collection = mongoose.model('users', loginSchema);

