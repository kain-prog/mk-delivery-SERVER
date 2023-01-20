import express from 'express';
import { validateToken } from '../controllers/authController';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/tokenVerify', validateToken );

module.exports = router;