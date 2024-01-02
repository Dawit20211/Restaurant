import express from 'express';
import { validateLogin, validateRegister, validate } from '../middleware/validationMiddleware/authValidation.js';
const router = express.Router();
import {
    authUser,
    resgisterUser,
    logoutUser,
    getUserPofile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUserById,
    updateUser,
} from '../controllers/userController.js';
import { adminOnly, ensureAuthenticated } from '../middleware/authMiddleware/protectionMiddleware.js';

router.post('/register', validateRegister, validate, resgisterUser)
router.post('/login', validateLogin, validate, authUser);
router.get('/', ensureAuthenticated, adminOnly,getUsers);
router.post('/logout', logoutUser);
router.route('/profile').get(ensureAuthenticated, getUserPofile).put(ensureAuthenticated, updateUserProfile);
router.route('/:id').get(ensureAuthenticated,adminOnly,getUserById).delete(ensureAuthenticated,adminOnly,deleteUserById)
.put(ensureAuthenticated,adminOnly,updateUser);

export default router;