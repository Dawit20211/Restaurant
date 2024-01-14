const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const {
    createOrders,
    getAllOrders,
    updatingOrderToDelivered,
    updatingOrderToPaid,
    getMyOrder,
    getOrderById
} = orderController;

const protectionMiddleware = require('../middleware/authMiddleware/protectionMiddleware.js');

const {
    adminOnly,
    ensureAuthenticated
} = protectionMiddleware;

router.route('/').post(ensureAuthenticated, createOrders).get(ensureAuthenticated, adminOnly, getAllOrders);
router.route('/myorders').get(ensureAuthenticated, getMyOrder);
router.route('/:id/delivered').put(ensureAuthenticated, adminOnly, updatingOrderToDelivered);
router.route('/:id').get(ensureAuthenticated, getOrderById);
router.route('/:id/paid').put(ensureAuthenticated, updatingOrderToPaid);

module.exports = router;
