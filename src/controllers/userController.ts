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

        // Auth password incorrect
        const passwordCompare = await bcrypt.compare( req.body.password, `${ emailExistent.password }`)
        if (!passwordCompare) return res.status(400).send('A senha está incorreta')
 
        // Generate Token
        const token = jwt.sign({ _id: emailExistent._id, isAdmin: emailExistent.isAdmin }, `${ process.env.TOKEN_SECRET }`)

        res.header('auth-token', token);
        res.send('Usuário Logado com Sucesso!');

    }
}

export { userController };