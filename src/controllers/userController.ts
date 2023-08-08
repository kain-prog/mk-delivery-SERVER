import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/userType';
import bcrypt from 'bcryptjs';

const userController = {

    allUsers: async function(req: Request, res: Response){

        try{

            const user = await User.find();
            return res.status(200).send({ msg: 'Listagem de todos os usuários', data: user})
            
        } catch (error){
            res.status(401).send(error);
        }

    },

    index: async function(req: Request | any, res: Response){
        
        const token = req.header('auth-token');

        try {

            if (!token) return res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');

            const userVerified = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`);
            req.user = userVerified;

            const user = await User.findOne({ _id: req.user._id });

            res.status(201).send([{ msg: 'Dados do usuário logado recebido.', data: user }]);

        } catch (error) {
            res.status(401).send(error);
        }

    },

    put: async function(req: Request, res: Response){

        const userParams = req.params;
        const userInput: IUser = req.body;


        const userToken = req.header('auth-token');

        try {

            if(userInput.image){
                userInput.image = process.env.UPLOADS + req.file!.path;
            }
    
            userInput.password = bcrypt.hashSync(req.body.password);

            const userVerified = jwt.verify(`${userToken}`, `${process.env.TOKEN_SECRET}`);
            const userInfo: any = userVerified;

            const userId = userInfo._id;

            if(userParams.id === userId || !!userInfo.isAdmin){
                await User.findByIdAndUpdate({_id: userParams.id}, userInput);
                return res.status(204).send({ msg: 'Seus dados foram atualizados com sucesso!' });
            }
            else{
                return res.status(401).send({ msg: 'Você não tem permissão para acessar esta página' });
            }
            

        } catch (error) {
            res.status(401).send(error);
        }
    },

    destroy: async function(req: Request | any, res: Response){

        const userParams = req.params;
        const userToken = req.header('auth-token');

        try {
    
            const userVerified = jwt.verify(`${userToken}`,  `${process.env.TOKEN_SECRET}`);
            req.user = userVerified;

            const userId = req.user._id;

            if(userParams.id === userId || req.user.isAdmin){

                await User.deleteOne({_id: userParams.id});
                return res.status(204).send({ msg: 'A sua conta foi deletada com sucesso!' });
            }
            else{
                return res.status(401).send({ msg: 'Você não tem permissão para acessar esta página' });
            }


        } catch (error) {
            res.status(401).send(error);
        }

    }
 }

export { userController };