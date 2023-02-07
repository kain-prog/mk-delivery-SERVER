import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

function isAdmin(req: any, res: Response, next: NextFunction){
    const token = req.header('auth-token');
    
    try {
        
        const userVerified = jwt.verify(`${ token }`, `${ process.env.TOKEN_SECRET }`)
        req.user = userVerified;

        if (req.user.isAdmin) {
            next(); 
        }
        else{
            return res.status(401).send('Acesso negado! Você não tem permissão de Admin.')
        }
         
    } catch (error) {

        res.status(400).send(error);
    
    }
}

export default isAdmin;