import express from 'express';
const router = express.Router();
import { 
    getMenu, 
    getMenuById,

} from '../controllers/menuController.js';

router.get('/', getMenu);

router.get('/:id', getMenuById)


export default router;