import express from 'express';
import { userController } from '../controllers/userController';
import { auth }  from '../controllers/authController';
import isAdmin from '../controllers/adminController';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/avatar/');
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

router.get('/users', auth, isAdmin, userController.allUsers);
router.get('/user/profile', userController.index);
router.put('/user/profile/:id', upload.single('image'), auth, userController.put);
router.delete('/user/profile/:id', auth, userController.destroy);

module.exports = router;