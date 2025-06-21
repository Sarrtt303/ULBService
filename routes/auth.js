const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const auth = require('../middlewares/Auth');
const validate = require('../middlewares/validate');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation,validate,  register);
router.post('/login', loginValidation, validate, login);


// GET /api/auth/me
router.get('/me', auth, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.userId,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      userType: req.user.isHost ? 'host' : 'guest',
      // include any other public fields
    }
  });
});


router.put('/profile', auth, updateProfile);

module.exports = router;