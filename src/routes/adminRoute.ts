import express, { Request, Response } from 'express';
import auth from '../controllers/authController';

const router = express.Router();

router.get('/admin', auth, (req: any, res: Response) => {
    
    if(req.user.isAdmin) {

        res.send('SOU UM ADMIN');

    }
    else {

        res.status(401).send('Acesso Negado! O usuário não é ADMIN.');

    }
    
});


module.exports = router;