import express from 'express';
import { validateLogin, validateRegister, validate } from '../middleware/validationMiddleware/authValidation.js';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUserById,
    updateUser,
} from '../controllers/userController.js';
import { adminOnly, ensureAuthenticated } from '../middleware/authMiddleware/protectionMiddleware.js';

// here will be all the different user related routes 
router.post('/register', validateRegister, validate, registerUser)
router.post('/login', validateLogin, validate, authUser);
router.get('/', ensureAuthenticated, adminOnly,getUsers);
router.post('/logout', logoutUser);
router.route('/profile').get(ensureAuthenticated, getUserProfile).put(ensureAuthenticated, updateUserProfile);
router.route('/:id').get(ensureAuthenticated,adminOnly,getUserById).delete(ensureAuthenticated,adminOnly,deleteUserById)
.put(ensureAuthenticated,adminOnly,updateUser);

export default router;