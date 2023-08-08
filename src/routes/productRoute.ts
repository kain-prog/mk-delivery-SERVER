import express, { Request } from 'express';
import { productController } from '../controllers/productController';
import {auth}  from '../controllers/authController';
import isAdmin from '../controllers/adminController';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname );
    }
});

const upload = multer({ storage: storage, limits: {
      fileSize: 1024 * 1024 * 5
    },
    // fileFilter
});


router.post('/products/create', upload.single('image'), auth, isAdmin, productController.create );

router.get('/products', productController.getAll );
router.get('/products/:id', productController.getByID );
router.put('/products/:id', upload.single('image'), auth, isAdmin, productController.updateByID );
router.delete('/products/:id', auth, isAdmin, productController.destroy );

module.exports = router;