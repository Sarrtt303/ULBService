const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const connectDB = require('./config/db');
const listingsRoutes = require('./routes/lisitngRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
 
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;




// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Basic route
app.get('/', (req, res) => {
  res.send('Services are live');
});

// Use the auth routes
app.use('/api/auth', authRoutes);

app.use('/api/listings', listingsRoutes);

app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to start the server:', err);
});
