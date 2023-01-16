import { NextFunction, Response } from 'express';


function isAdmin(req: any, res: Response, next: NextFunction){

    if(!req.user.isAdmin){
        
        res.status(401).send( 'Acesso negado! Você não tem permissão para acessar esta página.' );
    
    }

    try {

        next();   

    } catch (error) {

        res.status(401).send({ msg: 'Acesso negado! Você não tem permissão para acessar esta página.', error });
    
    }

}

export default isAdmin;