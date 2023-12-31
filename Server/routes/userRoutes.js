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
    deleteUser,
    updateUser,
} from '../controllers/userController.js';

router.post('/register', validateRegister, validate, resgisterUser)
router.post('/login', validateLogin, validate, authUser);
router.get('/', getUsers);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserPofile).put(updateUserProfile);
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);

export default router;