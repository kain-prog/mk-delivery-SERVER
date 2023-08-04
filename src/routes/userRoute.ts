import express from 'express';
import { userController } from '../controllers/userController';
import { auth }  from '../controllers/authController';
import isAdmin from '../controllers/adminController';

const router = express.Router();

router.get('/users', auth, isAdmin, userController.allUsers);
router.get('/user/profile', userController.index);
router.put('/user/profile/:id', auth, userController.put);
router.delete('/user/profile/:id', auth, userController.destroy);

module.exports = router;