import express from 'express';
import { productController } from '../controllers/productController';
import auth from '../controllers/authController';

const router = express.Router();

router.post('/products/create', auth, productController.create );
router.get('/products', productController.getAll );
router.get('/products/:id', productController.getByID );
router.put('/products/:id', auth, productController.updateByID );
router.delete('/products/:id', auth, productController.destroy );

module.exports = router;