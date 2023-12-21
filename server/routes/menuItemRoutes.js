import express from 'express';
const router = express.Router();
import { 
    getMenuItems, 
    getMenuItemsById,

} from '../controllers/menuItemsController.js';

router.get('/', getMenuItems);

router.get('/:id', getMenuItemsById)


export default router;