import { Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../types/userType';

const userController = {

    register: async function (req: Request , res: Response) {

        const userInput: IUser = req.body;

        // Auth e-mail not-duplicate
        const emailExistent = await User.findOne({ email: userInput.email });
        if(emailExistent) return res.status(400).send('O e-mail inserido já foi cadastrado!');

        // Auth tel not-duplicate
        const telExistent = await User.findOne({ tel: userInput.tel });
        if(telExistent) return res.status(400).send('O Telefone inserido já foi cadastrado!');

        const user = new User(userInput);

        try{
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (error){
            res.status(400).send(error);
        }

    },

    login: async function(req: Request, res: Response){

        const userInput: IUser = req.body;

        // Auth email not-existent
        const emailExistent = await User.findOne({ email: userInput.email });
        if(!emailExistent) return res.status(400).send('O e-mail preenchido não foi cadastrado!');

        res.send('Usuário Logado com Sucesso!');

    }

}


export { userController };