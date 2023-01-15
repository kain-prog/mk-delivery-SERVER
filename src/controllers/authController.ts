import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function auth(req: any, res: Response, next: NextFunction) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send('Acesso Negado!');
    }

    try {
        const userVerified = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`)
        req.user = userVerified;
        next();

    } catch (error) {
        res.status(401).send('Acesso Negado!');
    }
}

export default auth;