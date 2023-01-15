import { Request, Response } from "express";
import Product from "../models/Product";
import { IProduct } from "../types/productType";

const productController = {

    create: async function(req: Request, res: Response){

        const productInput: IProduct = req.body;

        const product = new Product (productInput);

        try {

            const savedProduct = await product.save();

            res.status(200).send({ msg: 'O Produto foi inserido com sucesso!', data: savedProduct });

        } catch (error) {

            res.status(400).send(error);

        }
    },

    getAll: async function(req: Request, res: Response){
    
        try {

            const getProduct = await Product.find();

            const msgResponse = getProduct.length > 0 ? `Foram encontrados ${getProduct.length} Produtos` : `Nenhum Produto foi encontrado!`;

            res.status(200).send({ msg: msgResponse , data: getProduct });

        } catch (error) {

            res.status(400).send(error);

        }
    
    },

    getByID: async function(req: Request, res: Response){

        const productParams = req.params;

        try {

            const getProductByID = await Product.findOne({_id: productParams.id});
            res.status(200).send({ msg: 'O Seu produto foi encontrado!', data: getProductByID });

            
        } catch (error) {
            
            res.status(400).send(error);

        }
    },

    updateByID: async function(req: Request, res: Response){

        const productParams = req.params;
        const productInput: IProduct = req.body;

        try {
        
            await Product.findByIdAndUpdate({_id: productParams.id}, productInput);
            res.status(200).send({ msg: 'O Produto foi atualizado com sucesso!' });

        } catch (error) {

            res.status(400).send(error);
        
        }
    },

    destroy: async function(req: Request, res: Response) {
        
        const productParams = req.params;

        try {
            
            await Product.deleteOne({_id: productParams.id});
            res.status(200).send({ msg: 'O produto selecionado foi deletado com sucesso!' });

        } catch (error) {
            
            res.status(400).send(error);

        }

    }
}


export { productController };