import express from 'express';
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

router.route('/').post(resgisterUser).get(getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserPofile).put(updateUserProfile);
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUserProfile).put(updateUser);

export default router;