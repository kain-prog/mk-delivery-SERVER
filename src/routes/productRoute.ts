import express from 'express';
import { productController } from '../controllers/productController';

const router = express.Router();

router.post('/products/create', productController.create );
router.get('/products', productController.getAll );
router.get('/products/:id', productController.getByID );
router.put('/products/:id', productController.updateByID );
router.delete('/products/:id', productController.destroy );

module.exports = router;