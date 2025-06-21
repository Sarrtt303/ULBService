const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  getBookingsByUser
} = require('../controllers/bookingController');

router.get('/user/:userId', getBookingsByUser);
router.get('/:id', getBookingById);
router.get('/', getAllBookings);
router.post('/', createBooking);
router.put('/:id', updateBooking);


module.exports = router;
