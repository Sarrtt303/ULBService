const Booking = require('../models/Booking');
const Listing=require('../models/listings')

// GET all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('listing')
      .populate('guest');
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('listing')
      .populate('guest');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST create new booking
const createBooking = async (req, res) => {
  try {
    const { listing, guest, checkIn, checkOut, guests, totalPrice } = req.body;

    if (!listing || !guest || !checkIn || !checkOut || !guests || !totalPrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBooking = new Booking({
      listing,
      guest,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT update a booking
const updateBooking = async (req, res) => {
  try {
    const { status, paymentStatus, checkIn, checkOut } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut }),
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ success: true, booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/bookings/user/:userId
const getBookingsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    console.log('Fetching listings for user:', userId);

    // Step 1: Get listings hosted by this user
    const userListings = await Listing.find({ host: userId }).select('_id');
    console.log('Listings found:', userListings);

    const listingIds = userListings.map(listing => listing._id);
    console.log('Listing IDs:', listingIds);

    // Step 2: Get bookings for those listings
    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate('listing')
      .populate('guest');

    console.log('Bookings found:', bookings);

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings by user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  getBookingsByUser
};
