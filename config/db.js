const mongoose = require('mongoose');

// const MONGO_URI="mongodb+srv://sagardebnath1001:Z6qeCxAwUBE1OIqn@stayfindr.toq7ich.mongodb.net/?retryWrites=true&w=majority&appName=stayFindr"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;