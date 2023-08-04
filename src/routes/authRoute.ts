import express from 'express';
import { validateToken } from '../controllers/authController';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/tokenVerify', validateToken );

module.exports = router;