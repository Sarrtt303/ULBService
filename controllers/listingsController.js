const Listing = require('../models/listings');

// GET /api/listings?city=Delhi&propertyType=apartment&minPrice=1000
const getAllListings = async (req, res) => {
  try {
    const {
      city,
      propertyType,
      minPrice,
      maxPrice,
      guests,
      checkIn,
      checkOut,
      page = 1,
      limit = 12
    } = req.query;

    const filter = {};

    if (city) filter['location.city'] = city;
    if (propertyType) filter.propertyType = propertyType;
    if (minPrice) filter.price = { ...filter.price, $gte: parseInt(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };
    if (guests) filter.maxGuests = { $gte: parseInt(guests) };
    if (checkIn && checkOut) {
      filter.availableFrom = { $lte: new Date(checkIn) };
      filter.availableTo = { $gte: new Date(checkOut) };
    }

    const total = await Listing.countDocuments(filter);
    const listings = await Listing.find(filter)
      .populate('host', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalCount: total,
      listings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching listings' });
  }
};

// GET /api/listings/:id
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('host', 'name email');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching listing' });
  }
};

// GET /api/listings/user/:userId
const getListingsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const listings = await Listing.find({ host: userId }).populate('host', 'name email');
    res.status(200).json(listings);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// POST /api/listings
const createListing = async (req, res) => {
  console.log("DEBUG: Incoming req.body ===>", req.body);

  try {
    const {
      title,
      description,
      location,
      price,
      maxGuests, 
      propertyType,
      images,
      host,
      bedrooms,
      bathrooms,
      availableFrom,
      availableTo,
      isActive,
      amenities,
    } = req.body;

    // Required fields check
    if (!title || !price || !propertyType || !host || !maxGuests || !location?.address) {
  return res.status(400).json({ message: 'Missing required fields' });
}


    const newListing = new Listing({
      title,
      description,
      location,
      price,
      maxGuests, // ✅ fixed field name
      propertyType,
      images,
      host,
      bedrooms,
      bathrooms,
      availableFrom,
      availableTo,
      isActive,
      amenities,
    });

    const savedListing = await newListing.save();

    res.status(201).json({ success: true, listing: savedListing });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllListings,
  getListingById,
  createListing,
  getListingsByUser
};
