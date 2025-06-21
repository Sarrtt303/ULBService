# 🔒 API Endpoinjs Structure
Authentication Routes
POST /api/auth/register - User registration
POST /api/auth/login - User login
GET /api/auth/profile - Get user profile
PUT /api/auth/profile - Update user profile

# Listings Routes
GET /api/listings - Get all listings (with pagination & filters)
GET /api/listings/:id - Get single listing
POST /api/listings - Create new listing (host only)
PUT /api/listings/:id - Update listing (host only)
DELETE /api/listings/:id - Delete listing (host only)
GET /api/listings/user/:userId - Get listings by host

# Bookings Routes
POST /api/bookings - Create new booking
GET /api/bookings/guest/:guestId - Get bookings for guest
GET /api/bookings/user/:userId - Get bookings of host's lisitng
PUT /api/bookings/:id - Update booking status
DELETE /api/bookings/:id - Cancel booking
