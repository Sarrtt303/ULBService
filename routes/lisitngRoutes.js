const express = require('express');
const {
  getAllListings,
  getListingById,
  createListing,
  getListingsByUser
} = require('../controllers/listingsController');

const router = express.Router();



router.get('/user/:userId', getListingsByUser);
router.get('/', getAllListings);

router.get('/:id',  getListingById);
router.post('/', createListing); // POST new listing



module.exports = router;
