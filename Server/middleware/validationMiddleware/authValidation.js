import { body, validationResult} from 'express-validator';

// login validations 
const validateLogin = [
//   (req, res, next) => {
//     console.log('Executing validateLogin middleware');
//     next();
// },
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

  //   const formattedErrors = errors.array().map(error => {
  //     return {
  //         type: error.type,
  //         path: error.path,
  //         location: error.location,
  //         msg: error.value === '' ? `${error.param} is required` : error.msg
  //     };
  // });
  return res.json({ errors: errors.array() });

  }
  next();
};

export { validate, validateLogin, validateRegister }
