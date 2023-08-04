import { Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../types/userType';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userController = {

    register: async function (req: Request , res: Response) {

        const userInput: IUser = req.body;
        // Encrypt password
        userInput.password = bcrypt.hashSync(req.body.password);

        const user = new User(userInput);

        try{

            // Auth e-mail not-duplicate
            const emailExistent = await User.findOne({ email: userInput.email });
            if(emailExistent) return res.status(400).send('O e-mail inserido já foi cadastrado!');

            // Auth tel not-duplicate
            const telExistent = await User.findOne({ tel: userInput.tel });
            if(telExistent) return res.status(400).send('O Telefone inserido já foi cadastrado!');

            const savedUser = await user.save();
            res.send(savedUser);

        } catch (error){

            res.status(400).send(error);

        }

    },

    login: async function(req: Request, res: Response){

        const userInput: IUser = req.body;

        try {
            
            // Auth email not-existent
            const emailExistent = await User.findOne({ email: userInput.email });
            if(!emailExistent) return res.status(400).send('O e-mail preenchido não foi cadastrado!');

            // Auth password incorrect
            const passwordCompare = await bcrypt.compare( req.body.password, `${ emailExistent.password }`)
            if (!passwordCompare) return res.status(400).send('A senha está incorreta')
    
            // Generate Token
            const token = jwt.sign({ _id: emailExistent._id, firstname: emailExistent.firstname, lastname: emailExistent.lastname, isAdmin: emailExistent.isAdmin }, `${ process.env.TOKEN_SECRET }`)

            res.header('auth-token', token);
            res.status(201).send({msg: 'Usuário Logado com Sucesso!'});

        } catch (error) {
            res.status(400).send(error);
        }

    },

    profile: async function(req: any, res: Response){
        
        const token = req.header('auth-token');

        try {

            if (!token) return res.status(401).send('Acesso Negado! Inicie a sua sessão para visualizar esta página.');

            const userVerified = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`);
            req.user = userVerified;

            const user = await User.findOne({ _id: req.user._id });

            res.status(201).send([{ msg: 'Dados do usuário logado recebido', data: user }]);

        } catch (error) {
            res.status(401).send(error);
        }

    }
 }

export { userController };