import express from 'express';
import { productController } from '../controllers/productController';
import {auth}  from '../controllers/authController';
import isAdmin from '../controllers/adminController';

const router = express.Router();

router.post('/products/create', auth, isAdmin, productController.create );
router.get('/products', productController.getAll );
router.get('/products/:id', productController.getByID );
router.put('/products/:id', auth, isAdmin, productController.updateByID );
router.delete('/products/:id', auth, isAdmin, productController.destroy );

module.exports = router;