import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function auth(req: any, res: Response, next: NextFunction) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');
    }

    try {
        const userVerified = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`)
        req.user = userVerified;
        next();

    } catch (error) {
        res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');
    }
}

function validateToken(req: any, res: Response) {
    const token = req.body.token;
    if(!token) { 
        res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');
    }

    try {
        const validate = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`);
        res.status(200).send(validate);

    } catch (error) {
        res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');
    }
}


export { auth, validateToken }