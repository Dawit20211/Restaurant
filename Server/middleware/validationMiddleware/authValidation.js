// import { body, validationResult} from 'express-validator';
const { body, validationResult } = require('express-validator');


// login validations 
const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required').normalizeEmail(), 
    body('password').notEmpty().withMessage('Password is required'),
];


// register validations 
const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required')
    .normalizeEmail().isEmail().withMessage('Provide a valid email'),
    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number'),
    // a couple of password validations to make it as secure as possible when users create one
    body('password')
      .isLength({ min : 8 }).withMessage('Password must be at least 8 characters')
      .matches(/\d/).withMessage('Password must contain at least one digit')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@, $, !, %, *, ?, &)'),
];
  
//middleware to check for validation errors 
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });

  }
  next();
};

module.exports = { validate, validateLogin, validateRegister }
