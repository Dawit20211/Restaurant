import { body } from 'express-validator';

// login validations 
const validateLogin = [
    body('email').isEmail.withMessage('Invalid email format')
    .normalizeEmail().notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
]

// register validations 
const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty.withMessage('Email is required')
    .normalizeEmail().isEmail('Provide a valid email'),
    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number'),
    // a couple of password validation to make it as secure as possible when users create one 
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain at least one digit') 
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@, $, !, %, *, ?, &)')
]

