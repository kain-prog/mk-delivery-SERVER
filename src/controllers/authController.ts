import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

function auth(req: any, res: Response, next: NextFunction) {
    const token = req.header('auth-token');

    try {

        if (!token) return res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');

        const userVerified = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`);
        req.user = userVerified;
        next();

    } catch (error) {
        res.status(401).send(error);
    }
}

function validateToken(req: any, res: Response) {
    const token = req.body.token;
    
    try {

        if (!token) return res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');

        const validate = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`);
        res.status(200).send(validate);

    } catch (error) {
        res.status(401).send(error);
    }
}


export { auth, validateToken }