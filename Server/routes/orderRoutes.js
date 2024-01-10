import express from 'express';
const router = express.Router();
import {
    createOrders, 
    getAllOrders, 
    updatingOrderToDelivered, 
    updatingOrderToPaid, 
    getMyOrder,
    getOrderById
} from '../controllers/orderController.js'

import { adminOnly, ensureAuthenticated } from '../middleware/authMiddleware/protectionMiddleware.js';

router.route('/').post(ensureAuthenticated, createOrders).get(ensureAuthenticated, adminOnly, getAllOrders);
router.route('/myorders').get(ensureAuthenticated, getMyOrder);
router.route('/:id/delivered').put(ensureAuthenticated, adminOnly, updatingOrderToDelivered);
router.route('/:id').get(ensureAuthenticated, getOrderById);
router.route('/:id/paid').put(ensureAuthenticated, updatingOrderToPaid);

export default router;
